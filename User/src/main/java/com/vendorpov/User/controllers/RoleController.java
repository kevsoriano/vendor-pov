package com.vendorpov.User.controllers;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendorpov.User.models.RoleRequestModel;
import com.vendorpov.User.models.RoleResponseModel;
import com.vendorpov.User.services.RoleService;
import com.vendorpov.User.shared.RoleDto;

import jakarta.validation.Valid;

//@EnableMethodSecurity(prePostEnabled=true)
@RestController
@RequestMapping("/roles")
public class RoleController {
	@Autowired
	RoleService roleService;
	@Autowired
	ModelMapper modelMapper;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<RoleResponseModel> create(@Valid @RequestBody RoleRequestModel role) {
		RoleDto roleDto = modelMapper.map(role, RoleDto.class);
		RoleDto createdRole = roleService.createRole(roleDto);

		RoleResponseModel returnValue = modelMapper.map(createdRole, RoleResponseModel.class);
		// Ensure response id reflects the externalId coming from RoleDto
		returnValue.setId(createdRole.getId());
		return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
	}

	@GetMapping
	public ResponseEntity<List<RoleResponseModel>> getRoles(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
		List<RoleResponseModel> returnValue = new ArrayList<>();
		List<RoleDto> roles = roleService.getRoles(page, limit);

		for (RoleDto role : roles) {
			RoleResponseModel roleDetails = modelMapper.map(role, RoleResponseModel.class);
			roleDetails.setId(role.getId());
			returnValue.add(roleDetails);
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping(value="/{roleId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<RoleResponseModel> getRole(@PathVariable String roleId) {
		RoleDto RoleDto = roleService.getRoleByExternalId(roleId);
		RoleResponseModel returnValue = modelMapper.map(RoleDto, RoleResponseModel.class);
		returnValue.setId(RoleDto.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@PutMapping(value = "/{roleId}", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<RoleResponseModel> updateRole(@PathVariable String roleId,
			@RequestBody RoleRequestModel roleDetails) {
		RoleDto role = modelMapper.map(roleDetails, RoleDto.class);
		RoleDto updatedRole = roleService.updateRole(roleId, role);

		RoleResponseModel returnValue = modelMapper.map(updatedRole, RoleResponseModel.class);
		returnValue.setId(updatedRole.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@DeleteMapping(value = "/{roleId}", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteRole(@PathVariable String roleId) {
		roleService.deleteRole(roleId);
		return HttpStatus.OK;
	}
}
