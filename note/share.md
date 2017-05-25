## 这里先总结出网友总结出的一些坑
 + @Resource，使用报错引用import javax.annotation.Resource
 + mybatis里面mapper映射的sql，如果要加单行注释的话，一定要在--后面跟一个空格
 + 最好在jdbc.properties中需要修改前面加个前缀jdbc。防止与全局变量冲突  
 +下次有问题一定要先看一下评论！！！create不了的同学，可以这样写：
  `start_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀开始时间',
  `end_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀结束时间',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
  + 关于timestamp的问题，需要先运行 set explicit_defaults_for_timestamp = 1，否则会报invalid default value错误  
  + 还需要注意的是SQL版本的问题会导致视频中seckill表创建会出错。只要将create_time放在start_time和end_time之前是方便的解决方法。  
  + 开始就觉得奇怪，bitint是什么鬼。难道老师是故意把bigint写错成bitint，然后展示如何排错
  + mysql 5.7中，默认使用的是严格模式,这里的日期必须要有时间
   +参考链接
   [Invalid default value for 'create_date' timestamp field
](https://stackoverflow.com/questions/9192027/invalid-default-value-for-create-date-timestamp-field)
[mysql官方](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_no_zero_date)
[MySQL Community 5.7 - Invalid default value (datetime field type)
](https://stackoverflow.com/questions/34570611/mysql-community-5-7-invalid-default-value-datetime-field-type)

  ++ 查询数据库的版本方式
    + select version();
    + select @@version;
    
    ```
    WARN: Establishing SSL connection without server's identity verification is not recommended. According to MySQL 5.5.45+, 5.6.26+ and 5.7.6+ requirements SSL connection must be established by default if explicit option isn't set. For compliance with existing applications not using SSL the verifyServerCertificate property is set to 'false'. You need either to explicitly disable SSL by setting useSSL=false, or set useSSL=true and provide truststore for server certificate verification.
    ```
    $useSSL=false