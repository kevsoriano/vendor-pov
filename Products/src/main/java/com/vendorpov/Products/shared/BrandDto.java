package com.vendorpov.Products.shared;

public class BrandDto extends BaseDto {

	private static final long serialVersionUID = 2234171831608541056L;
	private String name;
	private String description;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

}
