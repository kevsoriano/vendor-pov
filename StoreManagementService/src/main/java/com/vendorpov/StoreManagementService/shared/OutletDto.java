package com.vendorpov.StoreManagementService.shared;

public class OutletDto extends BaseDto {

	private static final long serialVersionUID = -2662917872807890283L;
	private String name;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

//	public Set<InventoryDto> getInventories() {
//		return inventories;
//	}
//
//	public void setInventories(Set<InventoryDto> inventories) {
//		this.inventories = inventories;
//	}

}