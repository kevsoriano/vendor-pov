package com.vendorpov.Products.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

//import com.vendorpov.Products.shared.ProductVariantCountDto;

@Repository
public interface SupplierRepository extends CrudRepository<SupplierEntity, Long>, PagingAndSortingRepository<SupplierEntity, Long>  {
	SupplierEntity findByName(String name);
	SupplierEntity findByExternalId(String supplierId);
//	@Query("SELECT DISTINCT pv FROM product_variants pv " +
//		       "JOIN pv.supplierProductVariants spv " +
//		       "LEFT JOIN FETCH pv.product p " +
//		       "LEFT JOIN FETCH pv.productAttributes " +
//		       "WHERE spv.supplier.id = :supplierId")
//	List<ProductVariantEntity> findAllVariantsBySupplierId(@Param("supplierId") String supplierId);
//	@Query("SELECT DISTINCT p FROM products p " +
//		       "JOIN p.productVariants pv " +
//		       "JOIN pv.supplierProductVariants spv " +
//		       "LEFT JOIN FETCH p.brand " +
//		       "LEFT JOIN FETCH p.productTags " +
//		       "WHERE spv.supplier.id = :supplierId")
//	List<ProductEntity> findAllProductsBySupplierId(@Param("supplierId") String supplierId);
//	@Query(
//		value = "SELECT new com.vendorpov.Products.shared.ProductVariantCountDto(" +
//				"s.externalId, " +
//				"s.name, " +
//			    "COUNT(DISTINCT pv.product.id), " +
//			    "COUNT(pv.id)) " +
//			    "FROM suppliers s " +
//			    "LEFT JOIN s.supplierProductVariant spv " +
//			    "LEFT JOIN spv.productVariant pv " +
//			    "GROUP BY s.id, s.name",
//		countQuery = "SELECT COUNT(DISTINCT b.externalId) FROM products p JOIN p.brand b"
//		countQuery = "SELECT COUNT(s) FROM suppliers s"
//		)
//	Page<ProductVariantCountDto> findAllSuppliersWithProductCounts(Pageable pageable);
}
