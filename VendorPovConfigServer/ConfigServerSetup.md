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

## Configure Config Source

### Git backend
```
spring.profiles.active=git
spring.cloud.config.server.git.uri=https://github.com/kevsoriano/vendor-pov-configuration
spring.cloud.config.server.git.username=kevsoriano
spring.cloud.config.server.git.password=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
spring.cloud.config.server.git.clone-on-start=true
spring.cloud.config.server.git.default-label=main
```

### File System backend
```
spring.profiles.active=native
spring.cloud.config.server.native.search-locations=file://${user.home}<rest of folder path where you would store property files>
```

Create property files inside folder indicated in search-locations:
Create application.properties file for configuration to be shared among all subscribed microservices
For microservice specific properties, spring.cloud.config.name must match with name of property file

## Secure Config Server with Basic Authentication

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

### To validate if working
* Add Basic Authentication in Authorization tab in Postman
* Send a GET request to http://localhost:8012/users/default

### Configure CSRF exceptions for to allow Spring Security to work with /actuator/busrefresh
For state changing HTTP requests, Spring Framework requires CSRF token along with username and password.

```
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

	@Bean
	SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

		http
			.authorizeHttpRequests(auth -> auth.anyRequest().authenticated()) //
			.csrf(csrf -> csrf.ignoringRequestMatchers("/actuator/busrefresh"))
			.httpBasic(Customizer.withDefaults());

		return http.build();
	}
}
```

### Configure Microservices to use Basic Authentication credentials
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

To validate if microservice is able to connect to config server with Basic Authentication Credentials:
* Run Config server, Discovery Service, microservice
* Check log output of microservice, the first 3 lines should tell if it was able to connect to config server.

Sample:
```
[2m2025-10-25T10:52:06.644+08:00[0;39m [32m INFO[0;39m [35m74472[0;39m [2m--- [users] [  restartedMain] [0;39m[36mc.c.c.ConfigServicePropertySourceLocator[0;39m [2m:[0;39m Fetching config from server at : http://localhost:8012
[2m2025-10-25T10:52:06.740+08:00[0;39m [32m INFO[0;39m [35m74472[0;39m [2m--- [users] [  restartedMain] [0;39m[36mc.c.c.ConfigServicePropertySourceLocator[0;39m [2m:[0;39m Located environment: name=users, profiles=[default], label=null, version=null, state=null
[2m2025-10-25T10:52:06.740+08:00[0;39m [32m INFO[0;39m [35m74472[0;39m [2m--- [users] [  restartedMain] [0;39m[36mb.c.PropertySourceBootstrapConfiguration[0;39m [2m:[0;39m Located property source: [BootstrapPropertySource {name='bootstrapProperties-configClient'}, BootstrapPropertySource {name='bootstrapProperties-file:/Users/kevsoriano/Documents/Dev/vendor-pov-app/vendor-pov-local-configuration/users.properties'}, BootstrapPropertySource {name='bootstrapProperties-file:/Users/kevsoriano/Documents/Dev/vendor-pov-app/vendor-pov-local-configuration/application.properties'}]
```

### Restrict /actuator/busrefresh endpoint to ADMIN role
Add in application.properties
```
spring.security.user.roles=ADMIN
```

Configure auth object in authorizeHttpRequests in SecurityConfig class
```
.requestMatchers(HttpMethod.POST,"actuator/busrefresh").hasRole("ADMIN")
```
Create ADMIN User
```
	@Bean
	InMemoryUserDetailsManager userDetailsService(PasswordEncoder passwordEncoder) {
		UserDetails admin = User
				.withUsername(env.getProperty("spring.security.user.name"))
				.password(passwordEncoder.encode(env.getProperty("spring.security.user.password")))
				.roles(env.getProperty("spring.security.user.role"))
				.build();
		return new InMemoryUserDetailsManager(admin);
	}
	
	@Bean
	PasswordEncoder passwordEncoder() {
		return new BCryptPasswordEncoder();
	}
```

### Restrict configuration properties to CLIENT role

application.properties
```
client-spring.security.user.name=client
client-spring.security.user.password=client
client-spring.security.user.roles=CLIENT
```
SecurityConfig.class
```
.requestMatchers(HttpMethod.GET,"/**").hasRole("CLIENT")
```
```
UserDetails client = User
				.withUsername(env.getProperty("client-spring.security.user.name"))
				.password(passwordEncoder.encode(env.getProperty("client-spring.security.user.password")))
				.roles(env.getProperty("client-spring.security.user.role"))
				.build();
return new InMemoryUserDetailsManager(admin,client);
```

### Configure client microservices to use new access credentials
* Right click on project 
* Click "Run as"
* Click "Run Configurations"
* Click on project in left panel then select Environment tab
* Click Edit then modify key-value credentials to use new credentials

### Allow "/encrypt","/decrypt"
add the following configuration:
```
.requestMatchers(HttpMethod.POST, "/encrypt").hasRole("ADMIN")
.requestMatchers(HttpMethod.POST, "/decrypt").hasRole("ADMIN")
```

Also, update the CSRF configuration as follows:
```
.csrf(csrf->csrf.ignoringRequestMatchers("/actuator/busrefresh","/encrypt","/decrypt"))
```

### Basic Auth Is Not Encryption
Basic Auth uses Base64 encoding. It only hides the username and password. It doesn’t protect them.

If someone intercepts the HTTP request, they can decode the Authorization header. They will see the username and password in plain text.

To protect that data, always use SSL between Spring Cloud Config Server and the client Microservices.