# vendor-pov-config-server

## Hierarchy

application.properties

&#8595;

a.properties

&#8595;

a-profile.properties

&#8595;

application.properties


## Configure Microservice to be a Client of Config Server
### Maven Dependencies
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

### bootstrap.properties File
```
spring.cloud.config.uri=http://localhost:<port number of config server>
```
and optionally:
```
spring.cloud.config.name=<application name>
```

Where:

* The spring.cloud.config.uri property should point to the Spring Cloud Config Server. If the server runs on a different host or port, update this property accordingly.

* The spring.cloud.config.name property indicates the name of the configuration file (in the Spring Cloud Config Server) that the Microservice will fetch properties from. If you set this to users-ws, the Microservice will request configuration properties from users-ws.properties (and application.properties) stored in the Config Server.

* If the users-ws.properties files is not found in the Config Server, then, Spring Cloud Config server will share configuration properties from the application.properties file only.

### application.properties File
spring.config.import=configserver:http://localhost:<port number of config server>

## Configure Config Server for Automatic Configuration Refresh
### Overview
* Spring Cloud Bus - Exposes 1 URL endpoint for us to refresh application configuration data. Dependency also needs to be added to microservices that needs to refresh its configuration.

* Spring Cloud Actuator - includes additional features that helps us to monitor and manage applications while it's running.

* RabbigMQ - RabbitMQ is a message broker that provides a reliable, common platform for applications to send, receive, and safely store messages until they're processed.

### Maven Dependencies
```
<dependency>
    <groupId>org.springframework.cloud</groupId>
    <artifactId>spring-cloud-starter-bus-amqp</artifactId>
</dependency>
 
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### Enable the /busrefresh URL endpoint
Add to application.properties
```
management.endpoints.web.exposure.include=busrefresh
```

### Setup RabbitMQ
Download and Install RabbitMQ - https://www.rabbitmq.com/docs/download

For Mac:
```
brew update
brew install rabbitmq
```

To find out locations for your installation, use:
```
brew info rabbitmq
```

Starting the Server

To start a node in the foreground, run:
```
CONF_ENV_FILE="/opt/homebrew/etc/rabbitmq/rabbitmq-env.conf" /opt/homebrew/opt/rabbitmq/sbin/rabbitmq-server
# After starting a node, it is recommended to enable all feature flags on it:
/opt/homebrew/sbin/rabbitmqctl enable_feature_flag all
```

To start a node in the background:
```
brew services start rabbitmq
/opt/homebrew/sbin/rabbitmqctl enable_feature_flag all
```

To stop a running node:
```
brew services stop rabbitmq
```

### Access RabbitMQ Dashboard 
URL: http://localhost:15672/

For initial login:
username: guest
password: guest

To change password, Admin page > Add User or Click on User > Update User

### application.properties (Add to all microservices that need to refresh its configuration automatically)
```
spring.rabbitmq.host=localhost
spring.rabbitmq.port=5672
spring.rabbitmq.username=<username>
spring.rabbitmq.password=<password>
```

### Git backend
spring.profiles.active=git
spring.cloud.config.server.git.uri=https://github.com/kevsoriano/vendor-pov-configuration
spring.cloud.config.server.git.username=kevsoriano
spring.cloud.config.server.git.password=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
spring.cloud.config.server.git.clone-on-start=true
spring.cloud.config.server.git.default-label=main

### File System backend
create application.properties file

spring.profiles.active=native
spring.cloud.config.server.native.search-locations=file:///Users/kevsoriano/Documents/Dev/vendor-pov-app/vendor-pov-local-configuration