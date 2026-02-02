package com.vendorpov.Products.models;

import java.util.List;

import com.vendorpov.Products.shared.BrandDto;
import com.vendorpov.Products.shared.ProductTagDto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;

public class ProductRequestModel {
	@NotEmpty(message = "name cannot be empty")
	@Size(min = 2, message = "name must be greater than or equal to 2 characters")
	private String name;
	private String description;
	private BrandDto brand;
	private List<ProductTagDto> productTags;
	private List<ProductAttributeRequestModel> productAttributes;
	private List<ProductVariantRequestModel> productVariants;

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

	public BrandDto getBrand() {
		return brand;
	}

	public void setBrand(BrandDto brand) {
		this.brand = brand;
	}

	public List<ProductTagDto> getProductTags() {
		return productTags;
	}

	public void setProductTags(List<ProductTagDto> productTags) {
		this.productTags = productTags;
	}

	public List<ProductAttributeRequestModel> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeRequestModel> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<ProductVariantRequestModel> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(List<ProductVariantRequestModel> productVariants) {
		this.productVariants = productVariants;
	}

}
