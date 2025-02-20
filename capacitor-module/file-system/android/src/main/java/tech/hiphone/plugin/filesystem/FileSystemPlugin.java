package tech.hiphone.plugin.filesystem;

import android.Manifest;
import android.util.Log;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;
import com.getcapacitor.annotation.Permission;

import java.io.File;

import tech.hiphone.plugin.filesystem.support.DownloadProgressCallback;
import tech.hiphone.plugin.filesystem.support.DownloadProgressInfo;
import tech.hiphone.plugin.filesystem.support.DownloadRequestInfo;

@CapacitorPlugin(name = "FileSystem", permissions = {
        @Permission(
                strings = {Manifest.permission.READ_EXTERNAL_STORAGE, Manifest.permission.WRITE_EXTERNAL_STORAGE},
                alias = "publicStorage"
        )
})
public class FileSystemPlugin extends Plugin {

    private static final String TAG = "FileSystemPlugin";

//    private FileSystem implementation = new FileSystem();

    @PluginMethod()
    public void length(PluginCall call) {
        String path = call.getString("path");
        File checkFile = new File(path);

        JSObject ret = new JSObject();
        ret.put("length", checkFile.length());
        call.resolve(ret);
    }

    @PluginMethod()
    public void delete(PluginCall call) {
        String path = call.getString("path");
        File checkFile = new File(path);

        JSObject ret = new JSObject();
        ret.put("result", checkFile.delete());
        call.resolve(ret);
    }

    @PluginMethod()
    public void download(PluginCall call) {

        String url = call.getString("url");
        if (url == null || url.isBlank()) {
            call.reject("url is empty");
            return;
        }
        Log.i(TAG, "downloading " + url);
        int lastSlashIndex = url.lastIndexOf("/");
        String fileName = url;
        if (lastSlashIndex > 0) {
            fileName = fileName.substring(lastSlashIndex + 1);
        }

        boolean progress = call.getBoolean("progress", false);
        File downloadFile = new File(getFileDir(), fileName);

        FileSystem.download(new DownloadRequestInfo(url, downloadFile, progress), new DownloadProgressCallback() {

            @Override
            public void onProgressChange(DownloadProgressInfo progressInfo) {
                JSObject notifyData = new JSObject();
                notifyData.put("currentLength", progressInfo.getCurrentLength());
                notifyData.put("totalLength", progressInfo.getTotalLength());
                notifyData.put("success", progressInfo.isSuccess());
                notifyData.put("finished", progressInfo.isFinished());
                notifyListeners("onProgressChange", notifyData);
            }

        });


        JSObject ret = new JSObject();
        ret.put("downloadFilePath", downloadFile.getPath());
        call.resolve(ret);
    }

    private File getFileDir() {
//        return Environment.getExternalStoragePublicDirectory(null);
        return getActivity().getFilesDir();
    }
}
