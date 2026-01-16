package com.vendorpov.User.shared;

import java.util.Collection;

public class RoleDto extends BaseDto {

	private static final long serialVersionUID = 6713234421453163257L;
	private String id;
	private String name;
	private Collection<AuthorityDto> authorities;

	public RoleDto() {
	}

	public RoleDto(String name) {
		this.name = name;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Collection<AuthorityDto> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<AuthorityDto> authorities) {
		this.authorities = authorities;
	}

}
