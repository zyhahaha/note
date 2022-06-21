### 一个域名，一个项目
location / {    
  root /home/zyhahaha/sites/e-shop-management/dist;  # 项目在服务器上的真实路径
  index  index.html index.htm;
  try_files $uri $uri/ @rewrites; 
} 
        
location @rewrites {
  rewrite ^(.*)$ /index.html last;
}


### 一个域名，多个项目
location /projectA {
    index  index.html index.htm;
    try_files $uri $uri/ /projectA/index.html;
}

location /projectB {
    index  index.html index.htm;
    try_files $uri $uri/ /projectB/index.html;
}