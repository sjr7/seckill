### (一)Java高并发秒杀APi之业务分析与DAO层代码编写
#### 构建项目的基本骨架
 * 首先我们要搭建出一个符合Maven约定的目录来,这里大致有两种方式,第一种:
1. 第一种使用命令行手动构建一个maven结构的目录,当然我基本不会这样构建
```
mvn archetype:generate -DgroupId=com.suny.seckill -DartifactId=seckill -Dpackage=com.suny.seckill -Dversion=1.0-SNAPSHOT -DarchetypeArtifactId=maven-archetype-webapp
```  
这里要注意的是使用`archetype:generate`进行创建,在Maven老版本中是使用`archetype:create`,现在这种方法已经被弃用了,所以使用命令行创建的话注意了,稍微解释下这段语句的意思,就是构建一个一个`maven-archetype-webapp`骨架的Webapp项目,然后`groupId`为`com.suny.seckill `,`artifactId`为`seckill`,这里是Maven相关知识,可以按照自己的情况进行修改  

2.第二种直接在IDE中进行创建,这里以IDEA为例
  + 点击左上角`File>New>Project>Maven`
  + 然后在里面勾选`Create from archetype`,然后再往下拉找到`org.apache.cocoon:cocoon-22-archetype-webapp`,选中它,注意要先勾选那个选项,否则选择不了,然后点击`Next`继续  
  ![创建Maven项目](../images/001.png)    
  +然后就填写你的Maven的那几个重要的坐标了,自己看着填吧  
  ![填写Maven坐标](../images/002.png)  
  +再就配置你的Maven的相关信息,默认应该是配置好的  
  ![填写Maven在你本机的位置](../images/003.png)  
  +之后就是点`Finsh`,到此不出意外的话就应该创建成功了    
  
#### 构建pom文件
  
  项目基本的骨架我们就创建出来了,接下来我们要添加一些基本的JAR包的依赖,也就是在`pom.xml`中添加各种开源组件的三坐标了    
  
  ```xml
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 http://maven.apache.org/maven-v4_0_0.xsd">
          <modelVersion>4.0.0</modelVersion>
          <groupId>com.suny.seckill</groupId>
          <artifactId>seckill</artifactId>
          <version>1.0-SNAPSHOT</version>
          <name>seckill Maven Webapp</name>
          <url>http://maven.apache.org</url>
    <dependencies>

        <!--junit测试-->
        <dependency>
            <groupId>junit</groupId>
            <artifactId>junit</artifactId>
            <version>4.12</version>
            <scope>test</scope>
        </dependency>

        <!--配置日志相关,日志门面使用slf4j,日志的具体实现由logback实现-->
        <dependency>
            <groupId>ch.qos.logback</groupId>
            <artifactId>logback-classic</artifactId>
            <version>1.1.7</version>
        </dependency>
        <dependency>
            <groupId>org.slf4j</groupId>
            <artifactId>slf4j-api</artifactId>
            <version>1.7.21</version>
        </dependency>
        <dependency>
            <groupId>org.apache.logging.log4j</groupId>
            <artifactId>log4j-core</artifactId>
            <version>2.6.1</version>
        </dependency>

        <!--数据库相关依赖-->
        <!--首先导入连接Mysql数据连接-->
        <dependency>
            <groupId>mysql</groupId>
            <artifactId>mysql-connector-java</artifactId>
            <version>5.1.39</version>
        </dependency>

        <!--导入数据库连接池-->
        <dependency>
            <groupId>c3p0</groupId>
            <artifactId>c3p0</artifactId>
            <version>0.9.1.2</version>
        </dependency>

        <!--导入mybatis依赖-->
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis</artifactId>
            <version>3.4.2</version>
        </dependency>
        <dependency>
            <groupId>org.mybatis</groupId>
            <artifactId>mybatis-spring</artifactId>
            <version>1.3.1</version>
        </dependency>

        <!--导入Servlet web相关的依赖-->
        <dependency>
            <groupId>taglibs</groupId>
            <artifactId>standard</artifactId>
            <version>1.1.2</version>
        </dependency>
        <dependency>
            <groupId>jstl</groupId>
            <artifactId>jstl</artifactId>
            <version>1.2</version>
        </dependency>
        <!--spring默认的json转换-->
        <dependency>
            <groupId>com.fasterxml.jackson.core</groupId>
            <artifactId>jackson-databind</artifactId>
            <version>2.8.5</version>
        </dependency>
        <dependency>
            <groupId>javax.servlet</groupId>
            <artifactId>javax.servlet-api</artifactId>
            <version>3.1.0</version>
        </dependency>
        
        <!--导入spring相关依赖-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-core</artifactId>
            <version>4.3.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-beans</artifactId>
            <version>4.3.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-context</artifactId>
            <version>4.3.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-jdbc</artifactId>
            <version>4.3.7.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-tx</artifactId>
            <version>4.3.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-web</artifactId>
            <version>4.3.6.RELEASE</version>
        </dependency>
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-webmvc</artifactId>
            <version>4.3.7.RELEASE</version>
        </dependency>
        
        <!--导入springTest-->
        <dependency>
            <groupId>org.springframework</groupId>
            <artifactId>spring-test</artifactId>
            <version>4.2.7.RELEASE</version>
        </dependency>
    </dependencies>
    <build>
        <finalName>seckill</finalName>
    </build>
</project>

  ```
#### 建立数据库
在根目录下有一个[sql](../sql)文件夹里面有一个[sql数据库脚本](../sql/seckill.sql),如果你不想自己手写的话就直接导入到你的数据库里面去吧,不过还是建议自己手写一遍加深印象

```sql

-- 整个项目的数据库脚本
-- 开始创建一个数据库
CREATE DATABASE seckill;
-- 使用数据库
USE seckill;
-- 创建秒杀库存表
CREATE TABLE seckill(
  `seckill_id` BIGINT NOT NULL AUTO_INCREMENT COMMENT '商品库存ID',
  `name` VARCHAR(120) NOT NULL COMMENT '商品名称',
  `number` INT NOT NULL COMMENT '库存数量',
  `start_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT '秒杀开启的时间',
  `end_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT '秒杀结束的时间',
  `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() COMMENT '创建的时间',
  PRIMARY KEY (seckill_id),
  KEY idx_start_time(seckill_id),
  KEY idx_end_time(end_time),
  KEY idx_create_time(create_time)
)ENGINE =InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COMMENT='秒杀库存表';

-- 插入初始化数据

insert into
  seckill(name,number,start_time,end_time)
values
  ('1000元秒杀iphone6',100,'2016-5-22 00:00:00','2016-5-23 00:00:00'),
  ('500元秒杀iPad2',200,'2016-5-22 00:00:00','2016-5-23 00:00:00'),
  ('300元秒杀小米4',300,'2016-5-22 00:00:00','2016-5-23 00:00:00'),
  ('200元秒杀红米note',400,'2016-5-22 00:00:00','2016-5-23 00:00:00');

-- 秒杀成功明细表
-- 用户登录相关信息
create table success_killed(
  `seckill_id` BIGINT NOT NULL COMMENT '秒杀商品ID',
  `user_phone` BIGINT NOT NULL COMMENT '用户手机号',
  `state` TINYINT NOT NULL DEFAULT -1 COMMENT '状态标示:-1无效 0成功 1已付款',
  `create_time` TIMESTAMP NOT NULL COMMENT '创建时间',
  PRIMARY KEY (seckill_id,user_phone), /*联合主键*/
  KEY idx_create_time(create_time)
)ENGINE =InnDB DEFAULT CHARSET =utf8 COMMENT ='秒杀成功明细表'

```
 + 在建立数据库的,如果按照我这里的数据库脚本建立的话应该是没问题的,但是我按照视频里面的数据库脚本建表的话发生了一个错误  
  ![sql报错](../images/sqlError.png)
 这个报错看起来比较的诡异,我仔细检查`sql`也没有错误,它总提示我`end_time`要有一个默认的值,可我记得我以前就不会这样,然后视频里面也没有执行错误,然后我感觉可能时`MySQL`版本的差异,我查看了下我数据库版本,在登录`Mysql`控制台后输入指令,在控制台的我暂时知道的有两种方式:
 ```sql
select version();  
select @@version;
```
我的输出结果如下:
![Mysql版本](../images/mysqlVersion.png)
其实登录进控制台就已经可以看到版本了,我的Mysql是`5.7`的,以前我用的时`5.6`的,然后去`Google`上搜索了下,找到了几个答案,参考链接：  
  - [Invalid default value for 'create_date' timestamp field
](https://stackoverflow.com/questions/9192027/invalid-default-value-for-create-date-timestamp-field)  
 - [mysql官方的解释](https://dev.mysql.com/doc/refman/5.7/en/sql-mode.html#sqlmode_no_zero_date)  
 - [MySQL Community 5.7 - Invalid default value (datetime field type)
](https://stackoverflow.com/questions/34570611/mysql-community-5-7-invalid-default-value-datetime-field-type)  
总结出来一句话就是:
> mysql 5.7中,默认使用的是严格模式,这里的日期必须要有时间,所以一定要给出默认值,要么就修改数据库设置  

然后网友评论里总结出来的几种解决办法,未经测试！：  
 + 下次有问题一定要先看一下评论！！！create不了的同学,可以这样写：
 ```sql
    `start_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀开始时间',
    `end_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '秒杀结束时间',
    `create_time` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT '创建时间',
 ```
    
   + 关于timestamp的问题,需要先运行 set explicit_defaults_for_timestamp = 1,否则会报invalid default value错误
   + 还需要注意的是SQL版本的问题会导致视频中seckill表创建会出错。只要将create_time放在start_time和end_time之前是方便的解决方法。  

 对比下我修改过后的跟视频里面的`sql`片段:
 ![sql对比](../images/sqlCompare.png)  
 我们可以看到在这三个字段有一个小差别,那就是给`start_time`,`end_time`,`create_time`三个字段都添加一个默认值,然后执行数据库语句就没问题了
 
---
####  这里我们需要修改下`web.xml`中的servlet版本为`3.0`
打开`WEB-INF`下的`web.xml`,修改为以下代码:
```xml
<web-app xmlns="http://java.sun.com/xml/ns/javaee"
         xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://java.sun.com/xml/ns/javaee
                      http://java.sun.com/xml/ns/javaee/web-app_3_0.xsd"
         version="3.0"
         metadata-complete="true">
    <!--用maven创建的web-app需要修改servlet的版本为3.0-->
```
修改的原因有以下几点:  
   * 高版本的Servlet支持更多的特性,更方便我们的Coding,特别是支持注解这一特性
   * 在`Servlet2.3`中新加入了`Listener`接口的实现,,我们可以使用`Listener`引入`Spring`的`ContextLoaderListener`  

举个栗子:  
  + 在`Servlet2.3`以前我们这样配置`ContextLoaderListener`:
```xml
<servlet>
 <servlet-name>context</servlet-name>
 <servlet-class>org.springframework.context.ContextLoaderServlet</servlet-class>
 <load-on-startup>1</load-on-startup>
</servlet>
```
 + 在`Servlet2.3`以后可以使用`Listener`配置,也就是我们项目中使用的方法
 ````xml
<listener>
 <listener-class>org.springframework.context.ContextLoaderListener</listener-class>
</listener>
````
两种方法的效果都是一样的,主要不要同时使用,否则会报错的  


#### 建立实体类
 - 首先建立`SuccessKilled`  秒杀状态表
```java
package com.suny.entity;

import java.io.Serializable;
import java.time.LocalDateTime;


public class SuccessKilled implements Serializable {
    private static final long serialVersionUID = 1834437127882846202L;

    private long seckillId;
    /* 用户的手机号码*/
    private long userPhone;
    /* 秒杀的状态*/
    private short state;
    /* 创建时间*/
    private LocalDateTime createTime;
    /* 多对一,因为一件商品在库存中肯定有许多,对应的购买信息也有很多*/
    private Seckill seckill;

    public SuccessKilled() {
    }

    public SuccessKilled(long seckillId, long userPhone, short state, LocalDateTime createTime, Seckill seckill) {
        this.seckillId = seckillId;
        this.userPhone = userPhone;
        this.state = state;
        this.createTime = createTime;
        this.seckill = seckill;
    }

    public long getSeckillId() {
        return seckillId;
    }

    public void setSeckillId(long seckillId) {
        this.seckillId = seckillId;
    }

    public long getUserPhone() {
        return userPhone;
    }

    public void setUserPhone(long userPhone) {
        this.userPhone = userPhone;
    }

    public short getState() {
        return state;
    }

    public void setState(short state) {
        this.state = state;
    }

    public LocalDateTime getCreateTime() {
        return createTime;
    }

    public void setCreateTime(LocalDateTime createTime) {
        this.createTime = createTime;
    }

    public Seckill getSeckill() {
        return seckill;
    }

    public void setSeckill(Seckill seckill) {
        this.seckill = seckill;
    }

    @Override
    public String toString() {
        return "SuccessKilled{" +
                "主键ID=" + seckillId +
                ", 手机号码=" + userPhone +
                ", 秒杀状态=" + state +
                ", 创建时间=" + createTime +
                ", 秒杀的商品=" + seckill +
                '}';
    }
}


```
 - 再建立`Seckill` 秒杀商品信息
```java
package com.suny.entity;

import java.io.Serializable;
import java.time.LocalDateTime;

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


```
 #### 对实体类创建对应的`mapper`接口,也就是`dao`接口类
 - 首先创建`SeckillMapper`,在我这里位于`com.suny.dao`包下
 ```java
package com.suny.dao;

import com.suny.entity.Seckill;
import org.apache.ibatis.annotations.Param;

import java.time.LocalDateTime;
import java.util.List;

public interface SeckillMapper {
    /**
     * 根据传过来的<code>seckillId</code>去减少商品的库存.
     *
     * @param seckillId 秒杀商品ID
     * @param killTime  秒杀的精确时间
     * @return 如果秒杀成功就返回1,否则就返回0
     */
    int reduceNumber(@Param("seckillId") long seckillId, @Param("killTime") LocalDateTime killTime);

    /**
     * 根据传过来的<code>seckillId</code>去查询秒杀商品的详情.
     *
     * @param seckillId 秒杀商品ID
     * @return 对应商品ID的的数据
     */
    Seckill queryById(@Param("seckillId") long seckillId);

    /**
     * 根据一个偏移量去查询秒杀的商品列表.
     *
     * @param offset 偏移量
     * @param limit  限制查询的数据个数
     * @return 符合偏移量查出来的数据个数
     */
    List<Seckill> queryAll(@Param("offset") int offset, @Param("limit") int limit);
}

```
 - 再创建`SuccessKilledMapper`
 ```java
package com.suny.dao;

import com.suny.entity.SuccessKilled;
import org.apache.ibatis.annotations.Param;


public interface SuccessKilledMapper {
    /**
     * 插入一条详细的购买信息.
     *
     * @param seckillId 秒杀商品的ID
     * @param userPhone 购买用户的手机号码
     * @return 成功插入就返回1, 否则就返回0
     */
    int insertSuccessKilled(@Param("seckillId") long seckillId, @Param("userPhone") long userPhone);

    /**
     * 根据秒杀商品的ID查询<code>SuccessKilled</code>的明细信息.
     *
     * @param seckillId 秒杀商品的ID
     * @param userPhone 购买用户的手机号码
     * @return 秒杀商品的明细信息
     */
    SuccessKilled queryByIdWithSeckill(@Param("seckillId") long seckillId, @Param("userPhone") long userPhone);
}

```
#### 接下来书写`xml`配置文件
##### 建立对应的`mapper.xml`  

首先在`src/main/resources`建立`com.suny.dao`这个包,也就是对应`mapper`接口文件包一样的包名,这样符合Maven的约定,就是资源放置在`Resource`包下,`Java`包下则是放置`java`类文件,编译后最后还是会在同一个目录下.  
![建包](../images/004.png)
- 首先建立`SeckillMapper.xml`
```xml
<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.suny.dao.SeckillMapper">
    <!--这里的<=需要使用进行忽略,所以是要进行忽略,使用CDATA 区段中的文本会被解析器忽略 -->
    <update id="reduceNumber">
        UPDATE seckill
        SET number = number - 1
        WHERE seckill_id = #{seckillId}
              AND start_time 
              <![CDATA[
              <=
              ]]>
         #{killTime}
              AND end_time >= #{killTime}
              AND number > 0
    </update>

    <select id="queryById" resultType="com.suny.entity.Seckill">
        SELECT
            *
        FROM seckill AS s
        WHERE s.seckill_id = #{seckillId}
    </select>


    <select id="queryAll" resultType="com.suny.entity.Seckill">
        SELECT
            *
        FROM seckill AS s
        ORDER BY create_time DESC
        LIMIT #{offset}, #{limit}
    </select>
</mapper>
```
- 建立`SuccessKilledMapper.xml`
```xml

<!DOCTYPE mapper
        PUBLIC "-//mybatis.org//DTD Mapper 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-mapper.dtd">
<mapper namespace="com.suny.dao.SuccessKilledMapper">
    <!--添加主键冲突时忽略错误返回0-->  
    <insert id="insertSuccessKilled">
        INSERT IGNORE INTO success_killed (seckill_id, user_phone, state)
        VALUES (#{seckillId}, #{userPhone}, 0)
    </insert>
    <!--根据seckillId查询SuccessKilled对象,并携带Seckill对象,告诉mybatis把映射结果映射到SuccessKill属性同时映射到Seckill属性-->  
    <select id="queryByIdWithSeckill" resultType="com.suny.entity.SuccessKilled">
        SELECT
            sk.seckill_id,
            sk.user_phone,
            sk.create_time,
            sk.state,
            s.seckill_id  "seckill.seckill_id",
            s.name "seckill.name",
            s.number "seckill",
            s.start_time  "seckill.start_time",
            s.end_time  "seckill.end_time",
            s.create_time "seckill.create_time"
        FROM success_killed sk
            INNER JOIN seckill s ON sk.seckill_id = s.seckill_id
        WHERE sk.seckill_id = #{seckillId}
              AND sk.user_phone= #{userPhone}
    </select>

</mapper>  
  
```
- 建立`Mybatis`的配置文件`mybatis-config.xml`
```xml
<?xml version="1.0" encoding="UTF-8" ?>
<!DOCTYPE configuration PUBLIC
        "-//mybatis.org//DTD MyBatis Generator Configuration 3.0//EN"
        "http://mybatis.org/dtd/mybatis-3-config.dtd" >
<configuration>
    <!--首先配置全局属性-->
    <settings>
        <!--开启自动填充主键功能,原理时通过jdbc的一个方法getGeneratekeys获取自增主键值-->
        <setting name="useGeneratedKeys" value="true"/>
        <!--使用别名替换列名,默认就是开启的-->
        <setting name="useColumnLabel" value="true"/>
        <!--开启驼峰命名的转换-->
        <setting name="mapUnderscoreToCamelCase" value="true"/>
    </settings>
</configuration>
```
- 然后建立连接数据库的配置文件`jdbc.properties`,这里的属性要根据自己的需要去进行修改,切勿直接复制使用  
```properties
jdbc.driver=com.mysql.jdbc.Driver
jdbc.user=root
jdbc.password=root
jdbc.url=jdbc:mysql://localhost:3306/seckill?useUnicode=true&characterEncoding=utf-8
```
- 建立`Spring`的`dao`的配置文件,在`resources`包下创建`applicationContext-dao.xml`
```xml

<?xml version="1.0" encoding="UTF-8"?>
<!--suppress SpringFacetInspection -->
<beans xmlns="http://www.springframework.org/schema/beans"
       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
       xmlns:context="http://www.springframework.org/schema/context"
       xmlns:tx="http://www.springframework.org/schema/tx"
       xsi:schemaLocation="http://www.springframework.org/schema/beans http://www.springframework.org/schema/beans/spring-beans-4.3.xsd
		http://www.springframework.org/schema/context http://www.springframework.org/schema/context/spring-context-4.3.xsd">
    <context:property-placeholder location="classpath:jdbc.properties"/>

    <!--配置数据库连接池-->
    <bean id="dataSource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <!--配置基本的数据库连接-->
        <property name="driverClass" value="${jdbc.driver}"/>
        <property name="jdbcUrl" value="${jdbc.url}"/>
        <property name="user" value="${jdbc.user}"/>
        <property name="password" value="${jdbc.password}"/>
        <!--c3p0私有属性-->
        <property name="maxPoolSize" value="30"/>
        <property name="minPoolSize" value="10"/>
        <!--关闭连接后不自动commit-->
        <property name="autoCommitOnClose" value="false"/>
        <!--获取连接超时时间-->
        <property name="checkoutTimeout" value="1000"/>
        <!--当获取连接失败时的重试次数-->
    </bean>
    <!--配置sqlSessionFactory对象-->
    <bean id="sqlSessionFactory" class="org.mybatis.spring.SqlSessionFactoryBean">
        <!--注入数据库连接池-->
        <property name="dataSource" ref="dataSource"/>
        <!--配置mybatis全局配置文件-->
        <property name="configLocation" value="mybatis-config.xml"/>
        <!--配置entity包,也就是实体类包,自动扫描,用于别名配置-->
        <property name="typeAliasesPackage" value="com.suny.entity"/>
        <!--配置需要扫描的mapper.xml文件-->
        <property name="mapperLocations" value="classpath*:com/suny/dao/*.xml"/>
    </bean>

    <!--配置mapper接口包,动态实现mapper接口,注入到Spring容器-->
    <bean class="org.mybatis.spring.mapper.MapperScannerConfigurer">
        <!--注入sqlSessionFactory,请注意不要使用sqlSessionFactoryBean,否则会出现注入异常-->
        <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory"/>
        <!--给出要扫描的mapper接口-->
        <property name="basePackage" value="com.suny.dao"/>
    </bean>

</beans>

```

- 基础的部分我们搭建完成了,然后要开始测试了
 在`IDEA`里面有一个快速建立测试的快捷键`Ctrl+Shift+T`,在某个要测试的类里面按下这个快捷键就会出现`Create new Test`,然后选择你要测试的方法跟测试的工具就可以了,这里我们使用Junit作为测试
  + 建立`SeckillMapperTest`文件,代码如下
 ```java
package com.suny.dao;

import com.suny.entity.Seckill;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import javax.annotation.Resource;

import java.time.LocalDateTime;
import java.util.List;

import static org.junit.Assert.*;


@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration({"classpath:spring/applicationContext-dao.xml"})
public class SeckillMapperTest {
    @Resource
    private SeckillMapper seckillMapper;

    @Test
    public void reduceNumber() throws Exception {
        long seckillId=1000;
        LocalDateTime localDateTime=LocalDateTime.now();
        int i = seckillMapper.reduceNumber(seckillId, localDateTime);
        System.out.println(i);
    }

    @Test
    public void queryById() throws Exception {
        long seckillId = 1000;
        Seckill seckill = seckillMapper.queryById(seckillId);
        System.out.println(seckill.toString());
    }

    @Test
    public void queryAll() throws Exception {
        List<Seckill> seckills = seckillMapper.queryAll(0, 100);
        for (Seckill seckill : seckills) {
            System.out.println(seckill.toString());
        }
    }

}
```
测试中可能会出现`Mybatis`参数绑定失败的错误,在`mapper`接口中的方法里面添加`@Param`的注解,显示的告诉mybatis参数的名称是什么,例如
```java
 List<Seckill> queryAll(@Param("offset") int offset, @Param("limit") int limit);

```  

###下一篇    [(二)Java高并发秒杀API之Service层](../note/note2.md)

---
- [(三)Java高并发秒杀API之web层](../note/note3.md)
- [(四)Java高并发秒杀API之高并发优化](../note/note4.md)  

---

如果项目流程总结中有什么问题欢迎发`Issue`给我,或者您也可以直接联系我`sunybyjava@gmail.com`,感谢您的阅读