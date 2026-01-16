package com.vendorpov.User.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.expression.WebExpressionAuthorizationManager;

import com.vendorpov.User.services.UserService;


@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled=true)
public class WebSecurity {
	private Environment env;
	private UserService userService;
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	public WebSecurity(Environment env, UserService userService, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.env = env;
		this.userService = userService;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

	@Bean
	protected SecurityFilterChain configure(HttpSecurity http) throws Exception {
		AuthenticationManagerBuilder authenticationManagerBuilder = http.getSharedObject(AuthenticationManagerBuilder.class);
		
		authenticationManagerBuilder.userDetailsService(userService)
		.passwordEncoder(bCryptPasswordEncoder);
		
		AuthenticationManager authenticationManager = authenticationManagerBuilder.build();
		
		AuthenticationFilter authenticationFilter = new AuthenticationFilter(authenticationManager,userService,env);
		authenticationFilter.setFilterProcessesUrl(env.getProperty("login.url.path"));
		
		http.csrf(csrf ->csrf.disable());
		
		http.authorizeHttpRequests((auth)->
			auth
				.requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()
				.requestMatchers("/users/**").permitAll()
				.requestMatchers("/roles/**").permitAll()
				.requestMatchers("/authorities/**").permitAll()
				.requestMatchers("/actuator/**").permitAll()
				.requestMatchers("/users/**").access(new WebExpressionAuthorizationManager("hasIpAddress('"+env.getProperty("gateway.ip")+"')"))
				.requestMatchers("/h2-console/**").permitAll()
				.requestMatchers("/v2/api-docs","/configuration/**","/swagger*/**","/webjars/**").permitAll()
//				.anyRequest().permitAll()
			)
		.addFilter(new AuthorizationFilter(authenticationManager, env))
		.addFilter(authenticationFilter)
		.authenticationManager(authenticationManager)
		.sessionManagement((session)->session.sessionCreationPolicy(SessionCreationPolicy.STATELESS));
		
		// h2 console requires frames
//		http.headers((headers)->headers.frameOptions((frameOptions)->frameOptions.sameOrigin()));
		
		return http.build();
	}
}
