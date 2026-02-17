package com.vendorpov.Products.models;

import java.math.BigDecimal;
import java.util.List;

public class ProductVariantResponseModel {
	private String id;
	private String variantSku;
	private BigDecimal retailPrice;
	private BigDecimal taxRate;
	private List<ProductAttributeResponseModel> productAttributes;
	private List<SupplierProductVariantResponseModel> supplierProductVariants;
	private List<InventoryRequestModel> inventories;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getVariantSku() {
		return variantSku;
	}

	public BigDecimal getRetailPrice() {
		return retailPrice;
	}

	public void setRetailPrice(BigDecimal retailPrice) {
		this.retailPrice = retailPrice;
	}

	public BigDecimal getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(BigDecimal taxRate) {
		this.taxRate = taxRate;
	}

	public void setVariantSku(String variantSku) {
		this.variantSku = variantSku;
	}

	public List<ProductAttributeResponseModel> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeResponseModel> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<SupplierProductVariantResponseModel> getSupplierProductVariants() {
		return supplierProductVariants;
	}

	public void setSupplierProductVariants(List<SupplierProductVariantResponseModel> supplierProductVariants) {
		this.supplierProductVariants = supplierProductVariants;
	}

	public List<InventoryRequestModel> getInventories() {
		return inventories;
	}

	public void setInventories(List<InventoryRequestModel> inventories) {
		this.inventories = inventories;
	}

}
