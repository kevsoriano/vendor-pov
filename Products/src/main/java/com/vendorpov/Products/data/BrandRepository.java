package com.vendorpov.Products.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.vendorpov.Products.shared.ProductCountDto;

@Repository
public interface BrandRepository  extends CrudRepository<BrandEntity, Long>, PagingAndSortingRepository<BrandEntity, Long> {
	BrandEntity findByName(String name);
	BrandEntity findByExternalId(String id);
	@Query(value = "SELECT new com.vendorpov.Products.shared.ProductCountDto(b.externalId, b.name, COUNT(p)) " + "FROM products p JOIN p.brand b "
			+ "GROUP BY b.externalId, b.name", countQuery = "SELECT COUNT(DISTINCT b.externalId) FROM products p JOIN p.brand b")
	Page<ProductCountDto> findAllBrandsWithProductCounts(Pageable pageable);
}
