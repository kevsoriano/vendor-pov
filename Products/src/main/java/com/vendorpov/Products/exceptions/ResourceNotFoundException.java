package com.vendorpov.Products.exceptions;

public class ResourceNotFoundException extends RuntimeException {

	private static final long serialVersionUID = 5562328754565380392L;

	public ResourceNotFoundException(String message) {
		super(message);
	}
}
