package com.vendorpov.Products.shared;

public class SupplierDto extends BaseDto {

	private static final long serialVersionUID = -5974382456613182285L;
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