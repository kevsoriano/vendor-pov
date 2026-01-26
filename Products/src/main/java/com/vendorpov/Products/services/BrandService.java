package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.BrandDto;
import com.vendorpov.Products.shared.ProductCountDto;

public interface BrandService {

	List<BrandDto> getBrands(int page, int limit);
	BrandDto createBrand(BrandDto brandDetails);
	BrandDto getBrandByExternalId(String id);
	List<ProductCountDto> getBrandsWithProductCount(int page, int limit);
	BrandDto updateBrand(String id, BrandDto brandDetails);
	void deleteBrand(String id);
}
