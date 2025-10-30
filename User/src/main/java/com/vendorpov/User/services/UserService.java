package com.vendorpov.User.services;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.vendorpov.User.shared.UserDto;

public interface UserService extends UserDetailsService {
	UserDto createUser(UserDto userDetails);
	UserDto getUserByEmail(String email);
}
