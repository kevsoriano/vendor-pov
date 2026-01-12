package com.vendorpov.Products.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BrandRepository  extends CrudRepository<BrandEntity, Long>, PagingAndSortingRepository<BrandEntity, Long> {
	BrandEntity findByName(String name);
	BrandEntity findByExternalId(String id);
}
