package com.vendorpov.Products.shared;

import java.io.Serializable;

public class BrandDto implements Serializable {

	private static final long serialVersionUID = 2234171831608541056L;
	private long id;
	private String brandId;
	private String name;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getBrandId() {
		return brandId;
	}

	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
