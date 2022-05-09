### base
	$ git status 		-- 查看状态
	$ git remote -v 		-- 查看远程库信息
	$ git diff HEAD -- readme.txt 		-- 可以查看工作区和版本库里面最新版本的区别
	$ git config --global alias.cm cz 	-- 添加别名

### ------------------------------基础操作-------------------------------------
	$ git remote add origin git@github.com:michaelliao/learngit.git 		-- 添加远程库
	$ git rm test.txt 		-- 删除文件
	$ git add readme.md 		-- git add . 是添加所有文件 -f 可强制添加
	$ git commit -m "branch test" 		-- 提交
	$ git push -u origin master 		-- 第一次推送加 -u Git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，以后推送可以简化命令
	$ git push origin master 		-- 以后推送的简化后命令   ~ origin dev 推送其他分支

### ------------------------------分支-------------------------------------
	$ git checkout -b dev 		-- git checkout命令加上-b参数表示创建并切换
	$ git checkout -b dev origin/dev 		-- 创建origin dev分支
	$ git branch dev 		-- 创建分支
	$ git checkout dev 		-- 切换分支
	$ git branch 		-- 命令查看当前分支
	$ git merge dev 		-- 把dev分支的工作成果合并到master分支上
	$ git branch -d dev 		-- -d 删除分支 -D 强制删除分支
	$ git push origin :branchname 		-- 删除远程分支

### ------------------------------日志-------------------------------------
	$ git log --graph --pretty=oneline --abbrev-commit 		-- 查看日志
	$ git log --graph 		-- 可以看到分支合并图

### ------------------------------暂存-------------------------------------
	$ git stash 			-- 暂存功能
	$ git stash list 		-- 暂存列表
	$ git stash apply 		-- 恢复
	$ git stash drop 		-- 删除
	$ git stash pop 		-- 恢复的同时把stash内容也删了

### ------------------------------多人协作------------------------
	$ git branch --set-upstream dev origin/dev 		-- 创建本地分支和远程分支的链接关系
	$ git rm test.txt 		-- 删除文件
	$ git checkout -- test.txt 		-- 误删文件，若版本库里还有，这个命令可以恢复

### ------------------------------回退版本，撤销修改-------------------
	$ git checkout -- README.md 		-- 如果没有add 或 commit，此命令可以撤销修改
	$ git reset HEAD file 		-- 如果add了，但没commit，可以把暂存区的修改撤销掉
	$ git reset --hard HEAD^ 		-- 回退到上一版本
	$ git reset --hard e6397ab07f3cb 		-- 回退到任意版本
	$ git reflog 		-- 记录你的每一次命令
	### 回退单个文件版本 
	$ git log fileName 		-- 首先查看该文件的历史版本信息  记录hash如 9aa51d8
	$ git reset 9aa51d8 fileName 		-- 恢复该文件

### --------------------------------- 查 看 -------------------------
	$ git cherry-pick e6397ab07f3cb                         * 可以选择某一个分支中的一个或几个commit(s)来进行操作 *  ***  ** 在一个分支内commit另一个分支里的代码 **
	$ git blame src/../../test.js                           * 查看该文件修改记录及作者 *
	$ git config --global alias.co checkout                 * 别名 *
	$ git log -- grep <filter-field>						* 根据commit内容查找某次提交 *
	$ git show <commit-hash-id>								* 查看某次commit的修改内容 *

### ---------------------------------- 开始步骤 -------------------------
	1. $ git clone git@github.com:zyhahaha/learngit.git
	2. 本地.shh目录下的id_rsa.pub内容复制到远程ssh
	3. $ git remote add origin git@github.com:zyhahaha/learngit.git  	* 添加远程库 *
	4. $ git branch --set-upstream dev origin/dev 						* 创建本地分支和远程分支的链接关系 *
	5. $ git push -u origin master 										* 第一次推送加 -u git不但会把本地的master分支内容推送的远程新的master分支，还会把本地的master分支和远程的master分支关联起来，以后推送可以简化命令 *
	6. $ git push origin master 										* 以后推送的简化后命令   ~ origin dev 推送其他分支 *

### --------------------------------- 工作中遇到的技巧 -----------------------------
	$ git remote prune origin								* 删除远程仓库不存在的分支 *
	$ git remote set-url origin "newUrl"					* git修改远程仓库地址 *
	$ --allow-unrelated-histories							* 参数  fail histor *
	$ git push origin test --force   		* 强制推送远程 *


### ---------------------------- 存储密码 ----------------------------
	查看配置
	git config user.name
	git config user.email

	修改
	git config --global user.name "abc(新的用户名)"
	git config --global user.email "abc@qq.com(新的邮箱)"
	git config --global user.password"123456(新的密码)"

	弄掉密码
	git config --system --unset credential.helper

	重新存储密码
	git config --global credential.helper store


