package com.vendorpov.Products.data;

import java.io.Serializable;
import java.math.BigDecimal;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;

@Entity(name = "sale_line_items")
public class SaleLineItemEntity implements Serializable {

	private static final long serialVersionUID = -5363226890568292894L;
	@Id
	@GeneratedValue
	private long id;
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

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

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

}
