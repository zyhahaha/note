    upstream redisz {
        hash $remote_addr consistent;
        server 192.168.0.165:8635  weight=5 max_fails=3 fail_timeout=30s;
    }

    server {
       listen 5399;
       proxy_connect_timeout 3000s;
       proxy_timeout 3000s;
       proxy_pass redisz;
    }
redis-cli -h 192.168.0.165 -p 8635 -a Zzz@980355088