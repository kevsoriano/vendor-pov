package com.vendorpov.Products.shared;

import java.time.Instant;
import java.util.Set;

public class ProductVariantDto extends BaseDto {

	private static final long serialVersionUID = 6703134141545020761L;
	private String variantSku;
	private Set<ProductAttributeDto> productAttributes;
	private Set<SupplierProductVariantDto> supplierProductVariants;
	private Set<InventoryDto> inventories;
	private ProductDto product;
	private Instant createdOn;
	private Instant lastUpdatedOn;

	public String getVariantSku() {
		return variantSku;
	}

	public void setVariantSku(String variantSku) {
		this.variantSku = variantSku;
	}

	public Set<ProductAttributeDto> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(Set<ProductAttributeDto> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public Set<SupplierProductVariantDto> getSupplierProductVariants() {
		return supplierProductVariants;
	}

	public void setSupplierProductVariants(Set<SupplierProductVariantDto> supplierProductVariants) {
		this.supplierProductVariants = supplierProductVariants;
	}

	public Set<InventoryDto> getInventories() {
		return inventories;
	}

	public void setInventories(Set<InventoryDto> inventories) {
		this.inventories = inventories;
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