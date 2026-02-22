package com.vendorpov.Sale.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SaleRepository extends CrudRepository<SaleEntity, Long>, PagingAndSortingRepository<SaleEntity, Long> {
	SaleEntity findByExternalId(String saleId);
}