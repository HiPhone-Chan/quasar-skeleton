package tech.hiphone.app;

import android.content.Context;

import com.norman.webviewup.lib.source.UpgradeAssetSource;
import com.norman.webviewup.lib.source.UpgradePackageSource;
import com.norman.webviewup.lib.source.UpgradeSource;

import java.io.File;

/**
 * @Date: 2024/12/31 18:48
 * @Author: chf
 */
public class UpgradeInfo {
    // 内置
    public static final int EMBEDDED = 1;
    // 安装包安装
    public static final int INSTALLED = 2;
    // 网络下载
    public static final int NETWORK = 3;

    private UpgradeInfo(String packageName, String versionName, String path, int webviewLocation) {
        this.path = path;
        this.packageName = packageName;
        this.versionName = versionName;
        this.webviewLocation = webviewLocation;
    }

    public static UpgradeInfo embededApk(String packageName, String versionName, String url) {
        return new UpgradeInfo(packageName, versionName, url, EMBEDDED);
    }

    public static UpgradeInfo networkApk(String packageName, String versionName, String url) {
        return new UpgradeInfo(packageName, versionName, url, INSTALLED);
    }

    public static UpgradeInfo installedApk(String packageName) {
        return new UpgradeInfo(packageName, null, null, INSTALLED);
    }

    private String packageName;

    private String versionName;
    // url或者apk名字
    private String path;
    private int webviewLocation;


    public String getPackageName() {
        return packageName;
    }

    public void setPackageName(String packageName) {
        this.packageName = packageName;
    }

    public String getVersionName() {
        return versionName;
    }

    public void setVersionName(String versionName) {
        this.versionName = versionName;
    }

    public String getPath() {
        return path;
    }

    public void setPath(String path) {
        this.path = path;
    }

    public int getWebviewLocation() {
        return webviewLocation;
    }

    public void setWebviewLocation(int webviewLocation) {
        this.webviewLocation = webviewLocation;
    }

    public UpgradeSource toUpgradeSource(Context applicationContext) {
        UpgradeSource upgradeSource = null;
        switch (this.webviewLocation) {
            case INSTALLED:
                upgradeSource = new UpgradePackageSource(
                        applicationContext,
                        this.packageName
                );
                break;
            case EMBEDDED:
            case NETWORK:
            default:
                upgradeSource = new UpgradeAssetSource(
                        applicationContext,
                        this.path,
                        new File(applicationContext.getFilesDir(), this.packageName + "/" + this.versionName + ".apk")
                );
        }
        return upgradeSource;
    }
}
