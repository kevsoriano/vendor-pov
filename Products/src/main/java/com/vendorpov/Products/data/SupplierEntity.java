package com.vendorpov.Products.data;

import java.io.Serializable;
import java.time.Instant;
import java.util.Set;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;

@Entity(name = "suppliers")
public class SupplierEntity implements Serializable {

	private static final long serialVersionUID = 5027515860634704602L;
	@Id
	@GeneratedValue
	private long id;
	@Column(length = 100, nullable = false)
	private String supplierId;
	@Column(length = 50, nullable = false)
	private String name;
	@OneToMany(mappedBy = "supplier")
	private Set<SupplierProductVariantEntity> supplierProductVariant;
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

	public String getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(String supplierId) {
		this.supplierId = supplierId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Set<SupplierProductVariantEntity> getSupplierProductVariant() {
		return supplierProductVariant;
	}

	public void setSupplierProductVariant(Set<SupplierProductVariantEntity> supplierProductVariant) {
		this.supplierProductVariant = supplierProductVariant;
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
