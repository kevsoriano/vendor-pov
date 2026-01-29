//package com.vendorpov.Products.data;
//
//import java.time.Instant;
//import java.util.Set;
//
//import org.hibernate.annotations.CreationTimestamp;
//import org.hibernate.annotations.UpdateTimestamp;
//
//import jakarta.persistence.CascadeType;
//import jakarta.persistence.Column;
//import jakarta.persistence.Entity;
//import jakarta.persistence.OneToMany;
//
//@Entity(name = "brands")
//public class BrandEntity extends BaseEntity {
//
//	private static final long serialVersionUID = 8950907501509756560L;
//	@Column
//	private String name;
//	@Column(length = 100, nullable = false)
//	private String description;
//	@OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
//	private Set<ProductEntity> products;
//	@CreationTimestamp
//	private Instant createdOn;
//	@UpdateTimestamp
//	private Instant lastUpdatedOn;
//
//	public String getName() {
//		return name;
//	}
//
//	public void setName(String name) {
//		this.name = name;
//	}
//
//	public String getDescription() {
//		return description;
//	}
//
//	public void setDescription(String description) {
//		this.description = description;
//	}
//
//	public Set<ProductEntity> getProducts() {
//		return products;
//	}
//
//	public void setProducts(Set<ProductEntity> products) {
//		this.products = products;
//	}
//
//	public Instant getCreatedOn() {
//		return createdOn;
//	}
//
//	public void setCreatedOn(Instant createdOn) {
//		this.createdOn = createdOn;
//	}
//
//	public Instant getLastUpdatedOn() {
//		return lastUpdatedOn;
//	}
//
//	public void setLastUpdatedOn(Instant lastUpdatedOn) {
//		this.lastUpdatedOn = lastUpdatedOn;
//	}
//
//}
