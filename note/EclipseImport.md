## Eclipse导入步骤
### 下载项目
`Download Zip`或者 `git clone`
``` shell
	git clone https://github.com/Sunybyjava/seckill.git
```
### 在Eclipse中导入项目
  -  点击菜单栏上的`File`>`Import`,选择`Existing Projects into Workspace`  
  ![../images/eclipse/eclipse1.jpg](../images/eclipse/eclipse1.jpg)
  - 选择你的项目地址,然后点导入  
  ![../images/eclipse/eclipse2.jpg](../images/eclipse/eclipse2.jpg)
  - 这时项目应该成功地导入了,注意查看`JDK`版本,我这里是`Open JDK1.8`,这里你是`Oracle JDK`还是`Open JDK`都好,必须是`1.8`  
  ![../images/eclipse/eclipse3.jpg](../images/eclipse/eclipse3.jpg)
  - 更改项目的编译等级,这一步很重要,否则项目编译失败
   ![../images/eclipse/eclipse4.jpg](../images/eclipse/eclipse4.jpg)
   - 设置`Maven`的目录,如果你配置了环境变量的话,默认这个就是选好了这个目录的
   ![../images/eclipse/eclipse5.jpg](../images/eclipse/eclipse5.jpg)
   - 更改你`Maven`仓库的目录以及配置文件,这里是你可以不配也可与配置,不过如果你又本地仓库的话建议你配置,本地仓库存在`Jar`包的话很多时候就不用联网下载了,如果你不清楚配置的话请让它默认,建议了解`Maven`的基础知识后再去更改,不更改的话也可以正常运行
    ![../images/eclipse/eclipse6.jpg](../images/eclipse/eclipse6.jpg)
   - 更改项目的`JDK`,在项目文件名上右键`Build Path`>`Configure Build Path`,出现项目设置页面
    ![../images/eclipse/eclipse7.jpg](../images/eclipse/eclipse7.jpg)
    可以看到我这里就是1.8的,所以我就不用改了
   - 更改本项目的编译等级,很重要,这里先勾选`Enable project specific settings`
   ![../images/eclipse/eclipse8.jpg](../images/eclipse/eclipse8.jpg)
   -  更改项目的编码以及换行符
    ![../images/eclipse/eclipse9.jpg](../images/eclipse/eclipse9.jpg)
   - 标记为动态WEB工程
    ![../images/eclipse/eclipse29.jpg](../images/eclipse/eclipse29.jpg)
   - 把项目转换成`Maven`项目,貌似`Eclipse`还不认识,在项目上右键`Configure`>`Convert to Maven Project`,然后稍等一会儿项目结构会发生点变化
   ![../images/eclipse/eclipse10.jpg](../images/eclipse/eclipse10.jpg)
   - 更新`Maven`索引,在项目上右键,选择`Maven`>`Update Project`,或者是按快捷键`ALT+F5`,然后会弹出界面来选择要更新的项目  
   ![../images/eclipse/eclipse11.jpg](../images/eclipse/eclipse11.jpg)
   - 更新索引后,可以看到这里的资源没有红色了,如果没有这一步的话资源就是红色的  
   ![../images/eclipse/eclipse12.jpg](../images/eclipse/eclipse12.jpg)
   - 安装`Maven`项目,在项目点击右键`Run`>`Maven Install`  
   ![../images/eclipse/eclipse26.jpg](../images/eclipse/eclipse26.jpg)
   我这里安装就报错了,因为连接不到数据库,所以你要先建立数据库表,然后更改数据库配置文件,配置文件位于[src/main/resources/jdbc.properties](../src/main/resources/jdbc.properties),根据自己的情况酌情修改
   导入数据库后,再进行安装就应该不会报错了
    ![../images/eclipse/eclipse27.jpg](../images/eclipse/eclipse27.jpg)
   - 添加可以部署项目的`Web容器`,这里添加Tomcat
   ![../images/eclipse/eclipse13.jpg](../images/eclipse/eclipse13.jpg)
   - 选择合适的版本进行添加
   ![../images/eclipse/eclipse14.jpg](../images/eclipse/eclipse14.jpg)
   ![../images/eclipse/eclipse15.jpg](../images/eclipse/eclipse15.jpg)
   - 选取Tomcat的路径
   ![../images/eclipse/eclipse16.jpg](../images/eclipse/eclipse16.jpg)
   - 修改Tomcat的部署路径,这一部很重要,在MyEclipse中不会发生这个问题,原因就是因为Eclipse部署的项目默认实在软件目录下的`.metadata\.plugins\org.eclipse.wst.server.core\tmp1\wtpwebapps`下面,这样就造成你在`Eclipse`是可以访问到项目的,但是你在浏览器里面是访问不到这个项目的,这样肯定是不方便的。
   ![../images/eclipse/eclipse17.jpg](../images/eclipse/eclipse17.jpg)
      + 修改步骤,前提是要在关闭Tomcat的前提下,否则你更改不了这个
         + 找到`servers location`，选择第二个`User tomcat Installation`
        ![../images/eclipse/eclipse18.jpg](../images/eclipse/eclipse18.jpg)
        + 还要修改`deploy path`为`webapps`  
        修改前：
          ![../images/eclipse/eclipse19.jpg](../images/eclipse/eclipse19.jpg)
        修改后：
          ![../images/eclipse/eclipse20.jpg](../images/eclipse/eclipse20.jpg)
          不要忘记保存这个设置,否则不生效的
   - 运行项目
    - 把项目添加到Tomcat服务器
     ![../images/eclipse/eclipse30.jpg](../images/eclipse/eclipse30.jpg)
     ![../images/eclipse/eclipse31.jpg](../images/eclipse/eclipse31.jpg)
     ![../images/eclipse/eclipse32.jpg](../images/eclipse/eclipse32.jpg)
   ![../images/eclipse/eclipse22.jpg](../images/eclipse/eclipse22.jpg)
    ![../images/eclipse/eclipse23.jpg](../images/eclipse/eclipse23.jpg)
     ![../images/eclipse/eclipse23.jpg](../images/eclipse/eclipse28.jpg)
     ![../images/eclipse/eclipse24.jpg](../images/eclipse/eclipse24.jpg)
   ![../images/eclipse/eclipse21.jpg](../images/eclipse/eclipse21.jpg)
   
   - 运行效果
   ![../images/eclipse/eclipse33.jpg](../images/eclipse/eclipse33.jpg)
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   
   