package com.vendorpov.Products.models;

import java.math.BigDecimal;

public class SupplierProductVariantResponseModel {
	private SupplierResponseModel supplier;
	private BigDecimal supplierPrice;

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

}
