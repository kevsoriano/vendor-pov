package com.vendorpov.User.models;

import java.math.BigDecimal;
import java.util.Currency;
import java.util.Set;

public class UserResponseModel {
	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private BigDecimal dailyTarget;
	private BigDecimal weeklyTarget;
	private BigDecimal monthlyTarget;
	private Currency currency;
	private Set<AddressResponseModel> addresses;
	private Set<RoleResponseModel> roles;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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

	public Set<AddressResponseModel> getAddresses() {
		return addresses;
	}

	public void setAddresses(Set<AddressResponseModel> addresses) {
		this.addresses = addresses;
	}

	public Set<RoleResponseModel> getRoles() {
		return roles;
	}

	public void setRoles(Set<RoleResponseModel> roles) {
		this.roles = roles;
	}

}
