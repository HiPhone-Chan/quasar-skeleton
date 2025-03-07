package tech.hiphone.plugin.app;

import android.app.Activity;
import android.content.ComponentName;
import android.text.TextUtils;
import android.util.Log;

import androidx.activity.OnBackPressedCallback;
import androidx.appcompat.app.AppCompatActivity;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;

@CapacitorPlugin(name = "MyApp")
public class AppPlugin extends Plugin {

    private static final String TAG = "MyAppPlugin";
    private App implementation;
    private ComponentName deviceAdminReceiver;

    @Override
    protected void handleOnStart() {
        super.handleOnStart();
        Activity activity = getActivity();

        implementation = new App(activity, new RequestPermissionCallback() {
            @Override
            public void result(boolean success) {
                JSObject notifyData = new JSObject();
                notifyData.put("result", success);
                notifyListeners("onPermissionResponse", notifyData);
            }
        });
    }

    @PluginMethod()
    public void install(PluginCall call) {
        String downloadFilePath = call.getString("downloadFilePath");
        Log.i(TAG, "installing " + downloadFilePath);
        if (downloadFilePath == null || downloadFilePath.isBlank()) {
            call.reject("downloadFilePath is empty");
            return;
        }
        String packageName = getContext().getPackageName();
        File apk = new File(downloadFilePath);
        Log.i(TAG, "packageName info: " + packageName);

        implementation.install(packageName + ".file_provider", apk);
    }

    @PluginMethod()
    public void setDeviceAdminReceiver(PluginCall call) {
        String deviceAdminReceiverClassName = call.getString("deviceAdminReceiverClassName");

        try {
            if (TextUtils.isEmpty(deviceAdminReceiverClassName)) {
                call.reject("deviceAdminReceiverClassName is empty.");
            } else {
                implementation.setDeviceAdminReceiver(deviceAdminReceiverClassName);
                call.resolve();
            }
        } catch (ClassNotFoundException e) {
            call.reject("Not found");
        }
    }

    // 检查是否已是设备管理员
    @PluginMethod()
    public void isAdminActive(PluginCall call) {
        boolean result = implementation.isAdminActive();

        JSObject ret = new JSObject();
        ret.put("result", result);
        call.resolve(ret);
    }

    @PluginMethod()
    public void requestAdmin(PluginCall call) {
        implementation.requestAdmin();
        call.resolve();
    }

    @PluginMethod()
    public void removeAdmin(PluginCall call) {
        implementation.removeAdmin();
        call.resolve();
    }

    @PluginMethod()
    public void enableKioskMode(PluginCall call) {
        Log.d(TAG, "enable Kiosk Mode");
        implementation.enableKioskMode();
        call.resolve();
    }

    @PluginMethod()
    public void enterFullscreen(PluginCall call) {
        Log.d(TAG, "enter fullscreen");
        implementation.enterFullscreen();
        call.resolve();
    }

    @PluginMethod()
    public void exitFullscreen(PluginCall call) {
        Log.d(TAG, "exit fullscreen");
        implementation.exitFullscreen();
        call.resolve();
    }

    @PluginMethod()
    public void handleOnBackPressed(PluginCall call) {
        AppCompatActivity activity = getActivity();
        activity.getOnBackPressedDispatcher().addCallback(activity, new OnBackPressedCallback(true) {
            @Override
            public void handleOnBackPressed() {
                notifyListeners("onBackPressed", new JSObject());
            }
        });
    }
}
