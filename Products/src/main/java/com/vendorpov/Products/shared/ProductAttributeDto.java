package com.vendorpov.Products.shared;

import java.util.List;

public class ProductAttributeDto extends BaseDto {

	private static final long serialVersionUID = 1606648737691142644L;
	private String attributeKey;
	private String attributeValue;
	private ProductDto product;
	private List<ProductVariantDto> productVariants;

	public String getAttributeKey() {
		return attributeKey;
	}

	public void setAttributeKey(String attributeKey) {
		this.attributeKey = attributeKey;
	}

	public String getAttributeValue() {
		return attributeValue;
	}

	public void setAttributeValue(String attributeValue) {
		this.attributeValue = attributeValue;
	}

	public ProductDto getProduct() {
		return product;
	}

	public void setProduct(ProductDto product) {
		this.product = product;
	}

	public List<ProductVariantDto> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(List<ProductVariantDto> productVariants) {
		this.productVariants = productVariants;
	}

}
