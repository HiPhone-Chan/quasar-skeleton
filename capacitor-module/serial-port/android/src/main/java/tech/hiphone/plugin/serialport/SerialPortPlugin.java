package tech.hiphone.plugin.serialport;

import android.text.TextUtils;
import android.util.Log;

import com.getcapacitor.JSArray;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import org.json.JSONException;

import tech.hiphone.plugin.serialport.support.OpenSerialPortParam;
import tech.hiphone.plugin.serialport.support.SerialPortDataListener;
import tech.hiphone.plugin.serialport.util.ByteUtil;
import tech.hiphone.plugin.serialport.util.WrapperTypeUtil;

@CapacitorPlugin(name = "SerialPort")
public class SerialPortPlugin extends Plugin {

    private static final String TAG = "SerialPortPlugin";

    private static final SerialPort implementation = SerialPort.getInstance();

    @PluginMethod()
    public void list(PluginCall call) {
        JSArray result = new JSArray();

        for (String port : SerialPort.list()) {
            result.put(port);
        }

        JSObject ret = new JSObject();
        ret.put("result", result);
        call.resolve(ret);
    }

    @PluginMethod()
    public void open(PluginCall call) {
        Log.i(TAG, "open serial.");

        // "/dev/ttyS2"
        String path = call.getString("path");
        if (TextUtils.isEmpty(path)) {
            call.reject("Path is empty");
            return;
        }

        int baudrate = WrapperTypeUtil.get(call.getInt("baudrate"), 115200);
        int dataBits = WrapperTypeUtil.get(call.getInt("dataBits"), 8);
        int stopBits = WrapperTypeUtil.get(call.getInt("stopBits"), 1);
        int parity = WrapperTypeUtil.get(call.getInt("parity"), 0);

        int result = implementation.open(path, new OpenSerialPortParam(baudrate, dataBits, stopBits, parity), new SerialPortDataListener() {
            @Override
            public void onDataReceived(byte[] data) {
                JSObject notifyData = new JSObject();

                Log.i(TAG, "Data received on " + path + " : " + ByteUtil.toHexString(data));

                JSArray array = new JSArray();
                for (byte b : data) {
                    array.put(ByteUtil.toUnsignedInt(b));
                }
                notifyData.put("data", array);
                notifyData.put("path", path);
                notifyListeners("onDataReceived", notifyData);
            }

        });

        JSObject ret = new JSObject();
        ret.put("result", result);
        call.resolve(ret);
    }

    @PluginMethod()
    public void close(PluginCall call) {
        Log.i(TAG, "close serial.");
        String path = call.getString("path");
        if (TextUtils.isEmpty(path)) {
            call.reject("Path is empty");
            return;
        }
        int result = implementation.close(path);

        JSObject ret = new JSObject();
        ret.put("result", result);
        call.resolve(ret);
    }

    @PluginMethod()
    public void write(PluginCall call) {
        Log.d(TAG, "write serial.");
        String path = call.getString("path");
        if (TextUtils.isEmpty(path)) {
            call.reject("Path is empty");
            return;
        }

        int result = 0;
        JSArray array = call.getArray("value", new JSArray());
        try {
            int length = array == null ? 0 : array.length();

            if (length > 0) {
                byte[] writeBytes = new byte[length];
                for (int i = 0; i < length; i++) {
                    writeBytes[i] = ((byte) ((int) array.get(i)));
                }

                Log.i(TAG, "Write to " + path + ": " + ByteUtil.toHexString(writeBytes));

                result = implementation.write(path, writeBytes);
            }
        } catch (JSONException e) {
            throw new RuntimeException(e);
        }

        JSObject ret = new JSObject();
        ret.put("result", result);
        call.resolve(ret);
    }
}
