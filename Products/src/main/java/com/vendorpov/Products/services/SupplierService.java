package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.SupplierDto;

public interface SupplierService {
	SupplierDto createSupplier(SupplierDto supplierDetails);
	List<SupplierDto> getSuppliers(int page, int limit);
	SupplierDto getSupplier(String name);
	SupplierDto updateSupplier(String supplierId, SupplierDto supplierDetails);
	void deleteSupplier(String supplierId);
}
