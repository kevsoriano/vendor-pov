package com.vendorpov.Products.models;

public class InventoryRequestModel {
	private int quantity;
	private int reorderThreshold;
	private int reorderQty;
	private OutletRequestModel outlet;
	private SupplierRequestModel supplier;

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

	public OutletRequestModel getOutlet() {
		return outlet;
	}

	public void setOutlet(OutletRequestModel outlet) {
		this.outlet = outlet;
	}

	public SupplierRequestModel getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierRequestModel supplier) {
		this.supplier = supplier;
	}

}
