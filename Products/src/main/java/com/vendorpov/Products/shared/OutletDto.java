package com.vendorpov.Products.shared;

import java.io.Serializable;
import java.util.List;

public class OutletDto implements Serializable {

	private static final long serialVersionUID = -2662917872807890283L;
	private long id;
	private String outletId;
	private String name;
	private List<InventoryDto> inventories;

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public String getOutletId() {
		return outletId;
	}

	public void setOutletId(String outletId) {
		this.outletId = outletId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<InventoryDto> getInventories() {
		return inventories;
	}

	public void setInventories(List<InventoryDto> inventories) {
		this.inventories = inventories;
	}

}
