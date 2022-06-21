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

        # root /home/zyhahaha/sites/e-shop-management/dist;
}

server {
        listen 80;
        server_name 123123.store;

        location / {
                root /home/zyhahaha/sites/e-shop-frontend/dist;
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
                root /home/zyhahaha/sites/e-shop-frontend/dist;
                index   index.html index.htm;
                try_files $uri $uri/ @rewrites;
        }
        location @rewrites {
                rewrite ^(.*)$ /index.html last;
        }


        # root /home/zyhahaha/sites/e-shop-frontend/dist;
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
