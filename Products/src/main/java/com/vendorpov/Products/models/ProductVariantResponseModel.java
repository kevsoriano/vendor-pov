package com.vendorpov.Products.models;

import java.util.List;

public class ProductVariantResponseModel {

	private String variantSku;
	private List<ProductAttributeResponseModel> productAttributes;
	private List<SupplierProductVariantResponseModel> supplierProductVariants;
	private List<InventoryRequestModel> inventory;

	public String getVariantSku() {
		return variantSku;
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

	public List<InventoryRequestModel> getInventory() {
		return inventory;
	}

	public void setInventory(List<InventoryRequestModel> inventory) {
		this.inventory = inventory;
	}

}
