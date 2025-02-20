package tech.hiphone.plugin.filesystem.support;

/**
 * @Date: 2025/1/23 21:03
 * @Author: chf
 */
public class DownloadProgressInfo {

    public static final DownloadProgressInfo SUCCESS = new DownloadProgressInfo(0, 0, true, true);
    public static final DownloadProgressInfo FAIL = new DownloadProgressInfo(0, 0, false, true);

    private int currentLength = 0;
    private int totalLength;
    private boolean success = false;
    private boolean finished = false;

    public DownloadProgressInfo(int currentLength, int totalLength, boolean success, boolean finished) {
        this.currentLength = currentLength;
        this.totalLength = totalLength;
        this.success = success;
        this.finished = finished;
    }

    public static DownloadProgressInfo downloading(int currentLength, int totalLength) {
        return new DownloadProgressInfo(currentLength, totalLength, false, false);
    }

    public int getCurrentLength() {
        return currentLength;
    }

    public void setCurrentLength(int currentLength) {
        this.currentLength = currentLength;
    }

    public int getTotalLength() {
        return totalLength;
    }

    public void setTotalLength(int totalLength) {
        this.totalLength = totalLength;
    }

    public boolean isSuccess() {
        return success;
    }

    public void setSuccess(boolean success) {
        this.success = success;
    }

    public boolean isFinished() {
        return finished;
    }

    public void setFinished(boolean finished) {
        this.finished = finished;
    }
}
