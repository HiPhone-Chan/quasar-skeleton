package tech.hiphone.plugin.app;

import android.Manifest;
import android.app.Activity;
import android.app.admin.DevicePolicyManager;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.pm.PackageInfo;
import android.content.pm.PackageManager;
import android.net.Uri;
import android.os.Build;
import android.util.Log;
import android.view.View;
import android.view.Window;
import android.view.WindowInsets;
import android.view.WindowInsetsController;
import android.view.WindowManager;

import androidx.activity.result.ActivityResultLauncher;
import androidx.activity.result.contract.ActivityResultContracts;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.FileProvider;
import androidx.core.view.WindowCompat;
import androidx.core.view.WindowInsetsCompat;
import androidx.core.view.WindowInsetsControllerCompat;

import java.io.File;

public class App {

    private static final String TAG = "MyApp";

    private final Activity activity;

    private ComponentName deviceAdminReceiver;
    private ActivityResultLauncher<Intent> adminPermissionLauncher;

    public App(Activity activity, RequestPermissionCallback callback) {
        this.activity = activity;

        adminPermissionLauncher = ((AppCompatActivity) activity).registerForActivityResult(new ActivityResultContracts.StartActivityForResult(), result -> {
            callback.result(this.isAdminActive());
        });

    }

    // 注意authority要和AndroidManifest.xml中的provider一致
    // android:authorities="${applicationId}.file_provider"
    public void install(String authority, File apk) {
        try {
            Activity context = activity;
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

    public void setDeviceAdminReceiver(String className) throws ClassNotFoundException {
        deviceAdminReceiver = new ComponentName(activity, Class.forName(className));
    }

    public boolean isAdminActive() {
        if (deviceAdminReceiver == null) {
            return false;
        }
        DevicePolicyManager devicePolicyManager = (DevicePolicyManager) activity.getSystemService(Context.DEVICE_POLICY_SERVICE);
        return devicePolicyManager.isAdminActive(deviceAdminReceiver);
    }

    public void requestAdmin() {
        // 请求设备管理员权限
        Intent intent = new Intent(DevicePolicyManager.ACTION_ADD_DEVICE_ADMIN);
        intent.putExtra(DevicePolicyManager.EXTRA_DEVICE_ADMIN, deviceAdminReceiver);
        intent.putExtra(DevicePolicyManager.EXTRA_ADD_EXPLANATION, "需要设备管理员权限以启用 Kiosk 模式");
        adminPermissionLauncher.launch(intent);
    }

    public void removeAdmin() {
        DevicePolicyManager devicePolicyManager = (DevicePolicyManager) activity.getSystemService(Context.DEVICE_POLICY_SERVICE);
        devicePolicyManager.removeActiveAdmin(deviceAdminReceiver);
    }

    public void enterFullscreen() {
        activity.runOnUiThread(() -> {
            Window window = activity.getWindow();
            View decorView = window.getDecorView();
            WindowCompat.setDecorFitsSystemWindows(window, false);
            WindowInsetsControllerCompat windowInsetsController = WindowCompat.getInsetsController(window, decorView);
            windowInsetsController.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_TRANSIENT_BARS_BY_SWIPE);
            hideSystemUI();

            decorView.setOnApplyWindowInsetsListener((v, insets) -> {
                // Check if the system bars are visible
                boolean systemBarsVisible = (insets.getSystemWindowInsetTop() > 0 || insets.getSystemWindowInsetBottom() > 0);
                if (systemBarsVisible) {
                    hideSystemUI();
                }
                return insets;
            });

        });
    }

    public void exitFullscreen() {
        activity.runOnUiThread(() -> {
            Window window = activity.getWindow();
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.P) {
                WindowManager.LayoutParams lp = window.getAttributes();
                lp.layoutInDisplayCutoutMode = WindowManager.LayoutParams.LAYOUT_IN_DISPLAY_CUTOUT_MODE_DEFAULT;
                window.setAttributes(lp);
            }
            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.R) {
                WindowInsetsController ic = window.getInsetsController();
                window.setDecorFitsSystemWindows(true);
                ic.setSystemBarsBehavior(WindowInsetsController.BEHAVIOR_DEFAULT);
                ic.show(WindowInsets.Type.statusBars());
                ic.show(WindowInsets.Type.navigationBars());
            } else {
                window.addFlags(WindowManager.LayoutParams.FLAG_FORCE_NOT_FULLSCREEN);
                int flags = View.SYSTEM_UI_FLAG_VISIBLE;
                window.getDecorView().setSystemUiVisibility(flags);
            }
        });
    }

    public void enableKioskMode() {
        DevicePolicyManager devicePolicyManager = (DevicePolicyManager) activity.getSystemService(Context.DEVICE_POLICY_SERVICE);

        String packageName = activity.getPackageName();
        if (devicePolicyManager.isDeviceOwnerApp(packageName)) {
            String[] packages = {packageName};
            devicePolicyManager.setLockTaskPackages(deviceAdminReceiver, packages);
        }
        activity.startLockTask(); // 启用 Kiosk 模式
    }

    private void hideSystemUI() {
        int visibility = View.SYSTEM_UI_FLAG_LAYOUT_STABLE | View.SYSTEM_UI_FLAG_FULLSCREEN | // 隐藏状态栏
                View.SYSTEM_UI_FLAG_HIDE_NAVIGATION | // 隐藏导航栏
                View.SYSTEM_UI_FLAG_IMMERSIVE_STICKY |  // 保持沉浸式模式，即使用户手势滑动
                View.SYSTEM_UI_FLAG_LAYOUT_FULLSCREEN | View.SYSTEM_UI_FLAG_LAYOUT_HIDE_NAVIGATION;

        Window window = activity.getWindow();
        View decorView = window.getDecorView();
        WindowInsetsControllerCompat windowInsetsController = WindowCompat.getInsetsController(window, decorView);
        windowInsetsController.hide(WindowInsetsCompat.Type.systemBars());
//        windowInsetsController.setSystemBarsBehavior(WindowInsetsControllerCompat.BEHAVIOR_SHOW_BARS_BY_TOUCH);
        decorView.setSystemUiVisibility(visibility);
    }
}
