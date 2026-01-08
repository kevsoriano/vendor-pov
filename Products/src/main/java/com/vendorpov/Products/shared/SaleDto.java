package com.vendorpov.Products.shared;

import java.io.Serializable;
import java.time.Instant;
import java.util.List;

import com.vendorpov.Products.data.SaleLineItemEntity;

public class SaleDto implements Serializable {

	private static final long serialVersionUID = 1988937725348721521L;
	private long id;
	private long saleId;
	private double totalAmount;
	private double discountAmount;
	private List<SaleLineItemDto> saleLineItems;
	private Instant saleDate;
	private Instant lastUpdatedOn;
}
