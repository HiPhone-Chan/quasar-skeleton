package tech.hiphone.plugin.app;

import android.util.Log;

import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.File;

@CapacitorPlugin(name = "App")
public class AppPlugin extends Plugin {

    private static final String TAG = "MyAppPlugin";
//    private App implementation = new App();

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

        App.install(getActivity(), packageName + ".file_provider", apk);
    }
}
