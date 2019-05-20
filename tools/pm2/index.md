### 运行
$ pm2 start app.js
	参数说明：
		--watch: 监听应用目录的变化，一旦发生变化，自动重启。如果要精确监听、不见听的目录，最好通过配置文件。

		-i --instances: 启用多少个实例，可用于负载均衡。如果-i 0或者-i max，则根据当前机器核数确定实例数目。

		--ignore-watch：排除监听的目录/文件，可以是特定的文件名，也可以是正则。比如--ignore-watch="test node_modules "some scripts""
		
		-n --name：应用的名称。查看应用信息的时候可以用到。

### 查看运行状态
$ pm2 list

### 追踪资源运行情况
$ pm2 monit

### 查看应用详细部署状态 -- 0是app id
$ pm2 describe appId

### 查看日志
$ pm2 logs

### 重启应用
$ pm2 restart appId

### 停止应用
$ pm2 stop app.js

### 开启api访问 -- 浏览器访问localhost:9615
$ pm2 web
