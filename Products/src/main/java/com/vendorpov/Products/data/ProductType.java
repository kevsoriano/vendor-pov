package com.vendorpov.Products.data;

import com.fasterxml.jackson.annotation.JsonProperty;

public enum ProductType {
	@JsonProperty("Standard")
	STANDARD,
	@JsonProperty("Variant")
	VARIANT,
	@JsonProperty("Composite")
	COMPOSITE
}
