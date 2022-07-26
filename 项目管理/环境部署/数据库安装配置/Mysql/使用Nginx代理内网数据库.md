### 代理内网mysql数据库
### 要添加到nginx.conf里，防止报stream包未加载错误

stream {
    # 添加socket转发的代理
    upstream mysqlzzz {
        hash $remote_addr consistent;
        # 转发的目的地址和端口
      server 192.168.0.1:3306  weight=5 max_fails=3 fail_timeout=30s;
    }
 
    # 提供转发的服务，即访问localhost:7041，会跳转至代理kuye指定的转发地址
    server {
       listen 33066;
       proxy_connect_timeout 300s;
       proxy_timeout 300s;
       proxy_pass mysqlzzz;
    }
