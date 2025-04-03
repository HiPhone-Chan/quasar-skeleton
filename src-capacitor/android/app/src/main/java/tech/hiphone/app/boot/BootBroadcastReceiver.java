package tech.hiphone.app.boot;

import android.content.BroadcastReceiver;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.util.Log;

import tech.hiphone.app.MainActivity;

/**
 * 接收开机启动
 * 手动触发测试 adb shell am broadcast -a android.intent.action.BOOT_COMPLETED -n tech.hiphone.app/.boot.BootBroadcastReceiver
 *
 * @Date: 2025/2/26 14:22
 * @Author: chf
 */
public class BootBroadcastReceiver extends BroadcastReceiver {

    private static final String TAG = "BootBroadcastReceiver";

    @Override
    public void onReceive(Context context, Intent intent) {
        Log.i(TAG, "onReceive: " + intent.getAction());
        Log.i(TAG, "Build version: " + Build.VERSION.SDK_INT);
        if (Intent.ACTION_BOOT_COMPLETED.equals(intent.getAction())) {
//            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
//                Intent serviceIntent = new Intent(context, MyBootService.class);
//                context.startForegroundService(serviceIntent);
//            } else {
//            }
            MyBootService.startMainActivity(context);

        }
    }
}
