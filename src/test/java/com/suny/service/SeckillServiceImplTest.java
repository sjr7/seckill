package com.suny.service;

import com.suny.dto.Exposer;
import com.suny.dto.SeckillExecution;
import com.suny.entity.Seckill;
import com.suny.exception.RepeatKillException;
import com.suny.exception.SeckillCloseException;
import com.suny.exception.SeckillException;
import com.suny.service.interfaces.SeckillService;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

import static org.junit.Assert.*;

/**
 * Created by 孙建荣 on 17-5-23.下午10:30
 */
//@RunWith(SpringJUnit4ClassRunner.class)
//@ContextConfiguration({"classpath:spring/applicationContext-dao.xml", "classpath:spring/applicationContext-service.xml"})
public class SeckillServiceImplTest {
    private Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    private SeckillService seckillService;

//    @Test
    public void getSeckillList() throws Exception {
        List<Seckill> seckillList = seckillService.getSeckillList();
        logger.info(seckillList.toString());
        System.out.println(seckillList.toString());
    }

//    @Test
    public void getById() throws Exception {
        long seckillId = 1000;
        Seckill byId = seckillService.getById(seckillId);
        System.out.println(byId.toString());
    }

//    @Test
    public void exportSeckillUrl() throws Exception {
        long seckillId = 1000;
        Exposer exposer = seckillService.exportSeckillUrl(seckillId);
        System.out.println(exposer.toString());
    }

//    @Test
    public void executeSeckill() throws Exception {
        long seckillId = 1000;
        Exposer exposer = seckillService.exportSeckillUrl(seckillId);
        if (exposer.isExposed()) {
            long userPhone = 12222222222L;
            String md5 = "bf204e2683e7452aa7db1a50b5713bae";
            try {
                SeckillExecution seckillExecution = seckillService.executeSeckill(seckillId, userPhone, md5);
                System.out.println(seckillExecution.toString());
            } catch (SeckillCloseException | RepeatKillException e) {
                e.printStackTrace();
            }
        } else {
            System.out.println("秒杀未开启");
        }
    }

//    @Test
    public void executeSeckillProcedureTest() {
        long seckillId = 1001;
        long phone = 1368011101;
        Exposer exposer = seckillService.exportSeckillUrl(seckillId);
        if (exposer.isExposed()) {
            String md5 = exposer.getMd5();
            SeckillExecution execution = seckillService.executeSeckillProcedure(seckillId, phone, md5);
            System.out.println(execution.getStateInfo());
        }
    }


}