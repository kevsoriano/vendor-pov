package com.vendorpov.Products.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductTagRepository extends CrudRepository<ProductTagEntity, Long>, PagingAndSortingRepository<ProductTagEntity, Long> {
	List<ProductTagEntity> findByNameIn(List<String> names);
	ProductTagEntity findByName(String name);
	ProductTagEntity findByExternalId(String id);
}