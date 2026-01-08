package com.vendorpov.Products.models;

import java.math.BigDecimal;

public class SupplierProductVariantResponseModel {
	private SupplierResponseModel supplier;
	private BigDecimal supplierPrice;
	private BigDecimal taxRate;

	public SupplierResponseModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierResponseModel supplier) {
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
