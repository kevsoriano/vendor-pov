## Start up a new Linux Server on AWS EC2
## Connect to EC2

chmod 400 your-key-pair-name.pem

ssh -i "./kev.pem" ec2-user@ec2-3-26-207-53.ap-southeast-2.compute.amazonaws.com

## Install Docker on EC2
sudo yum install docker
sudo service docker start
sudo usermod -a -G docker ec2-user

https://docs.docker.com/engine/install/debian/#install-using-the-repository

# rabbitmq image
https://hub.docker.com/_/rabbitmq

docker run -d --name rabbitmq-management -p 15672:15672 -p 5672:5672 -p 15671:15671 -p 5671:5671 -p 4369:4369 rabbitmq:4.1-management

-d = detach (continue running even after closing terminal)

Commands:
docker ps - list all running containers 
docker ps -a - list all containers
docker start <container_id|image_name>  - start service
docker stop <container_id> - stop service
docker rm <container_id> - remove service
docker images - list all images
docker rmi <image_id> - remove image

## create docker image

copy full path of project location 
sample:
cd /Users/kevsoriano/Documents/Dev/vendor-pov-app/vendor-pov/VendorPovConfigServer

mvn clean
mvn package

docker build --tag=config-server --force-rm=true --platform linux/amd64,linux/arm64 .

docker login --username=kevin1017

docker tag <id> kevin1017/config-server

docker push kevin1017/config-server

docker inspect <container_id>

docker run -d -p 8012:8012 -e "spring.rabbitmq.host=172.17.0.2" kevin1017/config-server 

docker run -d -p 8010:8010 -e "spring.cloud.config.uri=http://172.17.0.2:8012" kevin1017/eureka-server

docker run -d -p 5173:5173 kevin1017/vendor-pov-ui