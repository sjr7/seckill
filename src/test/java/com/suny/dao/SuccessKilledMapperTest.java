package com.suny.dao;

import com.suny.entity.SuccessKilled;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import static org.junit.Assert.*;

/**
 * Created by 孙建荣 on 17-5-22.下午9:55
 */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration({"classpath:spring/applicationContext-dao.xml"})
public class SuccessKilledMapperTest {
    @Resource
    private SuccessKilledMapper successKilledMapper;
//    @Test
    public void insertSuccessKilled() throws Exception {
        long seckillId=1000;
        long userPhone=13476191877L;
        int insertCount=successKilledMapper.insertSuccessKilled(seckillId,userPhone);
        System.out.println("insertCount="+insertCount);
    }

//    @Test
    public void queryByIdWithSeckill() throws Exception {
        long seckillId=1000L;
        long userPhone=13476191877L;
        SuccessKilled successKilled=successKilledMapper.queryByIdWithSeckill(seckillId,userPhone);
        System.out.println(successKilled);
        System.out.println(successKilled.getSeckill());
    }

}