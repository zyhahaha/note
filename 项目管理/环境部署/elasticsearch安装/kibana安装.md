wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo sh -c 'echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list'
sudo apt-get update
sudo apt-get install kibana

修改Kibana配置文件（可选）：
编辑 /etc/kibana/kibana.yml 文件，根据需要修改配置，例如设置Elasticsearch主机。

sudo systemctl start kibana
sudo systemctl enable kibana
sudo systemctl status kibana
