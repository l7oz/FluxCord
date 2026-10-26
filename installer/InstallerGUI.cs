using System;
using System.Reflection;
using System.Runtime.InteropServices;
using FluxCordInstaller.Tests;
using FluxCordInstaller.UI;

[assembly: AssemblyTitle("FluxCord Installer")]
[assembly: AssemblyDescription("Official FluxCord desktop installer & migration suite. Installs, updates, repairs, migrates settings, or removes the open-source FluxCord Discord client modification.")]
[assembly: AssemblyConfiguration("")]
[assembly: AssemblyCompany("FluxCord")]
[assembly: AssemblyProduct("FluxCord")]
[assembly: AssemblyCopyright("Copyright © 2026 FluxCord. Licensed under GPL-3.0-or-later.")]
[assembly: AssemblyTrademark("")]
[assembly: AssemblyCulture("")]
[assembly: AssemblyVersion("1.2.1.0")]
[assembly: AssemblyFileVersion("1.2.1.0")]
[assembly: AssemblyInformationalVersion("1.2.1")]
[assembly: ComVisible(false)]
[assembly: Guid("e8760626-8dd3-498f-abb9-eeac29266e0b")]
[assembly: System.Resources.NeutralResourcesLanguage("en-US")]


namespace FluxCordInstaller
{
    static class Program
    {
        [DllImport("kernel32.dll")]
        static extern bool AttachConsole(int dwProcessId);
        const int ATTACH_PARENT_PROCESS = -1;

        [STAThread]
        static int Main(string[] args)
        {
            if (args != null && args.Length > 0 && string.Equals(args[0], "--self-test", StringComparison.OrdinalIgnoreCase))
            {
                try { AttachConsole(ATTACH_PARENT_PROCESS); } catch { }
                string logOut = args.Length > 1 ? args[1] : null;
                return InstallerTestRunner.RunAll(logOut);
            }

            if (args != null && args.Length > 1 && string.Equals(args[0], "--render-previews", StringComparison.OrdinalIgnoreCase))
            {
                InstallerWindow.RenderPreviewSuite(args[1]);
                return 0;
            }

            var app = new System.Windows.Application { ShutdownMode = System.Windows.ShutdownMode.OnMainWindowClose };
            app.Run(new InstallerWindow());
            return 0;
        }
    }
}
