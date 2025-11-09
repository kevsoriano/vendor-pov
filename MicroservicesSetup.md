# Setup a new microservice

## Create a Microservice
* Create a project
* Add Controller
* Define Models
* Configure Service Layer
* Configure Data Layer
* Create Interactive Documentation with Swagger

## Configure microservice to work with ...
* Spring Cloud Config Server
* Spring Cloud Eureka Client
* API Gateway

## Configure Role-based Access Control
* Enable Spring Security
* Add dependency to parse JWT
* Implement Authorization Filter
* Configure HTTP Security
* Add Spring Security Annotations


### swagger
```
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>3.0.0</version>
</dependency> 

<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-boot-starter</artifactId>
    <version>3.0.0</version>
</dependency>

<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>3.0.0</version>
</dependency>
```





## Create a project
https://start.spring.io/

## Create Controller

## Create customer facing data models
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-validation</artifactId>
</dependency>
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>3.1.1</version>
</dependency>
```

## Create Service
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-security</artifactId>
</dependency>
```

## Create DTO

## Create Repository
```
<dependency>
    <groupId>org.springframework.boot</groupId>
    <artifactId>spring-boot-starter-data-jpa</artifactId>
</dependency>
<dependency>
    <groupId>com.h2database</groupId>
    <artifactId>h2</artifactId>
    <scope>runtime</scope>
</dependency>
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```
## Create Entity

## Microservices communication
Communication Types
* Synchronous HTTP communication - wait until it receives a response.
* Asynchronous HTTP communication - Message is placed in queue. Microservice doesn't have to wait for message to get processed. Another microservice called "consumer" consumes the message from the queue.`

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

### Enable Actuator endpoints

Add configuration in Microservice's application.properties
```
management.endpoints.web.exposure.include=beans,health,mappings,httpexchanges
```
ApiGateway's application.properties
```
spring.cloud.gateway.routes[4].id=users-actuator
spring.cloud.gateway.routes[4].uri = lb://users
spring.cloud.gateway.routes[4].predicates[0]=Path=/users/actuator/**
spring.cloud.gateway.routes[4].filters[1]=RewritePath=/users/(?<segment>.*), /$\{segment}
```
Microservice's WebSecurity
```
.requestMatchers("/actuator/**").permitAll()
```
Microservice's main java file
```
@Bean
public HttpExchangeRepository httpTraceRepository() {
    return new InMemoryHttpExchangeRepository();
}
```

## PostgreSQL

### Maven Dependency
```
<dependency>
    <groupId>org.postgresql</groupId>
    <artifactId>postgresql</artifactId>
    <scope>runtime</scope>
</dependency>
```

### application.properties
```
spring.datasource.username=your-username
spring.datasource.password=your-password
spring.datasource.url=jdbc:postgresql://localhost:5432/your-database-name
spring.datasource.driverClassName=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
spring.jpa.hibernate.ddl-auto=update
```

### Access H2 Console to Access PostgreSQL Database
Navigate to http://localhost:<api gateway port>/<microservice app name>/h2-console