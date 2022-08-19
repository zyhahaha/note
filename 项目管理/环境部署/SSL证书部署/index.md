# server {
#         listen 80;
#         server_name blog.123123.store;
#         root /home/zyhahaha/sites/zyhahaha.github.io;
# }

# 重定向https
server {
    listen 80;
    server_name blog.123123.store;
    return 301 https://$server_name$request_uri;
}

# ssl配置
server {
    listen 443;
    server_name blog.123123.store; # localhost 修改为您证书绑定的域名。
    ssl on; #设置为 on 启用 SSL 功能。
    root html;
    index index.html index.htm;
    ssl_certificate cert/123123_store_integrated.crt; #将 domain name.pem 替换成您证书的文件名。
    ssl_certificate_key cert/123123_store.key; #将domain name.key替换成您证书的密钥文件名。
    ssl_session_timeout 5m;
    ssl_ciphers
    ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #使用该协议进行配置。
    ssl_prefer_server_ciphers on;
    location / {
        root /home/zyhahaha/sites/zyhahaha.github.io; #站点目录。
        index index.html index.htm; #添加属性。
    }
}


# server {
#         listen 80;
#         server_name cv.123123.store;
#         root /home/zyhahaha/sites/resume;
# }

# 重定向https
server {
    listen 80;
    server_name cv.123123.store;
    return 301 https://$server_name$request_uri;
}

# ssl配置
server {
    listen 443;
    server_name cv.123123.store; # localhost 修改为您证书绑定的域名。
    ssl on; #设置为 on 启用 SSL 功能。
    root html;
    index index.html index.htm;
    ssl_certificate cert/123123_store_integrated.crt; #将 domain name.pem 替换成您证书的文件名。
    ssl_certificate_key cert/123123_store.key; #将domain name.key替换成您证书的密钥文件名。
    ssl_session_timeout 5m;
    ssl_ciphers
    ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #使用该协议进行配置。
    ssl_prefer_server_ciphers on;
    location / {
        root /home/zyhahaha/sites/resume; #站点目录。
        index index.html index.htm; #添加属性。
    }
}

server {
        listen 80;
        server_name m.123123.store;

        location / {
                root /home/zyhahaha/sites/e-shop-management/dist;
                index   index.html index.htm;
                try_files $uri $uri/ @rewrites;
        }

        location @rewrites {
                rewrite ^(.*)$ /index.html last;
        }
}

server {
        listen 80;
        server_name 123123.store;

        location / {
                root /home/zyhahaha/sites/e-shop-management/dist;
                index   index.html index.htm;
                try_files $uri $uri/ @rewrites;
        }
        location @rewrites {
                rewrite ^(.*)$ /index.html last;
        }
}

server {
        listen 80;
        server_name www.123123.store;

        location / {
                root /home/zyhahaha/sites/e-shop-management/dist;
                index   index.html index.htm;
                try_files $uri $uri/ @rewrites;
        }
        location @rewrites {
                rewrite ^(.*)$ /index.html last;
        }
}

server {
        listen 80;
        server_name resource.123123.store;
        root /home/zyhahaha/resource;
}


upstream backend {
  server 127.0.0.1:3000;
}

server {
  listen  80;
  server_name  api.123123.store;
  location / {
    proxy_set_header X-Real-IP $remote_addr;
    proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_set_header X-Nginx-Proxy true;
    proxy_pass http://backend;
    proxy_redirect off;
  }
}

# ssl api
server {
    listen 443;
    server_name api.123123.store; # localhost 修改为您证书绑定的域名。
    ssl on; #设置为 on 启用 SSL 功能。
    ssl_certificate cert/123123_store_integrated.crt; #将 domain name.pem 替换成您证书的文件名。
    ssl_certificate_key cert/123123_store.key; #将domain name.key替换成您证书的密钥文件名。
    ssl_session_timeout 5m;
    ssl_ciphers
    ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4; #使用此加密套件。
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2; #使用该协议进行配置。
    ssl_prefer_server_ciphers on;
    location / {
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forward-For $proxy_add_x_forwarded_for;
        proxy_set_header Host $http_host;
        proxy_set_header X-Nginx-Proxy true;
        proxy_pass http://backend;
        proxy_redirect off;
    }
}
