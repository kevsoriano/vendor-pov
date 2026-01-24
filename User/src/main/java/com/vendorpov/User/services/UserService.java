package com.vendorpov.User.services;

import java.util.List;

import org.springframework.security.core.userdetails.UserDetailsService;

import com.vendorpov.User.shared.UserDto;

public interface UserService extends UserDetailsService {
	UserDto createUser(UserDto userDetails);

	List<UserDto> getUsers(int page, int limit);

	List<UserDto> getUsersByRole(String roleId, int page, int limit);

	UserDto getUserByEmail(String email);

	UserDto getUserByExternalId(String id);

	UserDto updateUser(String id, UserDto userDetails);

	void deleteUser(String id);
}
