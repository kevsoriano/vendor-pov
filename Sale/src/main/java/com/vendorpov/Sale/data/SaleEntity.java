package com.vendorpov.Sale.data;

import java.time.Instant;
import java.util.List;

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
	@Column(nullable=false)
	private String outletId;
	@Column(name = "sale_date", nullable = false, columnDefinition = "TIMESTAMP WITH TIME ZONE")
	private Instant saleDate;

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

	public String getOutletId() {
		return outletId;
	}

	public void setOutletId(String outletId) {
		this.outletId = outletId;
	}

	public Instant getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Instant saleDate) {
		this.saleDate = saleDate;
	}

}