### nginx
	$ sudo apt-get update
	$ sudo apt-get install nginx

### nodejs
	$ wget https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-x64.tar.xz
	  wget https://nodejs.org/dist/v14.17.6/node-v14.17.6-linux-armv7l.tar.xz
	  wget https://nodejs.org/dist/v10.15.3/node-v10.15.3-linux-armv7l.tar.xz
	$ tar x -f node-v14.17.6-linux-x64.tar.xz
	$ ln -s /home/zyhahaha/nodejs/node-v14.17.6-linux-x64/bin/node /usr/local/bin/node

### mysql
	$ apt-get update
	$ sudo apt-get install mysql-server mysql-client
	
### mongodb
	$ apt-get update
	$ apt-get install mongodb-server

### redis
	$ sudo apt-get install redis-server
	$ redis-server /etc/redis/redis.conf 		### 启动服务端
	$ redis-cli			### 客户端


