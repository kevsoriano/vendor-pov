package com.vendorpov.Products.data;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends CrudRepository<ProductEntity, Long>, PagingAndSortingRepository<ProductEntity, Long> {
	ProductEntity findByProductId(String productId);
	@Query(value="select * from products p where p.product_id = :userId", nativeQuery = true)
	ProductEntity findDatabaseProductByPublicProductIdField(@Param("userId") String userId);
//	@Query(value="select * from products p where p.status = 'true'", nativeQuery = true)
//	Page<ProductEntity> findAllProductsWithActiveStatus(Pageable pageableRequest);
}
