package com.vendorpov.Products.data;

import java.io.Serializable;
import java.util.Collection;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;

@Entity(name = "product_tags")
public class ProductTagEntity implements Serializable {

	private static final long serialVersionUID = -8649464928233000439L;
	@Id
	@GeneratedValue
	private long id;
	private String productTagId;
	private String name;
	@ManyToMany(mappedBy = "productTags")
	private Collection<ProductEntity> products;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getProductTagId() {
		return productTagId;
	}

	public void setProductTagId(String productTagId) {
		this.productTagId = productTagId;
	}

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
