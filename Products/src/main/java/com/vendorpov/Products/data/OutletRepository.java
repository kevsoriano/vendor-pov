package com.vendorpov.Products.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OutletRepository extends CrudRepository<OutletEntity, Long>, PagingAndSortingRepository<OutletEntity, Long> {
	OutletEntity findByName(String name);
	OutletEntity findByOutletId(String outletId);
}
