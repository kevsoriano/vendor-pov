package com.vendorpov.Products.data;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "products")
public class ProductEntity implements Serializable {

	private static final long serialVersionUID = 5807974061282671674L;

	@Id
	@GeneratedValue
	private long id;
	@Column(unique = true, nullable = false)
	private String productId;
	@Column(length = 50, nullable = false)
	private String name;
	@Column
	private String description;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductAttributeEntity> productAttributes;
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

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public List<ProductAttributeEntity> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeEntity> productAttributes) {
		this.productAttributes = productAttributes;
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
