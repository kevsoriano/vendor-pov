package com.vendorpov.Products.models;

import java.util.List;

import com.vendorpov.Products.data.ProductType;

public class ProductResponseModel {
	private String id;
	private String name;
	private String description;
//	private BrandDto brand;
	private ProductType productType;
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

//	public BrandDto getBrand() {
//		return brand;
//	}
//
//	public void setBrand(BrandDto brand) {
//		this.brand = brand;
//	}

	public List<ProductTagResponseModel> getProductTags() {
		return productTags;
	}

	public ProductType getProductType() {
		return productType;
	}

	public void setProductType(ProductType productType) {
		this.productType = productType;
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
