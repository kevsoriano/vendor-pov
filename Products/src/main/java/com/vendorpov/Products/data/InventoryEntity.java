package com.vendorpov.Products.data;

import java.io.Serializable;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "inventories")
public class InventoryEntity implements Serializable {

	private static final long serialVersionUID = 2649331727143313914L;
	@Id
	@GeneratedValue
	private long id;
	private int quantity;
	private int reorderThreshold;
	private int reorderQty;
	@ManyToOne
	@JoinColumn(name = "outlet_id")
	private OutletEntity outlet;
	@ManyToOne
	@JoinColumn(name = "supplier_id")
	private SupplierEntity supplier;
	@ManyToOne
	@JoinColumn(name = "product__variant_id")
	private ProductVariantEntity productVariant;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

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

	public OutletEntity getOutlet() {
		return outlet;
	}

	public void setOutlet(OutletEntity outlet) {
		this.outlet = outlet;
	}

	public SupplierEntity getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierEntity supplier) {
		this.supplier = supplier;
	}

	public ProductVariantEntity getProductVariant() {
		return productVariant;
	}

	public void setProductVariant(ProductVariantEntity productVariant) {
		this.productVariant = productVariant;
	}

}
