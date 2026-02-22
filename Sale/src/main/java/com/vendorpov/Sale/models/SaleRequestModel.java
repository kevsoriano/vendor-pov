package com.vendorpov.Sale.models;

import java.time.Instant;
import java.util.List;

import com.vendorpov.Sale.shared.SaleLineItemDto;

public class SaleRequestModel {
	private double totalAmount;
	private double discountAmount;
	private List<SaleLineItemDto> saleLineItems;
	private String outletId;
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

	public List<SaleLineItemDto> getSaleLineItems() {
		return saleLineItems;
	}

	public void setSaleLineItems(List<SaleLineItemDto> saleLineItems) {
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
