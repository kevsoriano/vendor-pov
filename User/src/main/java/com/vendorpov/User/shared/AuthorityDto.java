package com.vendorpov.User.shared;

import java.io.Serializable;

public class AuthorityDto implements Serializable {

	private static final long serialVersionUID = -5964611193055753555L;
	private long id;
	private String name;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
