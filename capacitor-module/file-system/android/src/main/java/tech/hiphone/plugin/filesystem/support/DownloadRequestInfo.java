package tech.hiphone.plugin.filesystem.support;

import java.io.File;

/**
 * @Date: 2025/1/17 9:42
 * @Author: chf
 */
public class DownloadRequestInfo {

    private String url;
    private File dist;

    private boolean progress;

    public DownloadRequestInfo() {
    }

    public DownloadRequestInfo(String url, File dist, boolean progress) {
        this.url = url;
        this.dist = dist;
        this.progress = progress;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public File getDist() {
        return dist;
    }

    public void setDist(File dist) {
        this.dist = dist;
    }

    public boolean isProgress() {
        return progress;
    }

    public void setProgress(boolean progress) {
        this.progress = progress;
    }
}


