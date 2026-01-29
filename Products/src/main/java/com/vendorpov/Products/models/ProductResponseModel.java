package com.vendorpov.Products.models;

import java.util.List;

public class ProductResponseModel {
	private String id;
	private String name;
	private String description;
	private BrandResponseModel brand;
	private List<ProductTagResponseModel> productTags;
	private List<ProductAttributeResponseModel> productAttributes;
	private List<ProductVariantResponseModel> productVariants;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
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

	public BrandResponseModel getBrand() {
		return brand;
	}

	public void setBrand(BrandResponseModel brand) {
		this.brand = brand;
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
