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