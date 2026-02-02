package com.vendorpov.Products.shared;

import java.time.Instant;
import java.util.Set;

public class ProductDto extends BaseDto {

	private static final long serialVersionUID = -2800386597500305630L;
	private String name;
	private String description;
	private BrandDto brand;
	private Set<ProductTagDto> productTags;
	private Set<ProductAttributeDto> productAttributes;
	private Set<ProductVariantDto> productVariants;
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

	public Set<ProductTagDto> getProductTags() {
		return productTags;
	}

	public void setProductTags(Set<ProductTagDto> productTags) {
		this.productTags = productTags;
	}

	public Set<ProductAttributeDto> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(Set<ProductAttributeDto> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public Set<ProductVariantDto> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(Set<ProductVariantDto> productVariants) {
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
