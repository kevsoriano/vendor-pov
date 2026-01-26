package com.vendorpov.Products.data;

import java.time.Instant;
import java.util.List;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity(name = "suppliers")
public class SupplierEntity extends BaseEntity {

	private static final long serialVersionUID = 5027515860634704602L;
	@Column(length = 50, nullable = false)
	private String name;
	@Column(length = 100, nullable = false)
	private String description;
	@OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<SupplierProductVariantEntity> supplierProductVariant;
	@OneToMany(mappedBy = "supplier", cascade = CascadeType.ALL, orphanRemoval = true)
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<SupplierProductVariantEntity> getSupplierProductVariant() {
		return supplierProductVariant;
	}

	public void setSupplierProductVariant(Set<SupplierProductVariantEntity> supplierProductVariant) {
		this.supplierProductVariant = supplierProductVariant;
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
