package com.vendorpov.User.controllers;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendorpov.User.models.UpdateUserRequestModel;
import com.vendorpov.User.models.UserRequestModel;
import com.vendorpov.User.models.UserResponseModel;
import com.vendorpov.User.services.UserService;
import com.vendorpov.User.shared.UserDto;

import jakarta.validation.Valid;


@CrossOrigin(origins="*")
@RestController
@RequestMapping("/users")
public class UserController {
	
	@Autowired
	UserService userService;
	@Autowired
	Environment env;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<UserResponseModel> createUser(@Valid @RequestBody UserRequestModel user) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		UserDto userDto = modelMapper.map(user, UserDto.class);
		UserDto createdUser = userService.createUser(userDto);
		
		UserResponseModel returnValue = modelMapper.map(createdUser, UserResponseModel.class);
		return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
	}
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<UserResponseModel>> getUsers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<UserResponseModel> returnValue = new ArrayList<>();
		List<UserDto> users = userService.getUsers(page, limit);

		for(UserDto user: users) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			UserResponseModel userDetails = modelMapper.map(user, UserResponseModel.class);
			returnValue.add(userDetails);
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{userId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
//	@PreAuthorize("principal==#userId")
//	@PostAuthorize("principal==returnObject.body.userId")
//	@PreAuthorize("hasRole('ADMIN') or principal==#userId")
	public ResponseEntity<UserResponseModel> getUser(@PathVariable String userId) {
		UserDto userDto = userService.getUserByUserId(userId);
		UserResponseModel returnValue = new ModelMapper().map(userDto, UserResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	
	@PutMapping(value="/{userId}", consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<UserResponseModel> updateUser(@PathVariable String userId, @RequestBody UpdateUserRequestModel userDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		UserDto userDto = modelMapper.map(userDetails, UserDto.class);
		UserDto updatedUser = userService.updateUser(userId, userDto);

		UserResponseModel returnValue = modelMapper.map(updatedUser, UserResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@DeleteMapping(value = "/{userId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	@PreAuthorize("hasAuthority('PROFILE_DELETE') or hasRole('ADMIN') or principal == #userId")
	public HttpStatus deleteUser(@PathVariable String userId) {
		userService.deleteUser(userId);
		return HttpStatus.OK;
	}
}
