package com.vendorpov.User.services;

import java.util.List;

import com.vendorpov.User.shared.AuthorityDto;

public interface AuthorityService {
	List<AuthorityDto> getAuthorities();
}
