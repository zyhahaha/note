### Shadowsocks
	$ apt-get install python-pip
	$ pip install shadowsocks
	$ vi /etc/shadowsocks.json
		{
		    "server":"my_server_ip",
		    "server_port":8000,
		    "local_address": "127.0.0.1",
		    "local_port":1080,
		    "password":"mypassword",
		    "timeout":300,
		    "method":"rc4-md5"
		}
	$ ssserver -c /etc/shadowsocks.json -d start
	$ ssserver -c /etc/shadowsocks.json -d stop

### Shadowsocks golang    需要安装golang环境    https://github.com/shadowsocks/shadowsocks-go
	$ go get github.com/shadowsocks/shadowsocks-go/cmd/shadowsocks-server
	$ vi ./config.json
	$ ./shadowsocks-server > log &  

### Shadowsocks python
	$ apt-get install python-pip 			yum install python-setuptools && easy_install pip
	$ pip install shadowsocks
	$ vi /etc/shadowsocks.json
		{
		    "server":"my_server_ip",
		    "server_port":8000,
		    "local_address": "127.0.0.1",
		    "local_port":1080,
		    "password":"mypassword",
		    "timeout":300,
		    "method":"rc4-md5"
		}
	$ ssserver -c /etc/shadowsocks.json -d start
	$ ssserver -c /etc/shadowsocks.json -d stop

	centOS
	$ firewall-cmd --zone=public --add-port=8000/tcp --permanent
	$ firewall-cmd --zone=public --add-port=8000/udp --permanent
	$ firewall-cmd --reload

	加速
	$ wget -N --no-check-certificate "https://raw.githubusercontent.com/chiakge/Linux-NetSpeed/master/tcp.sh" && chmod +x tcp.sh && ./tcp.sh

