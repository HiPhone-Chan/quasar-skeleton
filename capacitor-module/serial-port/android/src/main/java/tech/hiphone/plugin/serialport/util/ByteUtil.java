package tech.hiphone.plugin.serialport.util;

/**
 * @Date: 2025/1/3 17:28
 * @Author: chf
 */
public class ByteUtil {

    private ByteUtil() {
    }

    public static int toUnsignedInt(byte b) {
        return b & 0xff;
    }

    public static String toHexString(byte[] bs) {
        if (bs == null) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (byte b : bs) {
            String str = Integer.toHexString(toUnsignedInt(b));
            if (str.length() == 1) {
                sb.append(0);
            }
            sb.append(str.toUpperCase()).append(" ");
        }
        return sb.toString();
    }

    public static byte[] fromIntArray(int[] intArray) {
        byte[] result = new byte[intArray.length];
        for (int i = 0; i < intArray.length; i++) {
            result[i] = (byte) toUnsignedInt((byte) intArray[i]);
        }
        return result;
    }

}
