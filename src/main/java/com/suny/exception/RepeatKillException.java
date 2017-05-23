package com.suny.exception;

/**
 * 重复秒杀异常，不需要我们手动去try catch
 * Created by 孙建荣 on 17-5-23.下午8:26
 */
public class RepeatKillException extends SeckillException{
    public RepeatKillException(String message) {
        super(message);
    }

    public RepeatKillException(String message, Throwable cause) {
        super(message, cause);
    }
}
