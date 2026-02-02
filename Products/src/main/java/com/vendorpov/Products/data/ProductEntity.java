package com.vendorpov.Products.data;

import java.util.Set;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "products")
public class ProductEntity extends BaseEntity {

	private static final long serialVersionUID = 5807974061282671674L;
	@Column(unique = true, length = 50, nullable = false)
	private String name;
	@Column
	private String description;
	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "brand_id", referencedColumnName = "externalId", nullable = false)
	private BrandEntity brand;
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.LAZY)
	@JoinTable(name = "product_tag_assignments", joinColumns = @JoinColumn(name = "product_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "product_tag_id", referencedColumnName = "id"))
	private Set<ProductTagEntity> productTags;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductAttributeEntity> productAttributes;
	@OneToMany(mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductVariantEntity> productVariants;

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

	public BrandEntity getBrand() {
		return brand;
	}

	public void setBrand(BrandEntity brand) {
		this.brand = brand;
	}

	public Set<ProductTagEntity> getProductTags() {
		return productTags;
	}

	public void setProductTags(Set<ProductTagEntity> productTags) {
		this.productTags = productTags;
	}

	public Set<ProductAttributeEntity> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(Set<ProductAttributeEntity> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public Set<ProductVariantEntity> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(Set<ProductVariantEntity> productVariants) {
		this.productVariants = productVariants;
	}

}
