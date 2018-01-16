### 运行
pm2 start app.js

### 查看运行状态
pm2 list

### 追踪资源运行情况
pm2 monit

### 查看应用详细部署状态 -- 0是app id
pm2 describe appId

### 查看日志
pm2 logs

### 重启应用
pm2 restart appId

### 停止应用
pm2 stop app.js

### 开启api访问 -- 浏览器访问localhost:9615
pm2 web
