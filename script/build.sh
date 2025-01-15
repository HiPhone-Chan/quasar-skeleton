SCRIPT_PATH=$(
    cd $(dirname $0)
    pwd
)
PROJECT_PATH=$(dirname $SCRIPT_PATH)

cd $PROJECT_PATH
if [ -f $PROJECT_PATH/script/.env ]; then
    source $PROJECT_PATH/script/.env
fi

if [ -f $PROJECT_PATH/script/.env.local ]; then
    source $PROJECT_PATH/script/.env.local
fi

BUILD_DIST_PATH=$PROJECT_PATH/dist/capacitor/android/apk/release

ANDROID_BUILD_TOOL_PATH=~/Library/Android/sdk/build-tools/${ANDROID_BUILD_VERSION}
ZIPALIGN=${ANDROID_BUILD_TOOL_PATH}/zipalign
APKSIGNER=${ANDROID_BUILD_TOOL_PATH}/apksigner

echo Building Quasar project...
npx cross-env APP_ENV=production quasar build -m capacitor -T android
${ZIPALIGN} -v 4 ${BUILD_DIST_PATH}/app-release-unsigned.apk ${BUILD_DIST_PATH}/app-release.apk
${APKSIGNER} sign --ks ${PROJECT_PATH}/script/my-release-key.keystore --ks-key-alias ${KS_KEY_ALIAS} --ks-pass pass:${KS_PASS} ${BUILD_DIST_PATH}/app-release.apk
