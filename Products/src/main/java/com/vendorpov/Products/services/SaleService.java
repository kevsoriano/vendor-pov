package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.SaleDto;

public interface SaleService {
	SaleDto createSale(SaleDto saleDetails);
	List<SaleDto> getSales(int page, int limit);
	SaleDto getSaleByExternalId(String id);
	SaleDto updateSale(String id, SaleDto saleDetails);
	void deleteSale(String id);
}
