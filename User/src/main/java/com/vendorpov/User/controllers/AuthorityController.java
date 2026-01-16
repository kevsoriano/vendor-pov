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

import com.vendorpov.User.models.AuthorityRequestModel;
import com.vendorpov.User.models.AuthorityResponseModel;
import com.vendorpov.User.services.AuthorityService;
import com.vendorpov.User.shared.AuthorityDto;

import jakarta.validation.Valid;

//@EnableMethodSecurity(prePostEnabled=true)
@RestController
@RequestMapping("/authorities")
public class AuthorityController {
	@Autowired
	AuthorityService authorityService;
	@Autowired
	ModelMapper modelMapper;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<AuthorityResponseModel> create(@Valid @RequestBody AuthorityRequestModel authority) {
		AuthorityDto authorityDto = modelMapper.map(authority, AuthorityDto.class);
		AuthorityDto createdAuthority = authorityService.createAuthority(authorityDto);

		AuthorityResponseModel returnValue = modelMapper.map(createdAuthority, AuthorityResponseModel.class);
		// Ensure response id reflects the externalId coming from AuthorityDto
		returnValue.setId(createdAuthority.getId());
		return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
	}

	@GetMapping
	public ResponseEntity<List<AuthorityResponseModel>> getAuthorities(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
		List<AuthorityResponseModel> returnValue = new ArrayList<>();
		List<AuthorityDto> authorities = authorityService.getAuthorities(page, limit);

		for (AuthorityDto authority : authorities) {
			AuthorityResponseModel authorityDetails = modelMapper.map(authority, AuthorityResponseModel.class);
			authorityDetails.setId(authority.getId());
			returnValue.add(authorityDetails);
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{authorityId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<AuthorityResponseModel> getAuthority(@PathVariable String authorityId) {
		AuthorityDto authorityDto = authorityService.getAuthorityByExternalId(authorityId);
		AuthorityResponseModel returnValue = modelMapper.map(authorityDto, AuthorityResponseModel.class);
		returnValue.setId(authorityDto.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@PutMapping(value = "/{authorityId}", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<AuthorityResponseModel> updateAuthority(@PathVariable String authorityId,
			@RequestBody AuthorityRequestModel authorityDetails) {
		AuthorityDto authority = modelMapper.map(authorityDetails, AuthorityDto.class);
		AuthorityDto updatedAuthority = authorityService.updateAuthority(authorityId, authority);

		AuthorityResponseModel returnValue = modelMapper.map(updatedAuthority, AuthorityResponseModel.class);
		returnValue.setId(updatedAuthority.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@DeleteMapping(value = "/{authorityId}", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteAuthority(@PathVariable String authorityId) {
		authorityService.deleteAuthority(authorityId);
		return HttpStatus.OK;
	}
}
