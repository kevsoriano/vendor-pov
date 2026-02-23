package com.vendorpov.Inventory.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.vendorpov.Inventory.InventoryEntity;

@Repository
public interface InventoryRepository extends CrudRepository<InventoryEntity, Long> {
    InventoryEntity findByProductVariantIdAndOutletId(Long productVariantId, Long outletId);
}
