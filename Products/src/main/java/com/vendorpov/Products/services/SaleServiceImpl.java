package com.vendorpov.Products.services;

import com.vendorpov.Products.data.OutletRepository;
import com.vendorpov.Products.data.OutletEntity;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vendorpov.Products.data.SaleEntity;
import com.vendorpov.Products.data.SaleRepository;
import com.vendorpov.Products.shared.SaleDto;

import com.vendorpov.Products.data.InventoryRepository;
import com.vendorpov.Products.data.InventoryEntity;
import com.vendorpov.Products.shared.SaleLineItemDto;
import com.vendorpov.Products.data.ProductVariantEntity;

@Service
public class SaleServiceImpl implements SaleService {

	@Autowired
	SaleRepository saleRepository;
	@Autowired
	OutletRepository outletRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private InventoryRepository inventoryRepository;

	@Override
	public SaleDto createSale(SaleDto saleDetails) {
		SaleEntity saleEntity = modelMapper.map(saleDetails, SaleEntity.class);
		saleEntity.setExternalId(UUID.randomUUID().toString());

		// Ensure OutletEntity is persisted
		OutletEntity outlet = saleEntity.getOutlet();
		if (outlet != null && outlet.getId() == null) {
			// Try to find existing outlet by unique property (e.g. name)
			OutletEntity existingOutlet = outletRepository.findByExternalId(outlet.getExternalId());
			if (existingOutlet != null) {
				saleEntity.setOutlet(existingOutlet);
			} else {
				throw new IllegalArgumentException("Outlet does not exist: " + outlet.getName());
			}
		}

		saleRepository.save(saleEntity);

		// Update inventory for each sale line item
		if (saleDetails.getSaleLineItems() != null) {
			for (SaleLineItemDto lineItem : saleDetails.getSaleLineItems()) {
				ProductVariantEntity variant = lineItem.getProductVariant();
				// For demo: assume only one inventory per variant (no outlet/supplier
				// distinction)
				if (variant != null && variant.getId() != null && saleEntity.getOutlet() != null
						&& saleEntity.getOutlet().getId() != null) {
					InventoryEntity inventory = inventoryRepository.findByProductVariantIdAndOutletId(variant.getId(),
							saleEntity.getOutlet().getId()); // Update as needed for outlet
					if (inventory != null) {
						int newQty = inventory.getQuantity() - (int) lineItem.getQuantity();
						inventory.setQuantity(Math.max(newQty, 0));
						inventoryRepository.save(inventory);
					}
				}
			}
		}

		SaleDto returnValue = modelMapper.map(saleEntity, SaleDto.class);
		returnValue.setId(saleEntity.getExternalId());

		return returnValue;
	}

	@Override
	public List<SaleDto> getSales(int page, int limit) {
		List<SaleDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<SaleEntity> salePage = saleRepository.findAll(pageRequest);
		List<SaleEntity> sales = salePage.getContent();

		for (SaleEntity sale : sales) {
			SaleDto saleDto = modelMapper.map(sale, SaleDto.class);
			saleDto.setId(sale.getExternalId());
			returnValue.add(saleDto);
		}

		return returnValue;
	}

	@Override
	public SaleDto getSaleByExternalId(String id) {
		SaleEntity saleEntity = saleRepository.findByExternalId(id);
		SaleDto returnValue = modelMapper.map(saleEntity, SaleDto.class);
		returnValue.setId(saleEntity.getExternalId());
		return returnValue;
	}

	@Override
	public SaleDto updateSale(String id, SaleDto saleDetails) {
		SaleEntity existingSale = saleRepository.findByExternalId(id);

		SaleEntity updatedSale = saleRepository.save(existingSale);

		SaleDto returnValue = modelMapper.map(updatedSale, SaleDto.class);
		returnValue.setId(updatedSale.getExternalId());

		return returnValue;
	}

	@Override
	public void deleteSale(String id) {
		SaleEntity saleEntity = saleRepository.findByExternalId(id);
		saleRepository.delete(saleEntity);
	}

}
