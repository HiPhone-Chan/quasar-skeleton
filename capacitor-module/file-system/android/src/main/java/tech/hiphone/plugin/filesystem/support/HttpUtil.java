package tech.hiphone.plugin.filesystem.support;

import java.io.IOException;

import okhttp3.Call;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

/**
 * @Date: 2025/1/16 21:25
 * @Author: chf
 */
public class HttpUtil {

    public static final MediaType MEDIA_TYPE_APPLICATION_JSON
            = MediaType.parse("application/json; charset=utf-8");
    private static final OkHttpClient okHttpClient = new OkHttpClient();

    private HttpUtil() {
    }

    public static Response get(String url) throws IOException {
        Request request = new Request.Builder().url(url)
                .get().build();

        Call call = okHttpClient.newCall(request);
        return call.execute();
    }


}
