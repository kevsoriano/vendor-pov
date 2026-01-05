package com.vendorpov.Products.data;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "outlets")
public class OutletEntity implements Serializable {

	private static final long serialVersionUID = -4935584647091561212L;
	@Id
	@GeneratedValue
	private long id;
	private String outletId;
	private String name;
	@OneToMany(mappedBy = "outlet", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InventoryEntity> inventories;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

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
