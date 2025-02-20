package tech.hiphone.plugin.serialport;

import android.nativecpp.ext.api.NativeSerialPort;

import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import tech.hiphone.plugin.serialport.support.OpenSerialPortParam;
import tech.hiphone.plugin.serialport.support.SerialPortDataListener;
import tech.hiphone.plugin.serialport.support.SerialPortHandler;

public class SerialPort {

    // path: fd
    private static final Map<String, SerialPortHandler> serialPorts = new HashMap<>();

    private static final SerialPort instance = new SerialPort();

    private SerialPort() {
    }

    public static SerialPort getInstance() {
        return instance;
    }

    public static String[] list() {
        List<String> paths = new ArrayList<>();
        File devDir = new File("/dev");
        File[] devFiles = devDir.listFiles();
        if (devFiles != null) {
            for (File device : devFiles) {
                String path = device.getAbsolutePath();
                if (path.contains("ttyS") || path.contains("ttyUSB")) {
                    paths.add(device.getAbsolutePath());
                }
            }
        }

        return paths.toArray(new String[paths.size()]);
    }

    public int open(String path, OpenSerialPortParam openSerialPortParam, SerialPortDataListener listener) {
        SerialPortHandler serialPortHandler = new SerialPortHandler(path, openSerialPortParam);
        int result = serialPortHandler.open(listener);
        if (NativeSerialPort.SUCCESS == result) {
            serialPorts.put(path, serialPortHandler);
        }
        return result;
    }

    public int close(String path) {
        SerialPortHandler serialPortHandler = serialPorts.get(path);
        if (serialPortHandler == null) {
            return NativeSerialPort.SUCCESS;
        }
        int result = serialPortHandler.close();

        if (NativeSerialPort.SUCCESS == result) {
            serialPorts.remove(path);
        }
        return result;
    }

    public int write(String path, byte[] writeBytes) {
        SerialPortHandler serialPortHandler = serialPorts.get(path);
        if (serialPortHandler == null) {
            return 0;
        }
        return serialPortHandler.write(writeBytes);
    }
}
