package com.vendorpov.User.models;

import java.util.List;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UserRequestModel {
	@NotEmpty(message = "first name cannot be empty")
	@Size(min = 2, message = "first name must be greater than or equal to 2 characters")
	private String firstName;
	@NotEmpty(message = "last name cannot be empty")
	@Size(min = 2, message = "last name must be greater than or equal to 2 characters")
	private String lastName;
	@NotEmpty(message = "email cannot be empty")
	@Email
	private String email;
	@NotEmpty(message = "password cannot be empty")
	@Size(min = 8, max = 16, message = "password must be greater than or equal to 8 and less than 16 characters")
	private String password;
	private List<AddressDetailsModel> addresses;
	private List<RoleDetailsModel> roles;

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

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public List<AddressDetailsModel> getAddresses() {
		return addresses;
	}

	public void setAddresses(List<AddressDetailsModel> addresses) {
		this.addresses = addresses;
	}

	public List<RoleDetailsModel> getRoles() {
		return roles;
	}

	public void setRoles(List<RoleDetailsModel> roles) {
		this.roles = roles;
	}

}
