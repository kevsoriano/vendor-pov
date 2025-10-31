# Add spring security
maven dependency
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```
application.properties
```
spring.security.user.name=admin
spring.security.user.password=admin
```
Configure Eureka clients to use username and password
```
eureka.client.service-url.defaultZone=http://admin:admin@localhost:8010/eureka
```
Configure Eureka Service URL in Config Server
```
eureka.client.service-url.defaultZone=http://admin:admin@localhost:8010/eureka
```
Move Spring Security credentials to Config Server
* Configure Discovery Service to communicate with Config Server
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-config</artifactId>
</dependency>
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bootstrap</artifactId>
    <version>4.0.1</version>
</dependency>
```
* Create bootstrap.properties
```
spring.cloud.config.uri=http://localhost:8012
spring.cloud.config.name=DiscoveryService

spring.cloud.config.username=${CONFIG_SERVER_USERNAME}
spring.cloud.config.password=${CONFIG_SERVER_PASSWORD}
```
* Add in application.properties
```
spring.config.import=configserver:http://localhost:8012
```

### Configure Discovery Server to use Basic Authentication credentials for Config Server
```
spring.cloud.config.username=admin
spring.cloud.config.password=admin
```

or you may use Kubernetes Secrets, AWS Secrets Manager, Hashicorp Vault
```
spring.cloud.config.username=${CONFIG_SERVER_USERNAME}
spring.cloud.config.password=${CONFIG_SERVER_PASSWORD}
```

You may also use the above config in Spring Tool Suite by applying runtime configurations.
* Right click on project 
* Click "Run as"
* Click "Run Configurations"
* Click on project in left panel then select Environment tab
* Click Add then add key-value credentials