package com.suny.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

/**
 * Created by 孙建荣 on 17-5-22.下午6:38
 */
public class Seckill implements Serializable {

    private static final long serialVersionUID = 2912164127598660137L;
    /* 主键ID*/
    private long seckillId;
    /*  秒杀商品名字 */
    private String name;
    /* 秒杀的商品编号 */
    private int number;
    /* 开始秒杀的时间 */
    private LocalDateTime startTime;
    /* 结束秒杀的时间 */
    private LocalDateTime endTime;
    /* 创建的时间 */
    private LocalDateTime createTIme;

    public Seckill() {
    }

    public Seckill(long seckillId, String name, int number, LocalDateTime startTime, LocalDateTime endTime, LocalDateTime createTIme) {
        this.seckillId = seckillId;
        this.name = name;
        this.number = number;
        this.startTime = startTime;
        this.endTime = endTime;
        this.createTIme = createTIme;
    }

    public long getSeckillId() {
        return seckillId;
    }

    public void setSeckillId(long seckillId) {
        this.seckillId = seckillId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getNumber() {
        return number;
    }

    public void setNumber(int number) {
        this.number = number;
    }

    public LocalDateTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalDateTime startTime) {
        this.startTime = startTime;
    }

    public LocalDateTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalDateTime endTime) {
        this.endTime = endTime;
    }

    public LocalDateTime getCreateTIme() {
        return createTIme;
    }

    public void setCreateTIme(LocalDateTime createTIme) {
        this.createTIme = createTIme;
    }

    @Override
    public String toString() {
        return "com.suny.entity.Seckill{" +
                "主键ID=" + seckillId +
                ", 秒杀商品='" + name + '\'' +
                ", 编号=" + number +
                ", 开始秒杀时间=" + startTime +
                ", 结束秒杀时间=" + endTime +
                ", 创建时间=" + createTIme +
                '}';
    }
}
