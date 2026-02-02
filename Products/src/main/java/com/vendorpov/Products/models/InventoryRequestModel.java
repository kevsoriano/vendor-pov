package com.vendorpov.Products.models;

import com.vendorpov.Products.shared.OutletDto;
import com.vendorpov.Products.shared.SupplierDto;

public class InventoryRequestModel {
	private int quantity;
	private int reorderThreshold;
	private int reorderQty;
	private OutletDto outlet;
	private SupplierDto supplier;

	public int getQuantity() {
		return quantity;
	}

	public void setQuantity(int quantity) {
		this.quantity = quantity;
	}

	public int getReorderThreshold() {
		return reorderThreshold;
	}

	public void setReorderThreshold(int reorderThreshold) {
		this.reorderThreshold = reorderThreshold;
	}

	public int getReorderQty() {
		return reorderQty;
	}

	public void setReorderQty(int reorderQty) {
		this.reorderQty = reorderQty;
	}

	public OutletDto getOutlet() {
		return outlet;
	}

	public void setOutlet(OutletDto outlet) {
		this.outlet = outlet;
	}

	public SupplierDto getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierDto supplier) {
		this.supplier = supplier;
	}

}
