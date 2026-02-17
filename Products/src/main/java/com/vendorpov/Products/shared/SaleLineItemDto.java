package com.vendorpov.Products.shared;

import java.math.BigDecimal;

import com.vendorpov.Products.data.ProductVariantEntity;

public class SaleLineItemDto extends BaseDto {

	private static final long serialVersionUID = 5477438250511368620L;
	private SaleDto sale;
	private ProductVariantEntity productVariant;
	private double quantity;
	private BigDecimal unitPrice;
	private BigDecimal discountAmount;

	public SaleDto getSale() {
		return sale;
	}

	public void setSale(SaleDto sale) {
		this.sale = sale;
	}

	public ProductVariantEntity getProductVariant() {
		return productVariant;
	}

	public void setProductVariant(ProductVariantEntity productVariant) {
		this.productVariant = productVariant;
	}

	public double getQuantity() {
		return quantity;
	}

	public void setQuantity(double quantity) {
		this.quantity = quantity;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public void setUnitPrice(BigDecimal unitPrice) {
		this.unitPrice = unitPrice;
	}

	public BigDecimal getDiscountAmount() {
		return discountAmount;
	}

	public void setDiscountAmount(BigDecimal discountAmount) {
		this.discountAmount = discountAmount;
	}

}