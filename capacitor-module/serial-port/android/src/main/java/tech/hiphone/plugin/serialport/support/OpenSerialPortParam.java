package tech.hiphone.plugin.serialport.support;

/**
 * @Date: 2025/1/4 9:53
 * @Author: chf
 */
public class OpenSerialPortParam {
    // 波特率
    private int baudrate;
    // 数据位
    private int dataBits;
    // 停止位
    private int stopBits;
    // 校验位
    private int parity;

    public OpenSerialPortParam() {
    }

    public OpenSerialPortParam(int baudrate, int dataBits, int stopBits, int parity) {
        this.baudrate = baudrate;
        this.dataBits = dataBits;
        this.stopBits = stopBits;
        this.parity = parity;
    }

    public int getBaudrate() {
        return baudrate;
    }

    public void setBaudrate(int baudrate) {
        this.baudrate = baudrate;
    }

    public int getDataBits() {
        return dataBits;
    }

    public void setDataBits(int dataBits) {
        this.dataBits = dataBits;
    }

    public int getStopBits() {
        return stopBits;
    }

    public void setStopBits(int stopBits) {
        this.stopBits = stopBits;
    }

    public int getParity() {
        return parity;
    }

    public void setParity(int parity) {
        this.parity = parity;
    }
}
