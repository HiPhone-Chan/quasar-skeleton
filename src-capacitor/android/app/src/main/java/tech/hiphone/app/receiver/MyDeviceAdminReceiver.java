package tech.hiphone.app.receiver;

import android.app.admin.DeviceAdminReceiver;

/**
 * 前提：设备已经获得root权限
 * 1 AndroidManifest.xml 设置 Receiver
 * 2 安装APP
 * 3 执行 adb shell dpm set-device-owner tech.hiphone.app/.receiver.MyDeviceAdminReceiver
 *    不然Kios模式会弹窗
 * @Date: 2025/3/5 18:16
 * @Author: chf
 */
public class MyDeviceAdminReceiver extends DeviceAdminReceiver {
}
