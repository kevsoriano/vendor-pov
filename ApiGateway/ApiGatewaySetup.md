## Spring Boot Actuator
Sample features
* /health - Health check. Can be used to check health of individual instances of microservices to determine which are ready and able to serve requests.
* /beans - Displays complete list of beans in your microservices.
* /httpexchanges - Displays Http exchange information (by default, the last 100 HTTP request-response exchanges).

### Add Spring Boot Actuator
Maven Dependency
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-actuator</artifactId>
</dependency>
```

### Enable Actuator's /gateway and /mappings endpoints
/gateway - list all routes that we have configured in API gateway.
/mappings - all request mappings that have been registered in your application. it also allows you to check if a specific URL request path has been mapped to a method in a controller class. 

application.properties
```
management.endpoint.gateway.access=UNRESTRICTED
management.endpoints.web.exposure.include=gateway,health,mappings
```