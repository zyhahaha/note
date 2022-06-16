### Jenkins安装


##### 查看系统版本
$ cat /etc/issue

##### 查看是否已安装java
$ java -version

##### 安装java
$ sudo apt-get install openjdk-8-jre

##### 配置环境变量，在/etc/profile中添加
#set jdk environment 
export JAVA_HOME=/usr/lib/jvm/Java-8-openjdk-amd64 
export JRE_HOME=$JAVA_HOME/jre 
export CLASSPATH=$JAVA_HOME/lib:$JRE_HOME/lib:$CLASSPATH 
export PATH=$JAVA_HOME/bin:$JRE_HOME/bin:$PATH 

##### 使配置立即生效（无需重启）
$ source /etc/profile

##### 安装Jenkins
$ wget -q -O - https://pkg.jenkins.io/debian/jenkins-ci.org.key | sudo apt-key add - 
$ sudo sh -c 'echo deb http://pkg.jenkins.io/debian-stable binary/ > /etc/apt/sources.list.d/jenkins.list' 
$ sudo apt-get update 
$ sudo apt-get install jenkins 

##### 在/usr/share/jenkins 下运行 jenkins.war
$ java -jar jenkins.war

##### 访问Jenkins
使用浏览器访问：http://localhost:8080/
默认端口是8080，可以通过以下两种方式改变端口
1. 指定端口： java -jar jenkins.war --httpPort=8080
2. 修改jenkins配置文件, 路径：vi /etc/default/jenkins

##### jenkins更新
$ sudo apt-get update
$ sudo apt-get install jenkins

##### 卸载Jenkins
移除 jenkins 和依赖关系
$ sudo apt-get remove jenkins
$ sudo apt-get remove --auto-remove jenkins

清除配置和数据
$ sudo apt-get purge jenkins
$ sudo apt-get purge --auto-remove jenkins
