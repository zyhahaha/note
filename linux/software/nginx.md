### 关闭nginx
	$ service nginx stop

### 启动nginx
	$ nginx
### 重启nginx
	$ nginx -s reload

### 测试
	$ wget http://192.168.0.127:8888/report/query
	$ wget http://127.0.0.1:8888/report/query
	$ wget http://127.0.0.1:9001
