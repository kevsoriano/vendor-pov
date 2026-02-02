package com.vendorpov.Products.data;

import java.util.Set;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.OneToMany;

@Entity(name = "brands")
public class BrandEntity extends BaseEntity {

	private static final long serialVersionUID = 8950907501509756560L;
	@Column(unique = true, length = 50, nullable = false)
	private String name;
	@Column(length = 100, nullable = false)
	private String description;
	@OneToMany(mappedBy = "brand", fetch = FetchType.LAZY)
	private Set<ProductEntity> products;

	// Helper method to maintain bidirectional integrity
	public void addProduct(ProductEntity product) {
		products.add(product);
		product.setBrand(this);
	}

	public void removeProduct(ProductEntity product) {
		products.remove(product);
		product.setBrand(null);
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

	public Set<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductEntity> products) {
		this.products = products;
	}

}
