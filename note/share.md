## 这里先总结出网友总结出的一些坑
 + @Resource，使用报错引用import javax.annotation.Resource
 + mybatis里面mapper映射的sql，如果要加单行注释的话，一定要在--后面跟一个空格
 + 最好在jdbc.properties中需要修改前面加个前缀jdbc。防止与全局变量冲突