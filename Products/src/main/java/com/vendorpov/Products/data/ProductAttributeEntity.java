package com.vendorpov.Products.data;

import java.time.Instant;
import java.util.Collection;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity(name = "product_attributes")
public class ProductAttributeEntity extends BaseEntity {
	private static final long serialVersionUID = -8950982025320674390L;
	@Column
	private String attributeKey;
	@Column
	private String attributeValue;
	@ManyToOne
	@JoinColumn(name = "product_id")
	private ProductEntity product;
	@ManyToMany(mappedBy = "productAttributes")
	private Collection<ProductVariantEntity> productVariants;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

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