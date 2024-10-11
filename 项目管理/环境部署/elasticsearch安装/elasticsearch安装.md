sudo apt update
sudo apt install apt-transport-https ca-certificates wget
wget -qO - https://artifacts.elastic.co/GPG-KEY-elasticsearch | sudo apt-key add -
sudo sh -c 'echo "deb https://artifacts.elastic.co/packages/7.x/apt stable main" > /etc/apt/sources.list.d/elastic-7.x.list'
sudo apt update

sudo apt install elasticsearch
sudo systemctl enable --now elasticsearch.service
curl -X GET "localhost:9200/"
sudo systemctl restart elasticsearch

### 参考
https://cloud.tencent.com/developer/article/1657534