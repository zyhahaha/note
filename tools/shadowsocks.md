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