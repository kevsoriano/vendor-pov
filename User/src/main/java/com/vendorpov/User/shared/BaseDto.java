package com.vendorpov.User.shared;

import java.io.Serializable;

public abstract class BaseDto implements Serializable {
	private static final long serialVersionUID = -496787152642605L;
	private String id;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}
}
