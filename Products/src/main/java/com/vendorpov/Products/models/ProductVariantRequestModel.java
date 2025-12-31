package com.vendorpov.Products.models;

import java.util.List;

public class ProductVariantRequestModel {

	private String variant_sku;
	private List<ProductAttributeRequestModel> productAttributes;

	public String getVariant_sku() {
		return variant_sku;
	}

	public void setVariant_sku(String variant_sku) {
		this.variant_sku = variant_sku;
	}

	public List<ProductAttributeRequestModel> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeRequestModel> productAttributes) {
		this.productAttributes = productAttributes;
	}

}
