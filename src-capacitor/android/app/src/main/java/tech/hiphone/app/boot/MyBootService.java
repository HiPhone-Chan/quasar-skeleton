package tech.hiphone.app.boot;

import android.app.Notification;
import android.app.NotificationChannel;
import android.app.NotificationManager;
import android.app.Service;
import android.content.Context;
import android.content.Intent;
import android.os.Build;
import android.os.IBinder;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import tech.hiphone.app.MainActivity;
import tech.hiphone.app.R;

public class MyBootService extends Service {

    private static final String CHANNEL_ID = "MyBootForegroundServiceChannel";
    private static final String TAG = "MyBootService";

    @Override
    public void onCreate() {
        super.onCreate();
        Log.i(TAG, "前台服务已启动");
    }

    @Override
    public int onStartCommand(Intent intent, int flags, int startId) {
        Log.i(TAG, "onStartCommand");
        startForegroundServiceWithNotification();

        startMainActivity(this);
        return START_STICKY;
    }

    public static void startMainActivity(Context context) {
        Intent activityIntent = new Intent(context, MainActivity.class);
        activityIntent.addFlags(Intent.FLAG_ACTIVITY_NEW_TASK);  // 必须添加
        context.startActivity(activityIntent);
    }

    private void startForegroundServiceWithNotification() {
        if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.O) {
            NotificationManager manager = getSystemService(NotificationManager.class);
            NotificationChannel channel = new NotificationChannel(CHANNEL_ID, "Foreground Service Channel", NotificationManager.IMPORTANCE_LOW);
            if (manager != null) {
                manager.createNotificationChannel(channel);
            }
        }

        Notification notification = new NotificationCompat.Builder(this, CHANNEL_ID)
                .setContentTitle("Running")
                .setContentText("Foreground service is running")
                .setSmallIcon(R.mipmap.ic_launcher)
                .build();

        startForeground(1, notification);  // 确保立即调用
    }

    @Override
    public IBinder onBind(Intent intent) {
        return null;
    }


}