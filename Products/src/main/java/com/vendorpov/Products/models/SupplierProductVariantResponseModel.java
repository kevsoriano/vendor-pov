package com.vendorpov.Products.models;

import java.math.BigDecimal;

import com.vendorpov.Products.shared.SupplierDto;

public class SupplierProductVariantResponseModel {
	private SupplierDto supplier;
	private BigDecimal supplierPrice;
	private BigDecimal taxRate;

	public SupplierDto getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierDto supplier) {
		this.supplier = supplier;
	}

	public BigDecimal getSupplierPrice() {
		return supplierPrice;
	}

	public void setSupplierPrice(BigDecimal supplierPrice) {
		this.supplierPrice = supplierPrice;
	}

	public BigDecimal getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(BigDecimal taxRate) {
		this.taxRate = taxRate;
	}

}
