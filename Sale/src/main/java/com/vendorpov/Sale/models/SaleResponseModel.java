package com.vendorpov.Sale.models;

import java.time.Instant;
import java.util.List;

import com.vendorpov.Sale.shared.SaleLineItemDto;

public class SaleResponseModel {
	private String id;
	private double totalAmount;
	private double discountAmount;
	private List<SaleLineItemDto> saleLineItems;
	private OutletResponseModel outlet;
	private Instant saleDate;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

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

	public OutletResponseModel getOutlet() {
		return outlet;
	}

	public void setOutlet(OutletResponseModel outlet) {
		this.outlet = outlet;
	}

	public Instant getSaleDate() {
		return saleDate;
	}

	public void setSaleDate(Instant saleDate) {
		this.saleDate = saleDate;
	}

}
