package com.vendorpov.Products.data;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;

@Entity(name = "products")
public class ProductEntity extends BaseEntity {

	private static final long serialVersionUID = 5807974061282671674L;

	@Column(length = 50, nullable = false)
	private String name;
	@Column
	private String description;
//	@ManyToOne(cascade = CascadeType.PERSIST)
//	@JoinColumn(name = "brand_id")
//	private BrandEntity brand;
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
	@JoinTable(name = "product_tag_assignments", joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "product_tag_id", referencedColumnName = "id"))
	private Collection<ProductTagEntity> productTags;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductAttributeEntity> productAttributes;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<ProductVariantEntity> productVariants;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

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

//	public BrandEntity getBrand() {
//		return brand;
//	}
//
//	public void setBrand(BrandEntity brand) {
//		this.brand = brand;
//	}

	public Collection<ProductTagEntity> getProductTags() {
		return productTags;
	}

	public void setProductTags(Collection<ProductTagEntity> productTags) {
		this.productTags = productTags;
	}

	public List<ProductAttributeEntity> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(List<ProductAttributeEntity> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public List<ProductVariantEntity> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(List<ProductVariantEntity> productVariants) {
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
