# FluxCord Installer build + self-test script
param([switch]$SkipTest)
$ErrorActionPreference = "Stop"

$repoRoot = Split-Path -Parent $PSScriptRoot
$cscPath = "C:\Windows\Microsoft.NET\Framework64\v4.0.30319\csc.exe"
$outExe = Join-Path $repoRoot "FluxCordInstaller.exe"
$distInstallerDir = Join-Path $repoRoot "dist\Installer"

if (!(Test-Path $cscPath)) {
    Write-Error "csc.exe not found at $cscPath (.NET Framework required)"
    exit 1
}

try {
    Get-Process -Name "FluxCordInstaller" -ErrorAction SilentlyContinue | Stop-Process -Force -ErrorAction SilentlyContinue
    Start-Sleep -Milliseconds 200
} catch { }

Write-Host "[1/4] Collecting installer C# sources..." -ForegroundColor Cyan
$csFiles = Get-ChildItem -Path (Join-Path $repoRoot "installer") -Recurse -Filter "*.cs" | Select-Object -ExpandProperty FullName
Write-Host ("  -> Found " + $csFiles.Count + " source files.") -ForegroundColor Gray

$cscArgs = @(
    "/target:winexe",
    "/optimize+",
    "/utf8output",
    "/out:$outExe",
    "/win32icon:`"$(Join-Path $repoRoot 'installer\app_icon.ico')`"",
    "/win32manifest:`"$(Join-Path $repoRoot 'installer\app.manifest')`"",
    "/resource:`"$(Join-Path $repoRoot 'installer\app_logo.png')`",app_logo.png",
    "/r:System.dll",
    "/r:System.Core.dll",
    "/r:System.Drawing.dll",
    "/r:System.Windows.Forms.dll",
    "/r:System.Web.Extensions.dll",
    "/r:System.Xaml.dll",
    "/r:$(Join-Path (Split-Path $cscPath) 'WPF\\WindowsBase.dll')",
    "/r:$(Join-Path (Split-Path $cscPath) 'WPF\\PresentationCore.dll')",
    "/r:$(Join-Path (Split-Path $cscPath) 'WPF\\PresentationFramework.dll')"
)
$cscArgs += $csFiles

Write-Host "[2/4] Compiling FluxCordInstaller.exe..." -ForegroundColor Cyan
& $cscPath $cscArgs
if ($LASTEXITCODE -ne 0) {
    Write-Error "Compilation failed with exit code $LASTEXITCODE"
    exit $LASTEXITCODE
}
Write-Host "  -> Compiled successfully: $outExe" -ForegroundColor Green

if (-not $SkipTest) {
    Write-Host "[3/4] Running installer self-tests (--self-test)..." -ForegroundColor Cyan
    $testReport = Join-Path $repoRoot "installer-selftest.log"
    if (Test-Path $testReport) { Remove-Item $testReport -Force }
    $proc = Start-Process -FilePath $outExe -ArgumentList "--self-test", $testReport -Wait -PassThru -NoNewWindow
    if (Test-Path $testReport) {
        Get-Content $testReport | ForEach-Object { Write-Host "  $_" -ForegroundColor Gray }
    }
    if ($proc.ExitCode -ne 0) {
        Write-Error "Automated self-tests failed with exit code $($proc.ExitCode)"
        exit $proc.ExitCode
    }
    Write-Host "  -> All self-tests passed!" -ForegroundColor Green
} else {
    Write-Host "[3/4] Self-tests skipped (-SkipTest)." -ForegroundColor Yellow
}

Write-Host "[4/4] Publishing artifacts..." -ForegroundColor Cyan
if (!(Test-Path $distInstallerDir)) {
    New-Item -ItemType Directory -Path $distInstallerDir -Force | Out-Null
}
Copy-Item -Path $outExe -Destination (Join-Path $distInstallerDir "FluxCordInstaller.exe") -Force

Write-Host "Build complete!" -ForegroundColor Green
