using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Globalization;
using System.IO;
using System.Net;
using System.Reflection;
using System.Text;
using System.Threading;

namespace FluxCordInstaller.Core
{
    public enum InstallOperationKind
    {
        InstallOrUpdate,
        Repair,
        Uninstall,
        CloseDiscord
    }

    public enum InstallStage
    {
        Preparing,
        ClosingDiscord,
        BackingUp,
        ExtractingPayload,
        CleaningConflicts,
        PatchingClient,
        RestoringClient,
        Verifying,
        Relaunching,
        RollingBack,
        Completed
    }

    public sealed class InstallProgressEvent
    {
        public InstallStage Stage { get; set; }
        public int CompletedSteps { get; set; }
        public int TotalSteps { get; set; }
        public string StatusKey { get; set; }
        public object[] StatusArgs { get; set; }
        public string LogMessage { get; set; }
        public bool IsWarning { get; set; }
        public bool IsError { get; set; }
        public bool IsSuccess { get; set; }

        public int Percentage
        {
            get
            {
                if (TotalSteps <= 0) return 0;
                int pct = (int)Math.Round(100.0 * CompletedSteps / TotalSteps);
                return Math.Max(0, Math.Min(100, pct));
            }
        }
    }

    public sealed class ConflictItem
    {
        public DiscordInstall Install { get; set; }
        public List<KnownMod> ForeignMods { get; set; }
    }

    public sealed class OperationOutcome
    {
        public InstallOperationKind Operation { get; set; }
        public bool Success { get; set; }
        public bool Cancelled { get; set; }
        public bool RolledBack { get; set; }
        public FailureKind FailureKind { get; set; }
        public string FailureSubject { get; set; }
        public string ErrorDetail { get; set; }
        public List<DiscordInstall> AffectedInstalls { get; private set; }
        public List<KnownMod> ReplacedMods { get; private set; }
        public bool WasUpdate { get; set; }

        public OperationOutcome()
        {
            AffectedInstalls = new List<DiscordInstall>();
            ReplacedMods = new List<KnownMod>();
        }
    }

    public static class InstallationEngine
    {
        /// <summary>Release asset that carries the whole mod (same file Flxuilotl installs).</summary>
        public const string PayloadAssetName = "desktop.asar";
        public const string ReleaseApiUrl = "https://api.github.com/repos/l7oz/FluxCord/releases/latest";

        /// <summary>Optional override file or folder for the payload (used by tests or dev mode).</summary>
        public static string CustomPayloadDirectory { get; set; }

        /// <summary>Checks which targets have another client mod injected that would conflict with FluxCord.</summary>
        public static List<ConflictItem> FindConflicts(IEnumerable<DiscordInstall> targets)
        {
            var list = new List<ConflictItem>();
            if (targets == null) return list;
            foreach (var t in targets)
            {
                var mods = t.ForeignMods;
                if (mods != null && mods.Count > 0)
                    list.Add(new ConflictItem { Install = t, ForeignMods = mods });
            }
            return list;
        }

        public static bool IsProcessRunning(DiscordInstall install)
        {
            if (install == null) return false;
            try
            {
                return Process.GetProcessesByName(install.ProcessName).Length > 0;
            }
            catch
            {
                return false;
            }
        }

        public static void CloseDiscordProcess(string processName, CancellationToken ct)
        {
            try
            {
                string target = processName ?? "Discord";
                if (target.EndsWith(".exe", StringComparison.OrdinalIgnoreCase))
                    target = target.Substring(0, target.Length - 4);

                Process[] procs = Process.GetProcessesByName(target);
                foreach (var p in procs)
                {
                    ct.ThrowIfCancellationRequested();
                    try
                    {
                        if (!p.HasExited)
                        {
                            p.CloseMainWindow();
                            if (!p.WaitForExit(4500) && !p.HasExited)
                                p.Kill();
                            p.WaitForExit(2000);
                        }
                    }
                    catch { }
                    finally
                    {
                        try { p.Dispose(); } catch { }
                    }
                }
            }
            catch (OperationCanceledException) { throw; }
            catch { }
        }

        public static void LaunchDiscord(DiscordInstall install)
        {
            if (install == null) return;
            try
            {
                string updateExe = Path.Combine(install.RootPath, "Update.exe");
                if (File.Exists(updateExe) && !string.IsNullOrEmpty(install.ExeName))
                {
                    Process.Start(new ProcessStartInfo
                    {
                        FileName = updateExe,
                        Arguments = "--processStart " + install.ExeName,
                        WorkingDirectory = install.RootPath,
                        UseShellExecute = true
                    });
                    return;
                }

                if (install.Latest != null)
                {
                    string exe = Path.Combine(install.Latest.Path, install.ExeName ?? "Discord.exe");
                    if (File.Exists(exe))
                    {
                        Process.Start(new ProcessStartInfo { FileName = exe, WorkingDirectory = install.Latest.Path, UseShellExecute = true });
                        return;
                    }
                }

                string rootExe = Path.Combine(install.RootPath, install.ExeName ?? "Discord.exe");
                if (File.Exists(rootExe))
                    Process.Start(new ProcessStartInfo { FileName = rootExe, WorkingDirectory = install.RootPath, UseShellExecute = true });
            }
            catch { }
        }

        public static OperationOutcome RunInstall(
            InstallerPaths paths,
            IList<DiscordInstall> targets,
            bool isRepair,
            bool relaunchAfter,
            Action<InstallProgressEvent> onProgress,
            CancellationToken ct)
        {
            var outcome = new OperationOutcome
            {
                Operation = isRepair ? InstallOperationKind.Repair : InstallOperationKind.InstallOrUpdate
            };

            if (targets == null || targets.Count == 0)
            {
                outcome.FailureKind = FailureKind.NoTargets;
                return outcome;
            }

            bool allHadFluxCord = true;
            foreach (var t in targets)
            {
                if (!t.HasFluxCord) allHadFluxCord = false;
                foreach (var fm in t.ForeignMods)
                    if (!outcome.ReplacedMods.Contains(fm)) outcome.ReplacedMods.Add(fm);
            }
            outcome.WasUpdate = allHadFluxCord && !isRepair;

            // Count exact real work steps:
            // stage payload + swap payload + per-target (close + patch each appDir + verify)
            int appDirCount = 0;
            foreach (var t in targets) appDirCount += Math.Max(1, t.AppDirs.Count);
            int totalSteps = 2 + targets.Count + appDirCount + targets.Count + (relaunchAfter ? targets.Count : 0);
            int step = 0;

            string payloadBackup = Path.Combine(paths.InstallerDir, "payload-prev");
            bool payloadSwapped = false;
            var patchedDirs = new List<AppDirRollback>();

            try
            {
                ct.ThrowIfCancellationRequested();

                Report(onProgress, InstallStage.Preparing, step, totalSteps,
                    isRepair ? "status.preparingRepair" : (outcome.WasUpdate ? "status.preparingUpdate" : "status.preparingInstall"),
                    null, null, false, false, false);

                // Step 1: Close running target Discord processes
                foreach (var t in targets)
                {
                    ct.ThrowIfCancellationRequested();
                    if (IsProcessRunning(t))
                    {
                        Report(onProgress, InstallStage.ClosingDiscord, step, totalSteps,
                            "status.closingClient", new object[] { t.DisplayName },
                            "Closing running process: " + t.ExeName, false, false, false);
                        CloseDiscordProcess(t.ExeName, ct);
                    }
                    step++;
                }

                // Step 2: Stage the payload and verify integrity before touching the installed copy
                if (Directory.Exists(paths.StagingDir))
                    FileOps.DeleteDirectory(paths.StagingDir, ct);
                Directory.CreateDirectory(paths.StagingDir);

                ct.ThrowIfCancellationRequested();
                string stagedPayload = Path.Combine(paths.StagingDir, PayloadAssetName);
                Report(onProgress, InstallStage.ExtractingPayload, step, totalSteps,
                    "status.extractingAsset", new object[] { PayloadAssetName },
                    "Staging " + PayloadAssetName + " -> staging", false, false, false);

                StagePayload(stagedPayload, ct);
                if (FileOps.SizeOf(stagedPayload) <= 0)
                    throw new InstallerException(FailureKind.PayloadMissing, "Staged payload is empty: " + PayloadAssetName, PayloadAssetName);

                try { KnownPlugins.RegisterFromRendererJs(ReadTextFromAsar(stagedPayload, "renderer.js")); } catch { }
                step++;

                // Swap staged payload into place with rollback backup
                if (File.Exists(payloadBackup))
                    FileOps.DeleteFile(payloadBackup, ct);
                if (File.Exists(paths.PayloadFile))
                    FileOps.Retry(() => File.Copy(paths.PayloadFile, payloadBackup, true), payloadBackup, ct);

                Directory.CreateDirectory(Path.GetDirectoryName(paths.PayloadFile));
                FileOps.Retry(() => File.Copy(stagedPayload, paths.PayloadFile, true), paths.PayloadFile, ct);
                payloadSwapped = true;
                FileOps.DeleteDirectory(paths.StagingDir, ct);
                SyncClientLanguageSetting(paths, FluxCordInstaller.Localization.Loc.CurrentLanguage);
                step++;

                // Step 3: Patch each target Discord installation
                foreach (var t in targets)
                {
                    ct.ThrowIfCancellationRequested();
                    if (t.AppDirs.Count == 0)
                        throw new InstallerException(FailureKind.DiscordDamaged, "No app-* version directories found in " + t.RootPath, t.DisplayName);

                    foreach (var appDir in t.AppDirs)
                    {
                        ct.ThrowIfCancellationRequested();

                        if (appDir.ForeignMods.Count > 0)
                        {
                            Report(onProgress, InstallStage.CleaningConflicts, step, totalSteps,
                                "status.cleaningForeignMod", new object[] { appDir.ForeignMods[0].DisplayName, t.DisplayName },
                                "Unhooking " + appDir.ForeignMods[0].DisplayName + " from " + t.DisplayName + " (" + appDir.VersionText + ")",
                                false, false, false);
                        }
                        else
                        {
                            Report(onProgress, InstallStage.PatchingClient, step, totalSteps,
                                "status.patchingClient", new object[] { t.DisplayName, appDir.VersionText },
                                "Patching " + t.DisplayName + " (" + appDir.VersionText + ")",
                                false, false, false);
                        }

                        var rb = PatchSingleAppDir(paths, t, appDir, ct);
                        patchedDirs.Add(rb);
                        step++;
                    }

                    // Step 4: Verify installation on disk
                    ct.ThrowIfCancellationRequested();
                    Report(onProgress, InstallStage.Verifying, step, totalSteps,
                        "status.verifyingClient", new object[] { t.DisplayName },
                        "Verifying FluxCord loader in " + t.DisplayName, false, false, false);

                    var refreshed = DiscordLocator.Refresh(t);
                    if (refreshed == null || !refreshed.HasFluxCord)
                        throw new InstallerException(FailureKind.VerificationFailed, "Verification failed for " + t.DisplayName, t.DisplayName);

                    outcome.AffectedInstalls.Add(refreshed);
                    step++;
                }

                // Cleanup temporary rollback snapshots after full verification
                foreach (var rb in patchedDirs) rb.Commit(ct);
                if (File.Exists(payloadBackup))
                    FileOps.DeleteFile(payloadBackup, CancellationToken.None);

                // Step 5: Relaunch if requested
                if (relaunchAfter)
                {
                    foreach (var t in outcome.AffectedInstalls)
                    {
                        ct.ThrowIfCancellationRequested();
                        Report(onProgress, InstallStage.Relaunching, step, totalSteps,
                            "status.relaunchingClient", new object[] { t.DisplayName },
                            "Launching " + t.DisplayName, false, false, false);
                        LaunchDiscord(t);
                        step++;
                    }
                }

                Report(onProgress, InstallStage.Completed, totalSteps, totalSteps,
                    isRepair ? "status.repairComplete" : (outcome.WasUpdate ? "status.updateComplete" : "status.installComplete"),
                    null, "Operation completed successfully.", false, false, true);

                outcome.Success = true;
                return outcome;
            }
            catch (OperationCanceledException)
            {
                outcome.Cancelled = true;
                outcome.FailureKind = FailureKind.Cancelled;
                Report(onProgress, InstallStage.RollingBack, step, totalSteps,
                    "status.rollingBack", null, "Cancelled by user. Rolling back changes...", true, false, false);
                RollbackInstall(paths, payloadBackup, payloadSwapped, patchedDirs, outcome);
                return outcome;
            }
            catch (InstallerException iex)
            {
                outcome.FailureKind = iex.Kind;
                outcome.FailureSubject = iex.Subject;
                outcome.ErrorDetail = iex.Message;
                Report(onProgress, InstallStage.RollingBack, step, totalSteps,
                    "status.rollingBack", null, "Error: " + iex.Message + ". Rolling back...", false, true, false);
                RollbackInstall(paths, payloadBackup, payloadSwapped, patchedDirs, outcome);
                return outcome;
            }
            catch (Exception ex)
            {
                outcome.FailureKind = FailureKind.Unknown;
                outcome.ErrorDetail = ex.Message;
                Report(onProgress, InstallStage.RollingBack, step, totalSteps,
                    "status.rollingBack", null, "Unexpected error: " + ex.Message + ". Rolling back...", false, true, false);
                RollbackInstall(paths, payloadBackup, payloadSwapped, patchedDirs, outcome);
                return outcome;
            }
        }

        static void RollbackInstall(InstallerPaths paths, string payloadBackup, bool payloadSwapped, List<AppDirRollback> patchedDirs, OperationOutcome outcome)
        {
            try
            {
                for (int i = patchedDirs.Count - 1; i >= 0; i--)
                    patchedDirs[i].Rollback();

                if (payloadSwapped)
                {
                    if (File.Exists(paths.PayloadFile))
                        FileOps.DeleteFile(paths.PayloadFile, CancellationToken.None);
                    if (File.Exists(payloadBackup))
                        FileOps.Move(payloadBackup, paths.PayloadFile, CancellationToken.None);
                }
                if (Directory.Exists(paths.StagingDir))
                    FileOps.DeleteDirectory(paths.StagingDir, CancellationToken.None);
                outcome.RolledBack = true;
            }
            catch { }
        }

        public static OperationOutcome RunUninstall(
            InstallerPaths paths,
            IList<DiscordInstall> targets,
            bool relaunchAfter,
            Action<InstallProgressEvent> onProgress,
            CancellationToken ct)
        {
            var outcome = new OperationOutcome { Operation = InstallOperationKind.Uninstall };
            if (targets == null || targets.Count == 0)
            {
                outcome.FailureKind = FailureKind.NoTargets;
                return outcome;
            }

            int appDirCount = 0;
            foreach (var t in targets) appDirCount += Math.Max(1, t.AppDirs.Count);
            int totalSteps = targets.Count + appDirCount + targets.Count + (relaunchAfter ? targets.Count : 0);
            int step = 0;

            try
            {
                foreach (var t in targets)
                {
                    ct.ThrowIfCancellationRequested();
                    if (IsProcessRunning(t))
                    {
                        Report(onProgress, InstallStage.ClosingDiscord, step, totalSteps,
                            "status.closingClient", new object[] { t.DisplayName },
                            "Closing running process: " + t.ExeName, false, false, false);
                        CloseDiscordProcess(t.ExeName, ct);
                    }
                    step++;
                }

                foreach (var t in targets)
                {
                    ct.ThrowIfCancellationRequested();
                    foreach (var appDir in t.AppDirs)
                    {
                        ct.ThrowIfCancellationRequested();
                        Report(onProgress, InstallStage.RestoringClient, step, totalSteps,
                            "status.restoringClient", new object[] { t.DisplayName, appDir.VersionText },
                            "Restoring vanilla Discord in " + t.DisplayName + " (" + appDir.VersionText + ")",
                            false, false, false);

                        RestoreVanillaAppDir(appDir, ct);
                        step++;
                    }

                    var refreshed = DiscordLocator.Refresh(t);
                    if (refreshed != null) outcome.AffectedInstalls.Add(refreshed);
                    step++;
                }

                // Only remove the payload if no remaining Discord installations on the machine use FluxCord
                var allAfter = DiscordLocator.FindAll(paths);
                bool anyStillInstalled = false;
                foreach (var d in allAfter) if (d.HasFluxCord) anyStillInstalled = true;
                if (!anyStillInstalled && File.Exists(paths.PayloadFile))
                    FileOps.DeleteFile(paths.PayloadFile, ct);

                if (relaunchAfter)
                {
                    foreach (var t in outcome.AffectedInstalls)
                    {
                        ct.ThrowIfCancellationRequested();
                        Report(onProgress, InstallStage.Relaunching, step, totalSteps,
                            "status.relaunchingClient", new object[] { t.DisplayName },
                            "Launching " + t.DisplayName, false, false, false);
                        LaunchDiscord(t);
                        step++;
                    }
                }

                Report(onProgress, InstallStage.Completed, totalSteps, totalSteps,
                    "status.uninstallComplete", null, "FluxCord uninstalled cleanly. User settings preserved.", false, false, true);

                outcome.Success = true;
                return outcome;
            }
            catch (OperationCanceledException)
            {
                outcome.Cancelled = true;
                outcome.FailureKind = FailureKind.Cancelled;
                return outcome;
            }
            catch (InstallerException iex)
            {
                outcome.FailureKind = iex.Kind;
                outcome.FailureSubject = iex.Subject;
                outcome.ErrorDetail = iex.Message;
                return outcome;
            }
            catch (Exception ex)
            {
                outcome.FailureKind = FailureKind.Unknown;
                outcome.ErrorDetail = ex.Message;
                return outcome;
            }
        }

        /// <summary>
        /// Safely unhooks a previous client mod after explicit user confirmation.
        /// Never deletes user settings/themes or standalone applications.
        /// </summary>
        public static void CleanupPreviousClient(
            InstallerPaths paths,
            DetectedClient client,
            IEnumerable<DiscordInstall> installs,
            bool removeInjectorBinaries,
            CancellationToken ct)
        {
            if (client == null || client.Mod == null || client.Mod.IsFluxCord || client.IsStandalone)
                return;

            // 1. Clean remaining discord_desktop_core hooks for this mod, but only on installs that now run
            //    FluxCord. Other Discord flavours keep whatever the user put on them.
            if (installs != null)
            {
                foreach (var inst in installs)
                {
                    if (!inst.HasFluxCord) continue;
                    foreach (var appDir in inst.AppDirs)
                    {
                        foreach (var coreIndex in DiscordLocator.FindDesktopCoreIndices(appDir.Path))
                        {
                            string text = FileOps.ReadSmall(coreIndex, 512 * 1024);
                            if (text != null && ModCatalog.Match(text) == client.Mod)
                                CleanDesktopCoreFile(coreIndex, ct);
                        }
                    }
                }
            }

            // 2. Optionally remove only the previous injector's dist binaries (never settings or themes!).
            //    Skip it while any Discord install still loads them, or that install would fail to start.
            if (removeInjectorBinaries && client.DistDir != null && !IsStillLoaded(client, installs))
            {
                if (FileOps.IsStrictlyInside(client.DistDir, paths.Roaming))
                    FileOps.DeleteDirectory(client.DistDir, ct);
            }
        }

        /// <summary>True if some Discord install's loader (app.asar stub, app folder or desktop core) still points at this mod.</summary>
        public static bool IsStillLoaded(DetectedClient client, IEnumerable<DiscordInstall> installs)
        {
            if (installs == null) return false;
            string distLower = client.DistDir != null ? client.DistDir.Replace('/', '\\').TrimEnd('\\').ToLowerInvariant() : null;
            foreach (var inst in installs)
            {
                foreach (var appDir in inst.AppDirs)
                {
                    if (appDir.LoaderMod == client.Mod || appDir.CoreMods.Contains(client.Mod))
                        return true;
                    if (distLower == null) continue;
                    foreach (var loader in new[] { appDir.AppAsar, System.IO.Path.Combine(appDir.AppFolder, "index.js") })
                    {
                        string text = FileOps.ReadSmall(loader, 64 * 1024);
                        if (text != null && text.Replace("\\\\", "\\").Replace('/', '\\').ToLowerInvariant().Contains(distLower))
                            return true;
                    }
                }
            }
            return false;
        }

        sealed class AppDirRollback
        {
            public AppDirInfo AppDir;
            public string SavedAppFolder;
            public string SavedStubAsar;
            public bool WroteStub;
            public Dictionary<string, string> SavedCoreFiles = new Dictionary<string, string>();

            public void Rollback()
            {
                try
                {
                    if (WroteStub && FileOps.Exists(AppDir.AppAsar))
                        FileOps.DeletePath(AppDir.AppAsar, CancellationToken.None);

                    if (Directory.Exists(AppDir.AppFolder))
                        FileOps.DeleteDirectory(AppDir.AppFolder, CancellationToken.None);

                    if (!string.IsNullOrEmpty(SavedAppFolder) && Directory.Exists(SavedAppFolder))
                    {
                        FileOps.Move(SavedAppFolder, AppDir.AppFolder, CancellationToken.None);
                    }
                    else if (!string.IsNullOrEmpty(SavedStubAsar) && FileOps.Exists(SavedStubAsar))
                    {
                        if (FileOps.Exists(AppDir.AppAsar))
                            FileOps.DeletePath(AppDir.AppAsar, CancellationToken.None);
                        FileOps.Move(SavedStubAsar, AppDir.AppAsar, CancellationToken.None);
                    }
                    else if (FileOps.SizeOf(AppDir.BackupAsar) >= DiscordLocator.OriginalAsarMinSize &&
                             (WroteStub || !File.Exists(AppDir.AppAsar)))
                    {
                        if (File.Exists(AppDir.AppAsar))
                            FileOps.DeleteFile(AppDir.AppAsar, CancellationToken.None);
                        FileOps.Move(AppDir.BackupAsar, AppDir.AppAsar, CancellationToken.None);
                    }

                    foreach (var kv in SavedCoreFiles)
                    {
                        try { FileOps.WriteAllTextAtomic(kv.Key, kv.Value); } catch { }
                    }
                }
                catch { }
            }

            public void Commit(CancellationToken ct)
            {
                try
                {
                    if (!string.IsNullOrEmpty(SavedAppFolder) && Directory.Exists(SavedAppFolder))
                        FileOps.DeleteDirectory(SavedAppFolder, ct);
                    if (!string.IsNullOrEmpty(SavedStubAsar) && FileOps.Exists(SavedStubAsar))
                        FileOps.DeletePath(SavedStubAsar, ct);
                }
                catch { }
            }
        }

        static AppDirRollback PatchSingleAppDir(InstallerPaths paths, DiscordInstall install, AppDirInfo appDir, CancellationToken ct)
        {
            if (!appDir.HasOriginalAsar)
                throw new InstallerException(FailureKind.DiscordDamaged,
                    "Original Discord app.asar is missing in " + appDir.ResourcesPath, install.DisplayName);

            var rb = new AppDirRollback { AppDir = appDir };

            // 1. Clean any discord_desktop_core injections (e.g. BetterDiscord or legacy mods)
            foreach (var coreIndex in DiscordLocator.FindDesktopCoreIndices(appDir.Path))
            {
                if (File.Exists(coreIndex))
                    rb.SavedCoreFiles[coreIndex] = FileOps.ReadText(coreIndex);
                CleanDesktopCoreFile(coreIndex, ct);
            }

            // 2. Preserve existing resources/app for rollback if present
            if (Directory.Exists(appDir.AppFolder))
            {
                string prevApp = Path.Combine(appDir.ResourcesPath, "app.fluxcord-prev");
                if (Directory.Exists(prevApp)) FileOps.DeleteDirectory(prevApp, ct);
                FileOps.Move(appDir.AppFolder, prevApp, ct);
                rb.SavedAppFolder = prevApp;
            }

            // 3. Handle app.asar (could be vanilla archive, foreign stub file, or foreign stub folder)
            if (Directory.Exists(appDir.AppAsar))
            {
                string prevStub = Path.Combine(appDir.ResourcesPath, "app.asar.fluxcord-prev");
                if (FileOps.Exists(prevStub)) FileOps.DeletePath(prevStub, ct);
                FileOps.Move(appDir.AppAsar, prevStub, ct);
                rb.SavedStubAsar = prevStub;
            }
            else if (File.Exists(appDir.AppAsar))
            {
                long sz = FileOps.SizeOf(appDir.AppAsar);
                if (sz >= DiscordLocator.OriginalAsarMinSize)
                {
                    // Genuine vanilla app.asar -> move to _app.asar
                    if (File.Exists(appDir.BackupAsar) && FileOps.SizeOf(appDir.BackupAsar) >= DiscordLocator.OriginalAsarMinSize)
                    {
                        FileOps.DeleteFile(appDir.AppAsar, ct);
                    }
                    else
                    {
                        if (FileOps.Exists(appDir.BackupAsar)) FileOps.DeletePath(appDir.BackupAsar, ct);
                        FileOps.Move(appDir.AppAsar, appDir.BackupAsar, ct);
                    }
                }
                else
                {
                    // Foreign stub file (e.g. Vencord/Equicord Stub app.asar)
                    string prevStub = Path.Combine(appDir.ResourcesPath, "app.asar.fluxcord-prev");
                    if (FileOps.Exists(prevStub)) FileOps.DeletePath(prevStub, ct);
                    FileOps.Move(appDir.AppAsar, prevStub, ct);
                    rb.SavedStubAsar = prevStub;
                }
            }

            // 4. Write the FluxCord loader stub as resources\app.asar (same shape Flxuilotl writes)
            rb.WroteStub = true;
            WriteAppAsar(appDir.AppAsar, paths.PayloadFile);

            return rb;
        }

        static void RestoreVanillaAppDir(AppDirInfo appDir, CancellationToken ct)
        {
            foreach (var coreIndex in DiscordLocator.FindDesktopCoreIndices(appDir.Path))
                CleanDesktopCoreFile(coreIndex, ct);

            if (Directory.Exists(appDir.AppFolder))
                FileOps.DeleteDirectory(appDir.AppFolder, ct);

            if (Directory.Exists(appDir.AppAsar))
                FileOps.DeleteDirectory(appDir.AppAsar, ct);

            if (File.Exists(appDir.BackupAsar) && FileOps.SizeOf(appDir.BackupAsar) >= DiscordLocator.OriginalAsarMinSize)
            {
                if (File.Exists(appDir.AppAsar))
                    FileOps.DeleteFile(appDir.AppAsar, ct);
                FileOps.Move(appDir.BackupAsar, appDir.AppAsar, ct);
            }
        }

        static void CleanDesktopCoreFile(string indexJs, CancellationToken ct)
        {
            string bakPath = indexJs + ".bak";
            if (File.Exists(bakPath))
            {
                try
                {
                    string bak = FileOps.ReadText(bakPath);
                    if (ModCatalog.Match(bak) == null && bak.Contains("core.asar"))
                    {
                        FileOps.Retry(() => FileOps.WriteAllTextAtomic(indexJs, bak), indexJs, ct);
                        FileOps.DeleteFile(bakPath, ct);
                        return;
                    }
                }
                catch { }
                FileOps.DeleteFile(bakPath, ct);
            }

            FileOps.Retry(() => FileOps.WriteAllTextAtomic(indexJs, "module.exports = require('./core.asar');\r\n"), indexJs, ct);
        }

        static void StagePayload(string dest, CancellationToken ct)
        {
            // 1. Local overrides: CustomPayloadDirectory (file or folder) and files next to the exe
            string[] candidates =
            {
                ResolveCustomPayloadPath(),
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory, "dist", PayloadAssetName),
                Path.Combine(AppDomain.CurrentDomain.BaseDirectory, PayloadAssetName)
            };

            foreach (var c in candidates)
            {
                if (!string.IsNullOrEmpty(c) && File.Exists(c) && FileOps.SizeOf(c) > 0)
                {
                    FileOps.Retry(() => File.Copy(c, dest, true), dest, ct);
                    return;
                }
            }

            // 2. Latest release from GitHub (same asset Flxuilotl installs)
            DownloadPayload(dest, ct);
        }

        static string ResolveCustomPayloadPath()
        {
            string custom = CustomPayloadDirectory;
            if (string.IsNullOrEmpty(custom)) return null;
            if (File.Exists(custom)) return custom;
            foreach (var name in new[] { PayloadAssetName, "equicord.asar" })
            {
                string p = Path.Combine(custom, name);
                if (File.Exists(p)) return p;
            }
            return null;
        }

        static void DownloadPayload(string dest, CancellationToken ct)
        {
            try
            {
                ct.ThrowIfCancellationRequested();
                // GitHub requires TLS 1.2, which the .NET 4.0 enum does not name (3072 = Tls12)
                ServicePointManager.SecurityProtocol |= (SecurityProtocolType)3072;

                using (var client = new WebClient())
                {
                    client.Headers[HttpRequestHeader.UserAgent] = "FluxCordInstaller";
                    var root = Json.ParseObject(client.DownloadString(ReleaseApiUrl));
                    var assets = root != null ? root["assets"] as List<object> : null;

                    string url = null;
                    if (assets != null)
                    {
                        foreach (var a in assets)
                        {
                            var obj = a as JsonObject;
                            if (obj == null || !obj.ContainsKey("name")) continue;
                            if (Convert.ToString(obj["name"]) == PayloadAssetName && obj.ContainsKey("browser_download_url"))
                            {
                                url = Convert.ToString(obj["browser_download_url"]);
                                break;
                            }
                        }
                    }

                    if (string.IsNullOrEmpty(url))
                        throw new InstallerException(FailureKind.PayloadMissing, "Release has no " + PayloadAssetName + " asset", PayloadAssetName);

                    client.DownloadFile(url, dest);
                }

                if (FileOps.SizeOf(dest) <= 0)
                    throw new InstallerException(FailureKind.PayloadMissing, "Downloaded payload is empty", PayloadAssetName);
            }
            catch (InstallerException) { throw; }
            catch (OperationCanceledException) { throw; }
            catch (Exception ex)
            {
                throw new InstallerException(FailureKind.PayloadMissing, "Download failed: " + ex.Message, PayloadAssetName);
            }
        }

        /// <summary>Reads one file's text straight out of an asar archive (header json + raw data).</summary>
        static string ReadTextFromAsar(string asarPath, string entryName)
        {
            using (var fs = new FileStream(asarPath, FileMode.Open, FileAccess.Read, FileShare.Read))
            {
                var lenBuf = new byte[16];
                ReadExact(fs, lenBuf, 0, lenBuf.Length);
                uint headerSize = BitConverter.ToUInt32(lenBuf, 4);
                uint jsonLen = BitConverter.ToUInt32(lenBuf, 12);

                var jsonBuf = new byte[jsonLen];
                ReadExact(fs, jsonBuf, 0, (int)jsonLen);

                var root = Json.Parse(FileOps.Utf8.GetString(jsonBuf, 0, (int)jsonLen)) as JsonObject;
                var entry = FindAsarEntry(root, entryName);
                if (entry == null || !entry.ContainsKey("size") || !entry.ContainsKey("offset")) return null;

                long offset = long.Parse(Convert.ToString(entry["offset"]), CultureInfo.InvariantCulture);
                var sizeNum = entry["size"] as JsonNumber;
                if (sizeNum == null) return null;
                long size = long.Parse(sizeNum.Raw, CultureInfo.InvariantCulture);

                long dataStart = 8 + headerSize;
                fs.Seek(dataStart + offset, SeekOrigin.Begin);

                var data = new byte[size];
                ReadExact(fs, data, 0, data.Length);
                return FileOps.Utf8.GetString(data, 0, data.Length);
            }
        }

        static void ReadExact(Stream s, byte[] buf, int offset, int count)
        {
            int read = 0;
            while (read < count)
            {
                int n = s.Read(buf, offset + read, count - read);
                if (n <= 0) throw new InvalidDataException("Unexpected end of asar");
                read += n;
            }
        }

        static JsonObject FindAsarEntry(JsonObject node, string entryName)
        {
            var files = node != null ? node.GetObject("files") : null;
            if (files == null) return null;
            foreach (var kv in files)
            {
                var child = kv.Value as JsonObject;
                if (child == null) continue;
                if (kv.Key == entryName && !child.ContainsKey("files")) return child;
                var nested = FindAsarEntry(child, entryName);
                if (nested != null) return nested;
            }
            return null;
        }

        /// <summary>
        /// Writes the tiny app.asar stub Electron boots from: index.js requires the mod payload,
        /// package.json points at index.js. Byte-for-byte the format Flxuilotl's writer produces.
        /// </summary>
        public static void WriteAppAsar(string outFile, string modAsarPath)
        {
            const string pkgJson = "{\n\t\"name\": \"discord\",\n\t\"main\": \"index.js\"\n}";

            string indexJs = "// FluxCord loader\nrequire(" + Json.Serialize(modAsarPath) + ")";
            byte[] indexBytes = Encoding.UTF8.GetBytes(indexJs);
            byte[] pkgBytes = Encoding.UTF8.GetBytes(pkgJson);

            string headerJson =
                "{\"files\":{\"index.js\":{\"size\":" + indexBytes.Length + ",\"offset\":\"0\"}," +
                "\"package.json\":{\"size\":" + pkgBytes.Length + ",\"offset\":\"" + indexBytes.Length + "\"}}}";
            int headerLen = Encoding.UTF8.GetByteCount(headerJson);
            int aligned = (headerLen + 3) & ~3;
            string padded = headerJson + new string('0', aligned - headerLen);

            using (var bw = new BinaryWriter(File.Create(outFile)))
            {
                bw.Write((uint)4);
                bw.Write((uint)(aligned + 8));
                bw.Write((uint)(aligned + 4));
                bw.Write((uint)headerLen);
                bw.Write(Encoding.UTF8.GetBytes(padded));
                bw.Write(indexBytes);
                bw.Write(pkgBytes);
            }
        }

        static void Report(
            Action<InstallProgressEvent> cb,
            InstallStage stage,
            int completed,
            int total,
            string key,
            object[] args,
            string log,
            bool warn,
            bool err,
            bool ok)
        {
            if (cb == null) return;
            cb(new InstallProgressEvent
            {
                Stage = stage,
                CompletedSteps = completed,
                TotalSteps = total,
                StatusKey = key,
                StatusArgs = args,
                LogMessage = log,
                IsWarning = warn,
                IsError = err,
                IsSuccess = ok
            });
        }

        public static void SyncClientLanguageSetting(InstallerPaths paths, string langCode)
        {
            if (paths == null || string.IsNullOrEmpty(langCode)) return;
            try
            {
                string norm = langCode.Trim().ToLowerInvariant();
                if (norm.Length >= 2) norm = norm.Substring(0, 2);
                if (norm != "en" && norm != "ru" && norm != "es" && norm != "fr")
                    norm = "en";

                Directory.CreateDirectory(paths.SettingsDir);
                JsonObject root;
                if (File.Exists(paths.SettingsFile))
                {
                    try { root = Json.ParseObject(FileOps.ReadText(paths.SettingsFile)); }
                    catch { root = new JsonObject(); }
                }
                else
                {
                    root = new JsonObject();
                }

                root["language"] = norm;
                string serialized = Json.Serialize(root) + "\n";
                FileOps.WriteAllTextAtomic(paths.SettingsFile, serialized);

                string stateFile = Path.Combine(paths.FluxCordRoot, "installer-state.json");
                var stateObj = new JsonObject();
                stateObj["language"] = norm;
                FileOps.WriteAllTextAtomic(stateFile, Json.Serialize(stateObj) + "\n");
            }
            catch { }
        }
    }
}
