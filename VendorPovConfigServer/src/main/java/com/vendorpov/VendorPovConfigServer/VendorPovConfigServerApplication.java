package com.vendorpov.VendorPovConfigServer;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.config.server.EnableConfigServer;

@SpringBootApplication
@EnableConfigServer
public class VendorPovConfigServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(VendorPovConfigServerApplication.class, args);
	}

}
