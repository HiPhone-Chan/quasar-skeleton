package tech.hiphone.plugin.serialport.support;

import android.nativecpp.ext.api.NativeSerialPort;

/**
 * @Date: 2025/1/4 10:04
 * @Author: chf
 */
public class SerialPortHandler {

    private static final String TAG = "SerialPortHandler";
    private static final NativeSerialPort serialPort = NativeSerialPort.SerialPort;

    private final String path;

    private final OpenSerialPortParam openSerialPortParam;
    private int serialFd;

    private ReadSerialPortRunnable readSerialPortRunnable;

    public SerialPortHandler(String path, OpenSerialPortParam openSerialPortParam) {
        this.path = path;
        this.openSerialPortParam = openSerialPortParam;
    }

    public int open(SerialPortDataListener listener) {
        this.serialFd = serialPort.open(path, openSerialPortParam.getBaudrate(), openSerialPortParam.getDataBits(), openSerialPortParam.getStopBits(), openSerialPortParam.getParity());

        if (this.serialFd > 0) {
            this.readSerialPortRunnable = new ReadSerialPortRunnable(listener);
            Thread readThread = new Thread(readSerialPortRunnable);
            readThread.start();
            return NativeSerialPort.SUCCESS;
        }
        
        return NativeSerialPort.FAILED;
    }

    public int close() {
        int result = serialPort.close(this.serialFd);

        if (NativeSerialPort.SUCCESS == result && readSerialPortRunnable != null) {
            readSerialPortRunnable.stop();
        }

        return result;
    }

    public int write(byte[] writeBytes) {
        return serialPort.write(this.serialFd, writeBytes);
    }

    private class ReadSerialPortRunnable implements Runnable {

        private volatile boolean running = true;
        private final SerialPortDataListener serialPortDataListener;

        public ReadSerialPortRunnable(SerialPortDataListener serialPortDataListener) {
            this.serialPortDataListener = serialPortDataListener;
        }

        @Override
        public void run() {
            while (running) {
                byte[] readBytes = serialPort.read(serialFd);

                if (readBytes != null && readBytes.length > 0) {
                    serialPortDataListener.onDataReceived(readBytes);
                }

                if (Thread.currentThread().isInterrupted()) {
                    break;
                }
            }
        }

        public void stop() {
            running = false;
            Thread.currentThread().interrupt();
        }
    }
}

