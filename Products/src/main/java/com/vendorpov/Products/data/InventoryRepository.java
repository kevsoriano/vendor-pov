package com.vendorpov.Products.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface InventoryRepository extends CrudRepository<InventoryEntity, Long> {
    InventoryEntity findByProductVariantIdAndOutletId(Long productVariantId, Long outletId);
}
