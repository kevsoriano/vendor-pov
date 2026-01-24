package com.vendorpov.User.services;

import java.util.List;

import com.vendorpov.User.shared.RoleCountDto;
import com.vendorpov.User.shared.RoleDto;

public interface RoleService {
	RoleDto createRole(RoleDto roleDetails);

	List<RoleDto> getRoles(int page, int limit);

	List<RoleCountDto> getRolesWithUserCount(int page, int limit);

	RoleDto getRoleByExternalId(String id);

	RoleDto updateRole(String id, RoleDto roleDetails);

	void deleteRole(String id);

}
