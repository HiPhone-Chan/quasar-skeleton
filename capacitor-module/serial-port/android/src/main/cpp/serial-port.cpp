//
// Created by chen on 2025/1/2.
//
#include "serial-port.h"
#include <jni.h>
#include <pthread.h>
#include <fcntl.h>
#include <dirent.h>
#include <termios.h>
#include <unistd.h>
#include <sys/select.h>
#include <sys/stat.h>
#include <android/log.h>
#include <string>
#include <vector>

#define LOG_TAG "SerialPortNative"
#define LOGD(...) __android_log_print(ANDROID_LOG_DEBUG, LOG_TAG, __VA_ARGS__)
#define LOGE(...) __android_log_print(ANDROID_LOG_ERROR, LOG_TAG, __VA_ARGS__)

extern "C"
JNIEXPORT jint JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_open(JNIEnv *env, jobject thiz, jstring path,
                                                     jint baudrate, jint data_bits, jint stop_bits,
                                                     jint parity) {
    const char *device_path = env->GetStringUTFChars(path, nullptr);
    int serial_fd = open(device_path, O_RDWR | O_NOCTTY | O_NONBLOCK);
    env->ReleaseStringUTFChars(path, device_path);

    if (serial_fd == -1) {
        LOGD("Failed to open serial port");
        return -1;
    }

    // 设置串口参数
    if (setSerialPortAttributes(serial_fd, baudrate, data_bits, stop_bits, parity) < 0) {
        close(serial_fd);
        return -1;
    }

    LOGD("Serial port opened and configured successfully");
    return serial_fd;
}

extern "C"
JNIEXPORT jint JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_close(JNIEnv *env, jobject thiz, jint serial_fd) {
    if (serial_fd != -1) {
        close(serial_fd);
    }
    LOGD("Serial port closed");
    return 0;
}

extern "C"
JNIEXPORT jint JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_write(JNIEnv *env, jobject thiz, jint serial_fd,
                                                      jbyteArray data) {
    if (serial_fd == -1) {
        return -1; // 串口未打开
    }

    jbyte *buffer = env->GetByteArrayElements(data, NULL);
    jsize length = env->GetArrayLength(data);

    int bytes_written = write(serial_fd, buffer, length);
    env->ReleaseByteArrayElements(data, buffer, 0);

    return bytes_written; // 返回实际写入的字节数
}

extern "C"
JNIEXPORT jbyteArray JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_read(JNIEnv *env, jobject thiz, jint serial_fd) {
    fd_set read_fds;
    unsigned char buffer[1024];
    FD_ZERO(&read_fds);
    FD_SET(serial_fd, &read_fds);

    struct timeval timeout = {1, 0}; // 超时时间 1 秒
    int ret = select(serial_fd + 1, &read_fds, NULL, NULL, &timeout);
    if (ret > 0 && FD_ISSET(serial_fd, &read_fds)) {

        int bytes_read = read(serial_fd, buffer, sizeof(buffer) - 1);
        if (bytes_read > 0) {
            jbyteArray byteArray = env->NewByteArray(bytes_read);
            env->SetByteArrayRegion(byteArray, 0, bytes_read, (jbyte *) buffer);
            return byteArray;
        }
    }
    return env->NewByteArray(0);
}

// 串口设置函数
int setSerialPortAttributes(int fd, int baudrate, int dataBits, int stopBits, int parity) {
    struct termios options;

    // 获取串口当前配置
    if (tcgetattr(fd, &options) < 0) {
        LOGD("Failed to get serial port attributes");
        return -1;
    }

    // 设置波特率
    speed_t speed = getBaudrate(baudrate);
    if (speed == -1) {
        LOGE("Invalid baudrate");
        return -1;
    }
    cfsetispeed(&options, speed);
    cfsetospeed(&options, speed);

    // 设置数据位
    options.c_cflag &= ~CSIZE;  // 清除数据位设置
    switch (dataBits) {
        case 7:
            options.c_cflag |= CS7;
            break;
        case 8:
        default:
            options.c_cflag |= CS8;
    }

    // 设置停止位
    if (stopBits == 2) {
        options.c_cflag |= CSTOPB;
    } else {
        options.c_cflag &= ~CSTOPB;
    }

    // 设置奇偶校验
    if (parity == 1) {
        options.c_cflag |= PARENB;  // 开启校验
        options.c_cflag &= ~PARODD; // 偶校验
    } else if (parity == 2) {
        options.c_cflag |= PARENB;  // 开启校验
        options.c_cflag |= PARODD;  // 奇校验
    } else {
        options.c_cflag &= ~PARENB; // 无校验
    }

    // 设置为原始模式，不启用流控制
    options.c_cflag &= ~CRTSCTS; // 关闭硬件流控制
    options.c_iflag &= ~(IXON | IXOFF | IXANY); // 关闭软件流控制
    options.c_lflag &= ~(ICANON | ECHO | ECHOE | ISIG); // 关闭规范模式，禁用输入回显

    // 设置为原始模式
    options.c_oflag &= ~OPOST; // 禁用输出处理

    // 设置读取最小字符数
    options.c_cc[VMIN] = 1;  // 至少读取一个字符
    options.c_cc[VTIME] = 0; // 设置读取超时为0

    // 应用设置
    if (tcsetattr(fd, TCSANOW, &options) < 0) {
        LOGD("Failed to set serial port attributes");
        return -1;
    }

    return 0;
}

static speed_t getBaudrate(int baudrate) {
    switch (baudrate) {
        case 0:
            return B0;
        case 50:
            return B50;
        case 75:
            return B75;
        case 110:
            return B110;
        case 134:
            return B134;
        case 150:
            return B150;
        case 200:
            return B200;
        case 300:
            return B300;
        case 600:
            return B600;
        case 1200:
            return B1200;
        case 1800:
            return B1800;
        case 2400:
            return B2400;
        case 4800:
            return B4800;
        case 9600:
            return B9600;
        case 19200:
            return B19200;
        case 38400:
            return B38400;
        case 57600:
            return B57600;
        case 115200:
            return B115200;
        case 230400:
            return B230400;
        case 460800:
            return B460800;
        case 500000:
            return B500000;
        case 576000:
            return B576000;
        case 921600:
            return B921600;
        case 1000000:
            return B1000000;
        case 1152000:
            return B1152000;
        case 1500000:
            return B1500000;
        case 2000000:
            return B2000000;
        case 2500000:
            return B2500000;
        case 3000000:
            return B3000000;
        case 3500000:
            return B3500000;
        case 4000000:
            return B4000000;
        default:
            return -1;
    }
}