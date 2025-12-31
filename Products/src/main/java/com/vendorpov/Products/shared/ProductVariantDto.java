package com.vendorpov.Products.shared;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

public class ProductVariantDto implements Serializable {

	private static final long serialVersionUID = 6703134141545020761L;
	private long id;
	private String productVariantId;
	private String variant_sku;
	private List<ProductAttributeDto> productAttributes;
	private ProductDto product;
	private Instant createdOn;
	private Instant lastUpdatedOn;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductVariantId() {
		return productVariantId;
	}

	public void setProductVariantId(String productVariantId) {
		this.productVariantId = productVariantId;
	}

	public String getVariant_sku() {
		return variant_sku;
	}

	public void setVariant_sku(String variant_sku) {
		this.variant_sku = variant_sku;
	}

	public List<ProductAttributeDto> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeDto> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
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
