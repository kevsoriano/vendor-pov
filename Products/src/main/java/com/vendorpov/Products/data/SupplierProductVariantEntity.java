package com.vendorpov.Products.data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.time.Instant;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity(name = "supplier_product_variants")
public class SupplierProductVariantEntity implements Serializable {

	private static final long serialVersionUID = 4807840426868487582L;
	@EmbeddedId
	private SupplierProductVariantCompositeKey id;
	@ManyToOne
	@MapsId("supplierId")
	@JoinColumn(name = "supplier_id")
	private SupplierEntity supplier;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

	@ManyToOne
	@MapsId("productVariantId")
	@JoinColumn(name = "product_variant_id")
	private ProductVariantEntity productVariant;

	@Column(precision = 10, scale = 2)
	private BigDecimal supplierPrice;
	@Column(precision = 5, scale = 4)
	private BigDecimal taxRate;

	public SupplierProductVariantCompositeKey getId() {
		return id;
	}

	public void setId(SupplierProductVariantCompositeKey id) {
		this.id = id;
	}

	public SupplierEntity getSupplier() {
		return supplier;
	}

	public void setSupplier(SupplierEntity supplier) {
		this.supplier = supplier;
	}

	public ProductVariantEntity getProductVariant() {
		return productVariant;
	}

	public void setProductVariant(ProductVariantEntity productVariant) {
		this.productVariant = productVariant;
	}

	public BigDecimal getSupplierPrice() {
		return supplierPrice;
	}

	public void setSupplierPrice(BigDecimal supplierPrice) {
		this.supplierPrice = supplierPrice;
	}

	public BigDecimal getTaxRate() {
		return taxRate;
	}

	public void setTaxRate(BigDecimal taxRate) {
		this.taxRate = taxRate;
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