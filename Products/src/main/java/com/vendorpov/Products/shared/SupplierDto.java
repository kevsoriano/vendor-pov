package com.vendorpov.Products.shared;

import java.io.Serializable;

public class SupplierDto implements Serializable {

	private static final long serialVersionUID = -5974382456613182285L;
	private String supplierId;
	private String name;

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

}
