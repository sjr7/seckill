package com.suny.exception;

/**
 * 秒杀已经关闭异常，当秒杀结束就会出现这个异常
 * Created by 孙建荣 on 17-5-23.下午8:27
 */
public class SeckillCloseException extends SeckillException{
    public SeckillCloseException(String message) {
        super(message);
    }

    public SeckillCloseException(String message, Throwable cause) {
        super(message, cause);
    }
}
