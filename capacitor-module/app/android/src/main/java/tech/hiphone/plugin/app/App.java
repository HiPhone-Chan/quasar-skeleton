package tech.hiphone.plugin.app;

import android.Manifest;
import android.app.Activity;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;

import androidx.core.app.ActivityCompat;
import androidx.core.content.FileProvider;

import java.io.File;

public class App {

    private static final String TAG = "MyApp";

    // 注意authority要和AndroidManifest.xml中的provider一致
    // android:authorities="${applicationId}.file_provider"
    public static void install(Activity context, String authority, File apk) {
        try {
            Log.i(TAG, "apk can read: " + apk.canRead());
            Log.i(TAG, "apk can length: " + apk.length());
            PackageManager pm = context.getPackageManager();
            PackageInfo packageInfo = pm.getPackageArchiveInfo(apk.getAbsolutePath(), 0);

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.M) {
                if (context.checkSelfPermission(Manifest.permission.READ_EXTERNAL_STORAGE) != PackageManager.PERMISSION_GRANTED) {
                    ActivityCompat.requestPermissions(context, new String[]{Manifest.permission.READ_EXTERNAL_STORAGE}, 100);
                    Log.i(TAG, "checkSelfPermission fail");
                } else {
                    Log.i(TAG, "checkSelfPermission success");
                }
            }


            if (packageInfo != null) {
                // 成功获取到 packageInfo
                String packageName = packageInfo.packageName;
                String versionName = packageInfo.versionName;
                Log.d(TAG, "Package Name: " + packageName + ", Version: " + versionName);
            } else {
                Log.e(TAG, "Failed to get package information.");
            }
            // 声明安装权限即可，不需要动态申请
            Intent intent = new Intent(Intent.ACTION_VIEW);
            intent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK); // 启动新任务
            intent.addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION); // 授权 URI 读取权限

            Uri uri = FileProvider.getUriForFile(context, authority, apk);
            intent.setDataAndType(uri, "application/vnd.android.package-archive");
            context.startActivity(intent);
        } catch (Exception e) {
            Log.e(TAG, "install failed: ", e);
        }
    }
}
