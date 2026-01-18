package com.vendorpov.User.shared;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.Currency;

public class UserDto extends BaseDto {

	private static final long serialVersionUID = -3019261670280233161L;
	private String id;
	private String firstName;
	private String lastName;
	private String email;
	private String password;
	private String encryptedPassword;
	private BigDecimal dailyTarget;
	private BigDecimal weeklyTarget;
	private BigDecimal monthlyTarget;
	private Currency currency;
	private Collection<AddressDto> addresses;
	private Collection<RoleDto> roles;

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

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getEncryptedPassword() {
		return encryptedPassword;
	}

	public void setEncryptedPassword(String encryptedPassword) {
		this.encryptedPassword = encryptedPassword;
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

	public Collection<AddressDto> getAddresses() {
		return addresses;
	}

	public void setAddresses(Collection<AddressDto> addresses) {
		this.addresses = addresses;
	}

	public Collection<RoleDto> getRoles() {
		return roles;
	}

	public void setRoles(Collection<RoleDto> roles) {
		this.roles = roles;
	}

}
