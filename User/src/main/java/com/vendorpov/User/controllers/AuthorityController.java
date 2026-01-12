package com.vendorpov.User.controllers;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.Collection;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vendorpov.User.models.AuthorityDetailsModel;
import com.vendorpov.User.services.AuthorityService;
import com.vendorpov.User.shared.AuthorityDto;

@EnableMethodSecurity(prePostEnabled=true)
@RestController
@RequestMapping("/authorities")
public class AuthorityController {
	@Autowired
	AuthorityService authorityService;
	@Autowired
	ModelMapper modelMapper; 
	
	@GetMapping
	public ResponseEntity<Collection<AuthorityDetailsModel>> listAuthorities() {
		Collection<AuthorityDetailsModel> returnValue = new ArrayList<>();
		Collection<AuthorityDto> authorities = authorityService.getAuthorities();
		
		Type listType = new TypeToken<Collection<AuthorityDetailsModel>>() {}.getType();
		returnValue = modelMapper.map(authorities, listType);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
}
