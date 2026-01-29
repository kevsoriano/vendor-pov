package com.vendorpov.Products.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ProductVariantRepository extends CrudRepository<ProductVariantEntity, Long>, PagingAndSortingRepository<ProductVariantEntity, Long> {

}
