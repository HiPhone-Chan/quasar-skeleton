SCRIPT_PATH=$(
    cd $(dirname $0)
    pwd
)
PROJECT_PATH=$(dirname $SCRIPT_PATH)

if [ -f $SCRIPT_PATH/.env ]; then
    source $SCRIPT_PATH/.env
fi

if [ -f $SCRIPT_PATH/.env.local ]; then
    source $SCRIPT_PATH/.env.local
fi

cd $PROJECT_PATH

ANDROID_BUILD_TOOL_PATH=${ANDROID_SDK_PATH}/build-tools/${ANDROID_BUILD_VERSION}
ZIPALIGN=${ANDROID_BUILD_TOOL_PATH}/zipalign
APKSIGNER=${ANDROID_BUILD_TOOL_PATH}/apksigner

echo Building Quasar project...
BUILD_DIST_PATH=$PROJECT_PATH/dist/capacitor/android/apk/release

if [ "$DEBUG" = "true" ]; then
    echo Building in debug mode...
    npx cross-env APP_ENV=production quasar build -m capacitor -T android -d
else
    npx cross-env APP_ENV=production quasar build -m capacitor -T android
    ${ZIPALIGN} -v 4 ${BUILD_DIST_PATH}/app-release-unsigned.apk ${BUILD_DIST_PATH}/${RELEASE_APK_NAME}
    ${APKSIGNER} sign --ks ${SCRIPT_PATH}/my-release-key.keystore --ks-key-alias ${KS_KEY_ALIAS} --ks-pass pass:${KS_PASS} ${BUILD_DIST_PATH}/${RELEASE_APK_NAME}
fi
