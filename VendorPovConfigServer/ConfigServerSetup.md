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