package com.vendorpov.Products.models;

import java.util.List;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class ProductRequestModel {
	@NotEmpty(message = "name cannot be empty")
	@Size(min = 2, message = "name must be greater than or equal to 2 characters")
	private String name;
	private String description;
	private List<ProductAttributeRequestModel> productAttributes;

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

	public List<ProductAttributeRequestModel> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeRequestModel> productAttributes) {
		this.productAttributes = productAttributes;
	}

}
