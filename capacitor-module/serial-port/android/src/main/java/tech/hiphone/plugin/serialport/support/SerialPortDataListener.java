package tech.hiphone.plugin.serialport.support;

/**
 * @Date: 2025/1/2 22:04
 * @Author: chf
 */
public interface SerialPortDataListener {

    void onDataReceived(byte[] data);
}
