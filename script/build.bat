@echo off
@REM 终端编码UTF-8，注意脚本换行符号应为CRLF
@chcp 65001

@REM 读取环境变量
if exist ".env" (
    for /f "tokens=1,2 delims==" %%a in ('type .env') do (
        set %%a=%%b
    )
)

if exist ".env.local" (
    for /f "tokens=1,2 delims==" %%a in ('type .env.local') do (
        set %%a=%%b
    )
)

@REM 相对路径转绝对路径, %~dp0 为脚本路径
set SCRIPT_PATH=%~dp0
for %%I in ("%~dp0/..") do set PROJECT_PATH=%%~fI
set ANDROID_BUILD_TOOLPATH=%ANDROID_SDK_PATH%/build-tools/%ANDROID_BUILD_VERSION%
set ZIPALIGN=%ANDROID_BUILD_TOOLPATH%/zipalign.exe
set APKSIGNER=%ANDROID_BUILD_TOOLPATH%/apksigner.bat

REM Ensure you're in the root project folder
@REM cd /d %~dp0/..
cd /d %PROJECT_PATH%

REM Build the Quasar project for production (optional: use a specific environment)
echo Building Quasar project...

set BUILD_DIST_PATH=%PROJECT_PATH%/dist/capacitor/android/apk/release

if "%DEBUG%"=="true" (
    echo Building in debug mode...
    call npx cross-env APP_ENV=production quasar build -m capacitor -T android -d
) else (
    call npx cross-env APP_ENV=production quasar build -m capacitor -T android

    call %ZIPALIGN% -v 4 %BUILD_DIST_PATH%/app-release-unsigned.apk %BUILD_DIST_PATH%/%RELEASE_APK_NAME%
    call %APKSIGNER% sign --ks %~dp0/my-release-key.keystore --ks-key-alias %KS_KEY_ALIAS% --ks-pass pass:%KS_PASS% %BUILD_DIST_PATH%/%RELEASE_APK_NAME%
)


@pause