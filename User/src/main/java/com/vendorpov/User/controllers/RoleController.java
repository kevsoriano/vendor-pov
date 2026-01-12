package com.vendorpov.User.controllers;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.vendorpov.User.models.RoleDetailsModel;
import com.vendorpov.User.services.RoleService;
import com.vendorpov.User.shared.RoleDto;

@EnableMethodSecurity(prePostEnabled=true)
@RestController
@RequestMapping("/roles")
public class RoleController {
	@Autowired
	RoleService roleService;
	@Autowired
	ModelMapper modelMapper; 
	
	@GetMapping
	public ResponseEntity<List<RoleDetailsModel>> listRoles() {
		List<RoleDetailsModel> returnValue = new ArrayList<>();
		List<RoleDto> roles = roleService.getRoles();
		
		Type listType = new TypeToken<List<RoleDetailsModel>>() {}.getType();
		returnValue = modelMapper.map(roles, listType);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
}
