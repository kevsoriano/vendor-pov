package com.vendorpov.Products.data;

import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Column;
import jakarta.persistence.Embeddable;

@Embeddable
//@Data // Generates getters, setters, equals, hashCode, and toString
//@NoArgsConstructor
//@AllArgsConstructor
public class SupplierProductVariantCompositeKey implements Serializable {

	private static final long serialVersionUID = -2155490882322419695L;
	@Column(name = "supplier_id")
	private long supplierId;

	@Column(name = "product_variant_id")
	private long productVariantId;

	public SupplierProductVariantCompositeKey() {
	}

	public SupplierProductVariantCompositeKey(long supplierId, long productVariantId) {
		this.supplierId = supplierId;
		this.productVariantId = productVariantId;
	}

	@Override
	public boolean equals(Object o) {
		if (this == o)
			return true;
		if (o == null || getClass() != o.getClass())
			return false;
		SupplierProductVariantCompositeKey that = (SupplierProductVariantCompositeKey) o;
		return Objects.equals(supplierId, that.supplierId) && Objects.equals(productVariantId, that.productVariantId);
	}

	@Override
	public int hashCode() {
		return Objects.hash(supplierId, productVariantId);
	}

	public long getSupplierId() {
		return supplierId;
	}

	public void setSupplierId(long supplierId) {
		this.supplierId = supplierId;
	}

	public long getProductVariantId() {
		return productVariantId;
	}

	public void setProductVariantId(long productVariantId) {
		this.productVariantId = productVariantId;
	}

}