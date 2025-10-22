package com.vendorpov.ApiGateway;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.annotation.Order;

import reactor.core.publisher.Mono;

@Configuration
public class GlobalFilterConfiguration {
	final Logger logger = LoggerFactory.getLogger(GlobalFilterConfiguration.class);
	
	@Bean
	@Order(1)
	public GlobalFilter secondPreFilter() {
		return (exchange,chain) -> {
			logger.info("My 2nd global pre-filter is called.");
			return chain.filter(exchange).then(Mono.fromRunnable(() -> {
				logger.info("My 2nd global post-filter is called.");
			}));
		};
	}
	
	@Bean
	@Order(2)
	public GlobalFilter thirdPreFilter() {
		return (exchange,chain) -> {
			logger.info("My 3rd global pre-filter is called.");
			return chain.filter(exchange).then(Mono.fromRunnable(() -> {
				logger.info("My 1st global post-filter is called.");
			}));
		};
	}
}
