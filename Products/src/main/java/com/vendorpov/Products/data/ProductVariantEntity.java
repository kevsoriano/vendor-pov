package com.vendorpov.Products.data;

import java.time.Instant;
import java.util.Collection;
import java.util.List;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity(name = "product_variants")
public class ProductVariantEntity extends BaseEntity {

	private static final long serialVersionUID = 6804025714291183439L;

	@Column(length = 50, nullable = false)
	private String variantSku;
	@ManyToMany(cascade = { CascadeType.PERSIST, CascadeType.MERGE }, fetch = FetchType.EAGER)
	@JoinTable(name = "product_variant_attributes", joinColumns = @JoinColumn(name = "product_variant_id", referencedColumnName = "id"), inverseJoinColumns = @JoinColumn(name = "product_attribute_id", referencedColumnName = "id"))
	private Collection<ProductAttributeEntity> productAttributes;
	@ManyToOne
	@JoinColumn(name = "product_id")
	private ProductEntity product;
	@OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SupplierProductVariantEntity> supplierProductVariants;
	@OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<InventoryEntity> inventories;
	@OneToMany(mappedBy = "productVariant", cascade = CascadeType.ALL, orphanRemoval = true)
	private List<SaleLineItemEntity> saleLineItems;
	@CreationTimestamp
	private Instant createdOn;
	@UpdateTimestamp
	private Instant lastUpdatedOn;

	public String getVariantSku() {
		return variantSku;
	}

	public void setVariantSku(String variantSku) {
		this.variantSku = variantSku;
	}

	public Collection<ProductAttributeEntity> getProductAttributes() {
		return productAttributes;
	}

	public void setProductAttributes(Collection<ProductAttributeEntity> productAttributes) {
		this.productAttributes = productAttributes;
	}

	public ProductEntity getProduct() {
		return product;
	}

	public void setProduct(ProductEntity product) {
		this.product = product;
	}

	public List<SupplierProductVariantEntity> getSupplierProductVariants() {
		return supplierProductVariants;
	}

	public void setSupplierProductVariants(List<SupplierProductVariantEntity> supplierProductVariants) {
		this.supplierProductVariants = supplierProductVariants;
	}

	public List<InventoryEntity> getInventories() {
		return inventories;
	}

	public void setInventories(List<InventoryEntity> inventories) {
		this.inventories = inventories;
	}

	public List<SaleLineItemEntity> getSaleLineItems() {
		return saleLineItems;
	}

	public void setSaleLineItems(List<SaleLineItemEntity> saleLineItems) {
		this.saleLineItems = saleLineItems;
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
