package com.vendorpov.Products.shared;

import java.time.Instant;
import java.util.List;

public class ProductDto extends BaseDto {

	private static final long serialVersionUID = -2800386597500305630L;
	private String name;
	private String description;
	private BrandDto brand;
	private List<ProductTagDto> productTags;
	private List<ProductAttributeDto> productAttributes;
	private List<ProductVariantDto> productVariants;
	private Instant createdOn;
	private Instant lastUpdatedOn;

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

	public List<ProductAttributeDto> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeDto> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<ProductVariantDto> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(List<ProductVariantDto> productVariants) {
		this.productVariants = productVariants;
	}

	public Instant getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Instant createdOn) {
		this.createdOn = createdOn;
	}

	public Instant getLastUpdatedOn() {
		return lastUpdatedOn;
	}

	public void setLastUpdatedOn(Instant lastUpdatedOn) {
		this.lastUpdatedOn = lastUpdatedOn;
	}

}
