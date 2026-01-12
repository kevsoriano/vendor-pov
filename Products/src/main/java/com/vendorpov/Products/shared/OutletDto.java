package com.vendorpov.Products.shared;

import java.util.List;

public class OutletDto extends BaseDto {

	private static final long serialVersionUID = -2662917872807890283L;
	private String name;
	private List<InventoryDto> inventories;

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
