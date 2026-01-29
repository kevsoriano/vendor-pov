package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.ProductTagDto;

public interface ProductTagService {
	List<ProductTagDto> getProductTags(int page, int limit);
	ProductTagDto createProductTag(ProductTagDto productTagDetails);
	ProductTagDto getProductTagByExternalId(String id);
//	List<ProductCountDto> getProductTagWithProductCount(int page, int limit);
	ProductTagDto updateProductTag(String id, ProductTagDto productTagDetails);
	void deleteProductTag(String id);
}
