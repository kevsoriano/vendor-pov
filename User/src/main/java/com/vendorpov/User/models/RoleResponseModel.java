package com.vendorpov.User.models;

import java.util.Collection;

public class RoleResponseModel {
	private String id;
	private String name;
	private Collection<AuthorityResponseModel> authorities;

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

	public Collection<AuthorityResponseModel> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<AuthorityResponseModel> authorities) {
		this.authorities = authorities;
	}

}
