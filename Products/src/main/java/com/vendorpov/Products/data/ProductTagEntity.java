package com.vendorpov.Products.data;

import java.util.Collection;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.ManyToMany;

@Entity(name = "product_tags")
public class ProductTagEntity extends BaseEntity {

	private static final long serialVersionUID = -8649464928233000439L;
	@Column(unique = true, length = 50, nullable = false)
	private String name;
	@ManyToMany(mappedBy = "productTags")
	private Collection<ProductEntity> products;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Collection<ProductEntity> getProducts() {
		return products;
	}

	public void setProducts(Collection<ProductEntity> products) {
		this.products = products;
	}
}