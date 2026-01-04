package com.vendorpov.Products.models;

import java.util.List;

public class ProductResponseModel {
	private String productId;
	private String name;
	private String description;
	private List<ProductTagResponseModel> productTags;
	private List<ProductAttributeResponseModel> productAttributes;
	private List<ProductVariantResponseModel> productVariants;

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

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

	public List<ProductTagResponseModel> getProductTags() {
		return productTags;
	}

	public void setProductTags(List<ProductTagResponseModel> productTags) {
		this.productTags = productTags;
	}

	public List<ProductAttributeResponseModel> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeResponseModel> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<ProductVariantResponseModel> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(List<ProductVariantResponseModel> productVariants) {
		this.productVariants = productVariants;
	}

}
