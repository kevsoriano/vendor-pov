package com.vendorpov.Products.models;

import java.math.BigDecimal;
import java.util.List;

public class ProductVariantRequestModel {

	private String variantSku;
	private BigDecimal retailPrice;
	private BigDecimal taxRate;
	private List<ProductAttributeRequestModel> productAttributes;
	private List<SupplierProductVariantRequestModel> supplierProductVariants;
	private List<InventoryRequestModel> inventories;

	public String getVariantSku() {
		return variantSku;
	}

	public void setVariantSku(String variantSku) {
		this.variantSku = variantSku;
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

	public List<ProductAttributeRequestModel> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeRequestModel> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<SupplierProductVariantRequestModel> getSupplierProductVariants() {
		return supplierProductVariants;
	}

	public void setSupplierProductVariants(List<SupplierProductVariantRequestModel> supplierProductVariants) {
		this.supplierProductVariants = supplierProductVariants;
	}

	public List<InventoryRequestModel> getInventories() {
		return inventories;
	}

	public void setInventories(List<InventoryRequestModel> inventories) {
		this.inventories = inventories;
	}

}
