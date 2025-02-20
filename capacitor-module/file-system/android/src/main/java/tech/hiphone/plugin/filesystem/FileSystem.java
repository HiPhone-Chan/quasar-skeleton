package tech.hiphone.plugin.filesystem;

import android.util.Log;

import tech.hiphone.plugin.filesystem.support.DownloadProgressCallback;
import tech.hiphone.plugin.filesystem.support.DownloadRequestInfo;
import tech.hiphone.plugin.filesystem.support.FileDownload;

public class FileSystem {

    public static void download(DownloadRequestInfo downloadRequestInfo, DownloadProgressCallback downloadProgressCallback) {
        FileDownload fileDownload = new FileDownload(downloadProgressCallback);
        fileDownload.download(downloadRequestInfo);
    }
}
