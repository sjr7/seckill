## 手动构建一个maven结构的目录
当然我也还没构建过，在idea控制台看到的，就顺手记录下来了
```
java -Dmaven.multiModuleProjectDirectory=/tmp/archetypetmp -Dmaven.home=/opt/idea-IU-171.4249.39/plugins/maven/lib/maven3 -Dclassworlds.conf=/opt/idea-IU-171.4249.39/plugins/maven/lib/maven3/bin/m2.conf -Dfile.encoding=UTF-8 -classpath /opt/idea-IU-171.4249.39/plugins/maven/lib/maven3/boot/plexus-classworlds-2.5.2.jar org.codehaus.classworlds.Launcher -Didea.version=2017.1.2 -Dmaven.repo.local=/media/jianrongsun/SSD/Soft/apache-maven-3.3.9/repository -DinteractiveMode=false -DgroupId=com.suny.seckill -DartifactId=seckill -Dversion=1.0-SNAPSHOT -DarchetypeGroupId=org.apache.maven.archetypes -DarchetypeArtifactId=maven-archetype-webapp -DarchetypeVersion=RELEASE org.apache.maven.plugins:maven-archetype-plugin:RELEASE:generate
```