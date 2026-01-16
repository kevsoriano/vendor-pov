package com.vendorpov.User.models;

import java.util.Collection;

public class RoleRequestModel {
	private String id;
	private String name;
	private Collection<AuthorityRequestModel> authorities;

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

	public Collection<AuthorityRequestModel> getAuthorities() {
		return authorities;
	}

	public void setAuthorities(Collection<AuthorityRequestModel> authorities) {
		this.authorities = authorities;
	}

}
