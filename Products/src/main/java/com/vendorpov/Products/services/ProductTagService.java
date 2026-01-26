package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.ProductTagDto;

public interface ProductTagService {
	ProductTagDto createProductTag(ProductTagDto productTagDetails);
	List<ProductTagDto> getProductTags(int page, int limit);
	List<ProductTagDto> getProductTagsWithProductCount(int page, int limit);
	ProductTagDto getProductTagByExternalId(String id);
	ProductTagDto updateProductTag(String id, ProductTagDto productTagDetails);
	void deleteProductTag(String id);
}
