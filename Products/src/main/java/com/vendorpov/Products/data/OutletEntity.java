package com.vendorpov.Products.data;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity(name = "outlets")
public class OutletEntity extends BaseEntity {

	private static final long serialVersionUID = -4935584647091561212L;
	private String name;
	@OneToMany(mappedBy = "outlet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InventoryEntity> inventories;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

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

	public Instant getCreatedOn() {
		return createdOn;
	}

	public void setCreatedOn(Instant createdOn) {
		this.createdOn = createdOn;
	}

	public Instant getLastUpdatedOn() {
		return lastUpdatedOn;
	}

	public void setLastUpdatedOn(Instant lastUpdatedOn) {
		this.lastUpdatedOn = lastUpdatedOn;
	}

}