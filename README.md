# seckill
一个整合SSM框架的高并发和商品秒杀项目,学习目前较流行的Java框架组合实现高并发秒杀API

## 项目的来源
项目的来源于国内IT公开课平台[慕课网](http://www.imooc.com),慕课网上资源有质量没的说,很适合学习一些技术的基础,这个项目是由四个系列的课程组成的,流程分为几个流程，很基础地教你接触到一个相对有技术含量的项目
 - Java高并发秒杀API之业务分析与DAO层
 - Java高并发秒杀API之web层
 - Java高并发秒杀API之Service层
 - Java高并发秒杀API之高并发优化

其实这几个流程也就是开发的流程，首先从DAO层开始开发，从后往前开发，开始Coding吧！

## 项目环境的搭建
* **操作系统** : Ubuntu 17.04 
* **IDE** ：IntelliJ IDEA 2016.2.5 x64 用Eclipse也一样的，工具时靠人用的
* **JDK** : JDK1.8 建议使用JDK1.7以上版本，有许多语法糖用着挺舒服的
* **Web容器** ： Tomcat 8.0 
* **数据库** ：Mysql-5.6.17-WinX64    实验性的项目用Mysql就足够啦
* **依赖管理工具** : Maven  管理jar包真的很方便  

  这里列出的环境不是必须的，你喜欢用什么就用什么，这里只是给出参考，不过不同的版本可能会引起各种不同的问题就需要我们自己去发现以及排查，在这里使用Maven的话时方便我们管理JAR包，我们不用跑去各种开源框架的官网去下载一个又一个的JAR包，配置好了Maven后添加pom文件坐标就会从中央仓库下载JAR包，如果哪天替换版本也很方便

## 项目编码
这里按照上面几个流程走下去，你要有基本的Maven认识以及Java语法的一些概念，要不然可能不太理解
### Java高并发秒杀APi之业务分析与DAO层代码编写
首先我们要搭建出一个符合Maven约定的目录来，这里大致有两种方式，第一种:
1. 第一种使用命令行手动构建一个maven结构的目录，当然我基本不会这样构建
```
mvn archetype:generate -DgroupId=com.suny.seckill -DartifactId=seckill -Dpackage=com.suny.seckill -Dversion=1.0-SNAPSHOT -DarchetypeArtifactId=maven-archetype-webapp
```  
这里要注意的是使用`archetype:generate`进行创建，在Maven老版本中是使用`archetype:create`，现在这种方法已经被弃用了，所以使用命令行创建的话注意了，稍微解释下这段语句的意思，就是构建一个一个`maven-archetype-webapp`骨架的Webapp项目，然后`groupId`为`com.suny.seckill `，`artifactId`为`seckill`，这里是Maven相关知识，可以按照自己的情况进行修改  

2.第二种直接在IDE中进行创建，这里以IDEA为例
  + 点击左上角`File>New>Project>Maven`
  + 然后在里面勾选`Create from archetype`，然后再往下拉找到`org.apache.cocoon:cocoon-22-archetype-webapp`，选中它，注意要先勾选那个选项，否则选择不了，然后点击`Next`继续  
  ![创建Maven项目](images/001.png)    
  +然后就填写你的Maven的那几个重要的坐标了，自己看着填吧  
  ![填写Maven坐标](images/002.png)  
  +再就配置你的Maven的相关信息，默认应该是配置好的  
  ![填写Maven在你本机的位置](images/003.png)  
  +之后就是点`Finsh`,到此不出意外的话就应该创建成功了  
  ---
  项目基本的骨架我们就创建出来了，接下来我们要添加一些基本的JAR包的依赖，也就是在`pom.xml`中添加各种开源组件的三坐标了  
  ```
  
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

        <!--配置日志相关，日志门面使用slf4j，日志的具体实现由logback实现-->
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
 
  
  

- 在pom文件中添加基本的依赖
- 修改web.xml中的servlet版本为3.0的
- 建立数据库表
- 建立dao跟entity
- 建立mybatis-config.xml
- 在resource下建立mapper包
- 建立spring的配置文件

 + 首先先写spring-dao.xml
     + 配置dataSource
       + jdbc.properties