package com.vendorpov.Products.shared;

import java.time.Instant;
import java.util.List;

public class ProductVariantDto extends BaseDto {

	private static final long serialVersionUID = 6703134141545020761L;
	private String variantSku;
	private List<ProductAttributeDto> productAttributes;
	private List<SupplierProductVariantDto> supplierProductVariants;
	private List<InventoryDto> inventories;
	private ProductDto product;
	private Instant createdOn;
	private Instant lastUpdatedOn;

	public String getVariantSku() {
		return variantSku;
	}

	public void setVariantSku(String variantSku) {
		this.variantSku = variantSku;
	}

	public List<ProductAttributeDto> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeDto> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<SupplierProductVariantDto> getSupplierProductVariants() {
		return supplierProductVariants;
	}

	public void setSupplierProductVariants(List<SupplierProductVariantDto> supplierProductVariants) {
		this.supplierProductVariants = supplierProductVariants;
	}

	public List<InventoryDto> getInventories() {
		return inventories;
	}

	public void setInventories(List<InventoryDto> inventories) {
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