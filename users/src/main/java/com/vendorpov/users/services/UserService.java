package com.vendorpov.users.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.vendorpov.users.shared.UserDto;

public interface UserService extends UserDetailsService {
	UserDto createUser(UserDto userDetails);
	UserDto getUserDetailsByEmail(String email);
}
