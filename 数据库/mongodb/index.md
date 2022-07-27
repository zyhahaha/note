### 连接数据库
$ mongo 39.107.233.197:27017/test -u "zhaoyang" -p "980355088"

### 数据库操作
> show dbs
> use test
> db.createUser({user:"zhaoyang",pwd:"980355088",roles:[{ role: "readWrite", db: "test" }]})

