mysql直接在应用市场安装；注意：需求启动mysql服务

service mysql start
mysql -uroot 
use mysql;
update user set password=password('root') where user='root';　　
update user set host='%' where user='root';
修改 /etc/mysql/debian.cnf  中root密码
修改 /etc/mysql/mariadb.conf.d/50-server.cnf 配置文件； bind-address =0.0.0.0
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%' IDENTIFIED BY 'root' WITH GRANT OPTION; 
flush privileges;