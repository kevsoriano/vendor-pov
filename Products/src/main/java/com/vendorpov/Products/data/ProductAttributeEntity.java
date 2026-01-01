package com.vendorpov.Products.data;

import java.io.Serializable;
import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
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
	@ManyToOne
	@JoinColumn(name = "product_id")
	private ProductEntity product;
	@ManyToMany(mappedBy = "productAttributes")
	private Collection<ProductVariantEntity> productVariants;

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

	public Collection<ProductVariantEntity> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(Collection<ProductVariantEntity> productVariants) {
		this.productVariants = productVariants;
	}

}
