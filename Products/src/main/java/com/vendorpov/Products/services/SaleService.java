package com.vendorpov.Products.services;

import java.util.List;

import com.vendorpov.Products.shared.SaleDto;

public interface SaleService {
	SaleDto createSale(SaleDto saleDetails);
	List<SaleDto> getSales(int page, int limit);
	SaleDto getSaleBySaleId(String saleId);
	SaleDto updateSale(String productId, SaleDto saleDetails);
	void deleteSale(String saleId);
}
