package android.nativecpp.ext.api;

/**
 * @Date: 2025/1/2 12:10
 * @Author: chf
 */
public class NativeSerialPort {

    public static final int SUCCESS = 0;
    public static final int FAILED = -1;

    static {
        System.loadLibrary("serial-port");
    }

    public static final NativeSerialPort SerialPort = new NativeSerialPort();

    /**
     * 打开串口
     * @param path
     * @param baudrate
     * @param dataBits
     * @param stopBits
     * @param parity
     * @return serialFd 串口文件描述
     */
    public native int open(String path, int baudrate, int dataBits, int stopBits, int parity);

    public native int close(int serialFd);

    public native int write(int serialFd, byte[] data);

    public native byte[] read(int serialFd);
}
