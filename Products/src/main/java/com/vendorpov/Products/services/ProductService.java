package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.ProductDto;

public interface ProductService {
	ProductDto createProduct(ProductDto productDetails);
	List<ProductDto> getProducts(int page, int limit);
	ProductDto getProductByExternalId(String id);
	ProductDto updateProduct(String id, ProductDto productDetails);
	void deleteProduct(String id);
}
