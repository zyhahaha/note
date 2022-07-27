    upstream mongo1 {
        hash $remote_addr consistent;
        server 192.168.0.169:8635  weight=5 max_fails=3 fail_timeout=30s;
    }
    upstream mongo2 {
        hash $remote_addr consistent;
        server 192.168.0.247:8635  weight=5 max_fails=3 fail_timeout=30s;
    }

    server {
       listen 16355;
       proxy_connect_timeout 3000s;
       proxy_timeout 3000s;
       proxy_pass mongo1;
    }
    server {
       listen 16356;
       proxy_connect_timeout 3000s;
       proxy_timeout 3000s;
       proxy_pass mongo2;
    }
mongodb://rwuser:<password>@124.71.232.173:16356,124.71.232.173:16355/test?authSource=admin&replicaSet=replica