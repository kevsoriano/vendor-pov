package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.BrandDto;

public interface BrandService {

	List<BrandDto> getBrands(int page, int limit);
	BrandDto createBrand(BrandDto brandDetails);
	BrandDto getBrandByBrandId(String brandId);
	BrandDto updateBrand(String brandId, BrandDto brandDetails);
	void deleteBrand(String brandId);
}
