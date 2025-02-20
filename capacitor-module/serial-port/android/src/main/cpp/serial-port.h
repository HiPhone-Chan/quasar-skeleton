//
// Created by chen on 2025/1/7.
//

#ifndef ANDROID_SERIALPORT_H
#define ANDROID_SERIALPORT_H

#include <jni.h>
#include <termios.h>

extern "C" {

JNIEXPORT jint JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_open(JNIEnv *env, jobject thiz, jstring path,
                                                     jint baudrate, jint data_bits, jint stop_bits,
                                                     jint parity);

JNIEXPORT jint JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_close(JNIEnv *env, jobject thiz, jint serial_fd);


JNIEXPORT jint JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_write(JNIEnv *env, jobject thiz, jint serial_fd,
                                                      jbyteArray data);

JNIEXPORT jbyteArray JNICALL
Java_android_nativecpp_ext_api_NativeSerialPort_read(JNIEnv *env, jobject thiz, jint serial_fd);

int setSerialPortAttributes(int fd, int baudrate, int dataBits, int stopBits, int parity);

static speed_t getBaudrate(int baudrate);
};
#endif //ANDROID_SERIALPORT_H
