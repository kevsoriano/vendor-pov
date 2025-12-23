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

## CORS configuration
application.properties
```
spring.cloud.gateway.server.webflux.globalcors.cors-configurations.[/**].allowed-origins=*
spring.cloud.gateway.server.webflux.globalcors.cors-configurations.[/**].allowed-origin-patterns=*
spring.cloud.gateway.server.webflux.globalcors.cors-configurations.[/**].allowed-methods=GET,POST,PUT,DELETE,OPTIONS
spring.cloud.gateway.server.webflux.globalcors.cors-configurations.[/**].allowed-headers=*
spring.cloud.gateway.server.webflux.globalcors.add-to-simple-url-handler-mapping=true
spring.cloud.gateway.server.webflux.globalcors.cors-configurations.[/**].exposed-headers=token,userid
spring.cloud.gateway.server.webflux.globalcors.cors-configurations.[/**].allow-credentials=true
spring.cloud.gateway.server.webflux.default-filters[0]=DedupeResponseHeader=Access-Control-Allow-Origin
```

Add to apply function in AuthorizationHeaderFilter.java
```
if (req.getMethod().name().equalsIgnoreCase("OPTIONS")) {
    return chain.filter(exchange);
}
```