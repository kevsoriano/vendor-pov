package com.vendorpov.User.exceptions;

public class UserServiceException extends RuntimeException {

	private static final long serialVersionUID = 5562328754565380392L;

	public UserServiceException(String message) {
		super(message);
	}
}
