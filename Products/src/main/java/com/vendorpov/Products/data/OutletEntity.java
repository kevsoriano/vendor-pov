package com.vendorpov.Products.data;

import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity(name = "outlets")
public class OutletEntity extends BaseEntity {

	private static final long serialVersionUID = -4935584647091561212L;
	@Column(unique = true, length = 50, nullable = false)
	private String name;
	@OneToMany(mappedBy = "outlet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InventoryEntity> inventories;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public List<InventoryEntity> getInventories() {
		return inventories;
	}

	public void setInventories(List<InventoryEntity> inventories) {
		this.inventories = inventories;
	}

}