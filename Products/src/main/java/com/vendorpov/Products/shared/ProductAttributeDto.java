package com.vendorpov.Products.shared;

import java.io.Serializable;
import java.util.List;

public class ProductAttributeDto implements Serializable {

	private static final long serialVersionUID = 1606648737691142644L;
	private long id;
	private String productAttributeId;
	private String attributeKey;
	private String attributeValue;
	private ProductDto product;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductAttributeId() {
		return productAttributeId;
	}

	public void setProductAttributeId(String productAttributeId) {
		this.productAttributeId = productAttributeId;
	}

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

}
