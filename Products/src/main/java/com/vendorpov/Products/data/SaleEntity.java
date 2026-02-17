package com.vendorpov.Products.data;

import java.time.Instant;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;

@Entity(name = "sales")
public class SaleEntity extends BaseEntity {

	private static final long serialVersionUID = -2152902082737927802L;
	@Column
	private double totalAmount;
	@Column
	private double discountAmount;
	@OneToMany(mappedBy = "sale", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SaleLineItemEntity> saleLineItems;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

	public double getTotalAmount() {
		return totalAmount;
	}

	public void setTotalAmount(double totalAmount) {
		this.totalAmount = totalAmount;
	}

	public double getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(double discountAmount) {
		this.discountAmount = discountAmount;
	}

	public List<SaleLineItemEntity> getSaleLineItems() {
		return saleLineItems;
	}

	public void setSaleLineItems(List<SaleLineItemEntity> saleLineItems) {
		this.saleLineItems = saleLineItems;
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