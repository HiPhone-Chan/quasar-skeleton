package tech.hiphone.app;

import android.os.Bundle;
import android.util.Log;
import android.webkit.WebSettings;
import android.webkit.WebView;

import com.getcapacitor.BridgeActivity;
import com.norman.webviewup.lib.UpgradeCallback;
import com.norman.webviewup.lib.WebViewUpgrade;
import com.norman.webviewup.lib.source.UpgradeSource;

public class MainActivity extends BridgeActivity {

    private static final String TAG = "MainActivity";

    @Override
    protected void onCreate(Bundle savedInstanceState) {

        updateWebView();
        super.onCreate(savedInstanceState);

    }

    public void updateWebView() {
        UpgradeSource upgradeSource = UpgradeInfo.installedApk("com.android.chrome")
                .toUpgradeSource(getApplicationContext());

        WebViewUpgrade.addUpgradeCallback(new UpgradeCallback() {

            @Override
            public void onUpgradeProcess(float percent) {
                Log.i(TAG, "onUpgradeProcess: " + percent);
            }

            @Override
            public void onUpgradeComplete() {
                Log.i(TAG, "onUpgradeComplete: ");
                WebView webView = getBridge().getWebView();
                WebSettings settings = webView.getSettings();
                Log.i(TAG, settings.getUserAgentString());
            }

            @Override
            public void onUpgradeError(Throwable throwable) {
                Log.i(TAG, "onUpgradeError: " + throwable);
            }
        });

        WebViewUpgrade.upgrade(upgradeSource);
    }
}
