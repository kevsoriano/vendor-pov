package com.vendorpov.Sale.shared;

import java.time.Instant;
import java.util.List;

import com.vendorpov.Sale.models.OutletResponseModel;

public class SaleDto extends BaseDto {

	private static final long serialVersionUID = 1988937725348721521L;
	private double totalAmount;
	private double discountAmount;
	private List<SaleLineItemDto> saleLineItems;
	private String outletId;
	private OutletResponseModel outlet;
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
