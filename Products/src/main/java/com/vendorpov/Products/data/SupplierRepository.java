package com.vendorpov.Products.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SupplierRepository extends CrudRepository<SupplierEntity, Long>, PagingAndSortingRepository<SupplierEntity, Long>  {
	SupplierEntity findByName(String name);
	SupplierEntity findByExternalId(String supplierId);
}

