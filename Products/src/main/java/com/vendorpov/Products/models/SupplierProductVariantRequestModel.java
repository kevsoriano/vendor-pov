package com.vendorpov.Products.models;

import java.math.BigDecimal;

public class SupplierProductVariantRequestModel {

	private SupplierRequestModel supplier;
	private BigDecimal supplierPrice;

	public SupplierRequestModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierRequestModel supplier) {
		this.supplier = supplier;
	}

	public BigDecimal getSupplierPrice() {
		return supplierPrice;
	}

	public void setSupplierPrice(BigDecimal supplierPrice) {
		this.supplierPrice = supplierPrice;
	}
}
