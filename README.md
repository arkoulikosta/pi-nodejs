Control Raspberry Pi Gpio using Nodejs

sudo apt-get install npm -y 

npm install onoff express sleep socket.io



ftp: https://www.raspberrypi.org/documentation/remote-access/ftp.md

=----------------------------FTP--------------------------------------=
sudo apt-get install pure-ftpd -y
sudo groupadd ftpgroup
sudo useradd ftpuser -g ftpgroup -s /sbin/nologin -d /dev/null
sudo mkdir /home/pi/nodescripts
sudo chown -R ftpuser:ftpgroup /home/pi/nodescripts
sudo pure-pw useradd upload -u ftpuser -g ftpgroup -d /home/pi/nodescripts -m   //user:upload
sudo ln -s /etc/pure-ftpd/conf/PureDB /etc/pure-ftpd/auth/60puredb
sudo service pure-ftpd restart
=----------------------------FTP--------------------------------------=


run script on boot: http://weworkweplay.com/play/raspberry-pi-nodejs/
