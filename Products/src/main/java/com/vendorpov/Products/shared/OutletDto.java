package com.vendorpov.Products.shared;

import java.util.Set;

public class OutletDto extends BaseDto {

	private static final long serialVersionUID = -2662917872807890283L;
	private String name;
	private Set<InventoryDto> inventories;
	private Set<SaleDto> sales;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<InventoryDto> getInventories() {
		return inventories;
	}

	public void setInventories(Set<InventoryDto> inventories) {
		this.inventories = inventories;
	}

	public Set<SaleDto> getSales() {
		return sales;
	}

	public void setSales(Set<SaleDto> sales) {
		this.sales = sales;
	}

}