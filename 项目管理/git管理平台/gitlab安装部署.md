### Gitlab安装（https://cloud.tencent.com/developer/article/1349230）


$ sudo apt update
$ sudo apt install ca-certificates curl openssh-server postfix
$ cd /tmp
$ curl -LO https://packages.gitlab.com/install/repositories/gitlab/gitlab-ce/script.deb.sh

##### 查看下载的脚本
$ less /tmp/script.deb.sh

##### 运行脚本
$ sudo bash /tmp/script.deb.sh

##### 安装gitlab
$ sudo apt install gitlab-ce

##### 运行gitlab
$ sudo gitlab-ctl reconfigure

##### 如果访问123.123.123.123不通，需要检查防火墙，或者直接关闭防火墙

##### 访问Gitlab时，cat /etc/gitlab/initial_root_password查看初始密码，用户名为root

##### 编辑GitLab配置文件（可以不配置）
$ sudo nano /etc/gitlab/gitlab.rb
修改文件
##! For more details on configuring external_url see:
##! https://docs.gitlab.com/omnibus/settings/configuration.html#configuring-the-external-url-for-gitlab
external_url 'https://example.com'
letsencrypt['contact_emails'] = ['sammy@example.com']
保存后重新配置Gitlab
$ sudo gitlab-ctl reconfigure



