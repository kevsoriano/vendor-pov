package com.vendorpov.User.models;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Currency;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class UpdateUserRequestModel {
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
	private BigDecimal dailyTarget;
	private BigDecimal weeklyTarget;
	private BigDecimal monthlyTarget;
	private Currency currency;
	@Valid // Validate each address too
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

	public BigDecimal getDailyTarget() {
		return dailyTarget;
	}

	public void setDailyTarget(BigDecimal dailyTarget) {
		this.dailyTarget = dailyTarget;
	}

	public BigDecimal getWeeklyTarget() {
		return weeklyTarget;
	}

	public void setWeeklyTarget(BigDecimal weeklyTarget) {
		this.weeklyTarget = weeklyTarget;
	}

	public BigDecimal getMonthlyTarget() {
		return monthlyTarget;
	}

	public void setMonthlyTarget(BigDecimal monthlyTarget) {
		this.monthlyTarget = monthlyTarget;
	}

	public Currency getCurrency() {
		return currency;
	}

	public void setCurrency(Currency currency) {
		this.currency = currency;
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
