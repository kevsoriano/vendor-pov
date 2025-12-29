package com.vendorpov.Products.data;

import java.io.Serializable;
import java.util.List;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "product_attributes")
public class ProductAttributeEntity implements Serializable {
	private static final long serialVersionUID = -8950982025320674390L;
	@Id
	@GeneratedValue
	private long id;
	@Column(unique = true, nullable = false)
	private String productAttributeId;
	@Column
	private String attributeKey;
	@Column
	private String attributeValue;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private ProductEntity product;

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

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
		this.product = product;
	}

}
