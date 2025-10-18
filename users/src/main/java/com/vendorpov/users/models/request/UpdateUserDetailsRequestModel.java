package com.vendorpov.users.models.request;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UpdateUserDetailsRequestModel {
	@NotEmpty(message = "first name cannot be empty")
	@Size(min = 2, message = "first name must be greater than or equal to 2 characters")
	private String firstName;
	@NotEmpty(message = "last name cannot be empty")
	@Size(min = 2, message = "last name must be greater than or equal to 2 characters")
	private String lastName;

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

}
