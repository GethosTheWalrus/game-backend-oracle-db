for pkg in docker.io docker-doc docker-compose docker-compose-v2 podman-docker containerd runc; do sudo apt-get remove $pkg; done

# Add Docker's official GPG key:
sudo apt-get update
sudo apt-get install ca-certificates curl gnupg unzip -y
sudo install -m 0755 -d /etc/apt/keyrings
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /etc/apt/keyrings/docker.gpg
sudo chmod a+r /etc/apt/keyrings/docker.gpg

# Add the repository to Apt sources:
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.gpg] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

sudo apt-get update
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin docker-compose -y
sudo usermod -aG docker ubuntu

wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-basic-linux.x64-23.4.0.24.05.zip -O instantclient.zip
unzip instantclient.zip -d basicfolder
rm instantclient.zip

wget https://download.oracle.com/otn_software/linux/instantclient/2340000/instantclient-sqlplus-linux.x64-23.4.0.24.05.zip -O sqlplus.zip
unzip sqlplus.zip -d sqlplusfolder
rm sqlplus.zip 

git clone https://github.com/GethosTheWalrus/game-backend-oracle-db.git

cd ~/game-backend-oracle-db/app
sudo docker build -t flappybird-backend .

cd ~/game-backend-oracle-db/webserver
sudo docker build -t flappybird-frontend .

mkdir ~/instantclient
cp -r ~/basicfolder/instantclient_23_4/. ~/instantclient/
cp -r ~/sqlplusfolder/instantclient_23_4/. ~/instantclient/

touch ~/sqlplus

echo '#!/bin/bash
CLIENTDIR=/home/ubuntu/instantclient
export LD_LIBRARY_PATH="$CLIENTDIR"
"$CLIENTDIR"/sqlplus "$@"' > ~/sqlplus

# echo '#!/bin/bash
# apt update
# apt install -y libaio1 libaio-dev
# for filename in /home/ubuntu/game-backend-oracle-db/database-scripts/*.sql; do
#   # echo $ORACLEDB_CONNECTION_STRING
#   echo \"./sqlplus "ADMIN"/"MySecurePassword123"@"$ORACLEDB_CONNECTION_STRING" @ "$filename"\"
# done' > ~/dbinit

chmod 755 ~/sqlplus
chmod 755 ~/dbinit

sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 80 -j ACCEPT
sudo iptables -I INPUT 6 -m state --state NEW -p tcp --dport 3000 -j ACCEPT
sudo netfilter-persistent save