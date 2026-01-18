package com.vendorpov.User.models;

import java.util.Collection;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UpdateUserRequestModel {
	@NotEmpty(message = "first name cannot be empty")
	@Size(min = 2, message = "first name must be greater than or equal to 2 characters")
	private String firstName;
	@NotEmpty(message = "last name cannot be empty")
	@Size(min = 2, message = "last name must be greater than or equal to 2 characters")
	private String lastName;
	private Collection<AddressRequestModel> addresses;
	private Collection<RoleRequestModel> roles;

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public Collection<AddressRequestModel> getAddresses() {
		return addresses;
	}

	public void setAddresses(Collection<AddressRequestModel> addresses) {
		this.addresses = addresses;
	}

	public Collection<RoleRequestModel> getRoles() {
		return roles;
	}

	public void setRoles(Collection<RoleRequestModel> roles) {
		this.roles = roles;
	}

}
