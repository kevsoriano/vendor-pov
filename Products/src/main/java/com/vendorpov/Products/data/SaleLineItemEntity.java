package com.vendorpov.Products.data;

import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "sale_line_items")
public class SaleLineItemEntity extends BaseEntity {

	private static final long serialVersionUID = -5363226890568292894L;
	@ManyToOne
	@JoinColumn(name = "sale_id")
	private SaleEntity sale;
	@ManyToOne
	@JoinColumn(name = "product_variant_id")
	private ProductVariantEntity productVariant;
	@Column
	private double quantity;
	@Column
	private BigDecimal unitPrice;
	@Column
	private BigDecimal discountAmount;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

	public SaleEntity getSale() {
		return sale;
	}

	public void setSale(SaleEntity sale) {
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