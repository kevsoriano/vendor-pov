package com.vendorpov.Products.models;

public class InventoryResponseModel {
	private int quantity;
	private int reorderThreshold;
	private int reorderQty;
	private OutletResponseModel outlet;
	private SupplierResponseModel supplier;

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

	public OutletResponseModel getOutlet() {
		return outlet;
	}

	public void setOutlet(OutletResponseModel outlet) {
		this.outlet = outlet;
	}

	public SupplierResponseModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierResponseModel supplier) {
		this.supplier = supplier;
	}

}
