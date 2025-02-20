package tech.hiphone.plugin.filesystem.support;

import android.util.Log;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.util.Objects;

import okhttp3.Response;
import okhttp3.ResponseBody;

/**
 * @Date: 2025/1/17 9:44
 * @Author: chf
 */
public class FileDownload {

    private static final String TAG = "FileDownload";
    private static final int BUFFER_SIZE = 4096;

    private final DownloadProgressCallback downloadProgressCallback;

    public FileDownload(DownloadProgressCallback downloadProgressCallback) {
        this.downloadProgressCallback = downloadProgressCallback;
    }

    public void download(DownloadRequestInfo downloadRequestInfo) {
        Thread thread = new Thread(new Runnable() {
            @Override
            public void run() {
                blockDownload(downloadRequestInfo);
            }
        });
        thread.start();
    }

    private void blockDownload(DownloadRequestInfo downloadRequestInfo) {
        String url = downloadRequestInfo.getUrl();

        try (Response getResponse = HttpUtil.get(url);
             ResponseBody getBody = getResponse.body();
             InputStream inputStream = Objects.requireNonNull(getBody).byteStream();
             FileOutputStream fileOutputStream = new FileOutputStream(downloadRequestInfo.getDist());) {
            String contentLength = getResponse.header("Content-Length");
            int fileLength = (contentLength == null) ? 0 : Integer.parseInt(contentLength);

            if (!getResponse.isSuccessful()) {
                downloadProgressCallback.onProgressChange(DownloadProgressInfo.FAIL);
                return;
            }

            byte[] buffer = new byte[BUFFER_SIZE];
            int totalDownloadedLength = 0;
            int len = 0;

            while ((len = inputStream.read(buffer)) != -1) {
                fileOutputStream.write(buffer, 0, len);

                if (downloadRequestInfo.isProgress() && fileLength > 0) {
                    totalDownloadedLength += len;
                    downloadProgressCallback.onProgressChange(DownloadProgressInfo.downloading(totalDownloadedLength, fileLength));
                }
            }

            fileOutputStream.flush();
            downloadProgressCallback.onProgressChange(DownloadProgressInfo.SUCCESS);
        } catch (IOException e) {
            Log.e(TAG, "download failed: ", e);
            downloadProgressCallback.onProgressChange(DownloadProgressInfo.FAIL);
        }
    }

}
