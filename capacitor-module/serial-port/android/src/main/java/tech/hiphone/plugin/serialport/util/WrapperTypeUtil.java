package tech.hiphone.plugin.serialport.util;

/**
 * @Date: 2025/1/7 20:02
 * @Author: chf
 */
public class WrapperTypeUtil {

    private WrapperTypeUtil() {
    }

    public static int get(Integer wrapper, int defaultValue) {
        if (wrapper == null) {
            return defaultValue;
        }
        return wrapper;
    }
}
