package com.suny.exception;

/**
 *  秒杀基础异常
 * Created by 孙建荣 on 17-5-23.下午8:24
 */
public class SeckillException extends RuntimeException {
    public SeckillException(String message) {
        super(message);
    }

    public SeckillException(String message, Throwable cause) {
        super(message, cause);
    }
}
