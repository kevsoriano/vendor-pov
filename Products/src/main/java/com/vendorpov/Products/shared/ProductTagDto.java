package com.vendorpov.Products.shared;

import java.util.Set;

public class ProductTagDto extends BaseDto {

	private static final long serialVersionUID = 8998943347036010582L;
	private String name;
	private Set<ProductDto> products;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<ProductDto> getProducts() {
		return products;
	}

	public void setProducts(Set<ProductDto> products) {
		this.products = products;
	}

}