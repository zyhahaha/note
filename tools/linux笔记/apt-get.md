### 查询功能

	apt-cache search package 搜索软件包

	apt-cache show package  获取包的相关信息，如说明、大小、版本等

	sudo apt-get check 检查是否有损坏的依赖

	apt-cache depends package 了解使用该包依赖那些包

	apt-cache rdepends package 查看该包被哪些包依赖

### 安装功能

	sudo apt-get install package 安装包

	sudo apt-get install package --reinstall   重新安装包

	sudo apt-get -f install   修复安装

	sudo apt-get build-dep package 安装相关的编译环境

### 卸载功能

	sudo apt-get remove package 删除包

	sudo apt-get remove package --purge 删除包并清除配置文件
	 
	sudo apt-get clean && sudo apt-get autoclean 清理无用的包

### 升级功能

	sudo apt-get update  更新源

	sudo apt-get upgrade 更新已安装的包

	sudo apt-get dist-upgrade 升级系统

### 下载功能

	apt-get source package  下载该包的源代码
