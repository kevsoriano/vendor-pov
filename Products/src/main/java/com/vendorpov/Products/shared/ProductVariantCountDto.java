package com.vendorpov.Products.shared;

public record ProductVariantCountDto(
		String id,
		String name, 
	    Long productCount, 
	    Long variantCount
) {}
