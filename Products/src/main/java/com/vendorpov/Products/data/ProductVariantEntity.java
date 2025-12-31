package com.vendorpov.Products.data;

import java.io.Serializable;
import java.time.Instant;
import java.util.Collection;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;

@Entity(name = "product_variants")
public class ProductVariantEntity implements Serializable {

	private static final long serialVersionUID = 6804025714291183439L;

	@Id
	@GeneratedValue
	private long id;
	@Column(unique = true, nullable = false)
	private String productVariantId;
	@Column(length = 50, nullable = false)
	private String variant_sku;
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
	@JoinTable(
		name = "product_variant_attributes", 
		joinColumns = @JoinColumn(name = "product_variant_id", referencedColumnName = "id"), 
		inverseJoinColumns = @JoinColumn(name = "product_attribute_id", referencedColumnName = "id"
	))
	private Collection<ProductAttributeEntity> productAttributes;
	@ManyToOne
	@JoinColumn(name = "product_id")
	private ProductEntity product;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductVariantId() {
		return productVariantId;
	}

	public void setProductVariantId(String productVariantId) {
		this.productVariantId = productVariantId;
	}

	public String getVariant_sku() {
		return variant_sku;
	}

	public void setVariant_sku(String variant_sku) {
		this.variant_sku = variant_sku;
	}

	public Collection<ProductAttributeEntity> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(Collection<ProductAttributeEntity> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
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
