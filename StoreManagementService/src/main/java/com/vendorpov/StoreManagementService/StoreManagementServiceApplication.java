package com.vendorpov.StoreManagementService;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
//@EnableFeignClients
@EnableDiscoveryClient
public class StoreManagementServiceApplication {

	public static void main(String[] args) {
		SpringApplication.run(StoreManagementServiceApplication.class, args);
	}

}
