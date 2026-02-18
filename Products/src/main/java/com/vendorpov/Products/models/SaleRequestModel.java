package com.vendorpov.Products.models;

import java.time.Instant;
import java.util.List;

import com.vendorpov.Products.shared.SaleLineItemDto;

public class SaleRequestModel {
	private double totalAmount;
	private double discountAmount;
	private List<SaleLineItemDto> saleLineItems;
	private OutletRequestModel outlet;
	private Instant saleDate;
	private Instant createdOn;
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

	public List<SaleLineItemDto> getSaleLineItems() {
		return saleLineItems;
	}

	public void setSaleLineItems(List<SaleLineItemDto> saleLineItems) {
		this.saleLineItems = saleLineItems;
	}

	public OutletRequestModel getOutlet() {
		return outlet;
	}

	public void setOutlet(OutletRequestModel outlet) {
		this.outlet = outlet;
	}

	public Instant getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Instant saleDate) {
		this.saleDate = saleDate;
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
