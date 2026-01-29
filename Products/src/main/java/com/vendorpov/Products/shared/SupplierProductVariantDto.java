package com.vendorpov.Products.shared;

import java.io.Serializable;
import java.math.BigDecimal;

public class SupplierProductVariantDto implements Serializable {

	private static final long serialVersionUID = -6458634379518346695L;
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