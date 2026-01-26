package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.ProductVariantCountDto;
import com.vendorpov.Products.shared.SupplierDto;

public interface SupplierService {
	SupplierDto createSupplier(SupplierDto supplierDetails);
	List<SupplierDto> getSuppliers(int page, int limit);
	List<ProductVariantCountDto> getSuppliersWithProductCount(int page, int limit);
	SupplierDto getSupplierByExternalId(String id);
	SupplierDto updateSupplier(String id, SupplierDto supplierDetails);
	void deleteSupplier(String id);
}
