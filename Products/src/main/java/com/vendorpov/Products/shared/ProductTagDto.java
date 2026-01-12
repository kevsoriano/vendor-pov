package com.vendorpov.Products.shared;

import java.util.List;

public class ProductTagDto extends BaseDto {

	private static final long serialVersionUID = 8998943347036010582L;
	private String name;
	private List<ProductDto> products;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<ProductDto> getProducts() {
		return products;
	}

	public void setProducts(List<ProductDto> products) {
		this.products = products;
	}

}
