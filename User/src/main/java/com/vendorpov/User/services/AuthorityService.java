package com.vendorpov.User.services;

import java.util.List;

import com.vendorpov.User.shared.AuthorityDto;

public interface AuthorityService {
	AuthorityDto createAuthority(AuthorityDto authorityDetails);
	List<AuthorityDto> getAuthorities(int page, int limit);
	AuthorityDto getAuthorityByExternalId(String id);
	AuthorityDto updateAuthority(String id, AuthorityDto authorityDetails);
	void deleteAuthority(String id);
}
