package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.ProductDto;

public interface ProductService {
	ProductDto createProduct(ProductDto productDetails);
	List<ProductDto> getProducts(int page, int limit);
	ProductDto getProductByProductId(String productId);
	ProductDto updateProduct(String productId, ProductDto productDetails);
	void deleteProduct(String productId);
}
