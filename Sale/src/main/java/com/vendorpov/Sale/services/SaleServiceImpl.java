package com.vendorpov.Sale.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vendorpov.Sale.data.OutletsServiceClient;
import com.vendorpov.Sale.data.SaleEntity;
import com.vendorpov.Sale.data.SaleRepository;
import com.vendorpov.Sale.models.OutletResponseModel;
import com.vendorpov.Sale.shared.SaleDto;

@Service
public class SaleServiceImpl implements SaleService {
	@Autowired
	SaleRepository saleRepository;
	@Autowired
	private ModelMapper modelMapper;
	@Autowired
	OutletsServiceClient outletsServiceClient;
//	@Autowired
//	private InventoryRepository inventoryRepository;

	@Override
	public SaleDto createSale(SaleDto saleDetails) {
		String outletId = saleDetails.getOutletId();
		if (outletId != null) {
			OutletResponseModel existingOutlet = outletsServiceClient.getOutlet(outletId);
			if (existingOutlet != null) {
				saleDetails.setOutletId(outletId);
				saleDetails.setOutlet(existingOutlet);
			} else {
				throw new IllegalArgumentException("Outlet does not exist: " + outletId);
			}
		}

		// Update inventory for each sale line item
//		if (saleDetails.getSaleLineItems() != null) {
//			for (SaleLineItemDto lineItem : saleDetails.getSaleLineItems()) {
//				ProductVariantEntity variant = lineItem.getProductVariant();
//				// For demo: assume only one inventory per variant (no outlet/supplier
//				// distinction)
//				if (variant != null && variant.getId() != null && saleEntity.getOutlet() != null
//						&& saleEntity.getOutlet().getId() != null) {
//					InventoryEntity inventory = inventoryRepository.findByProductVariantIdAndOutletId(variant.getId(),
//							saleEntity.getOutlet().getId()); // Update as needed for outlet
//					if (inventory != null) {
//						int newQty = inventory.getQuantity() - (int) lineItem.getQuantity();
//						inventory.setQuantity(Math.max(newQty, 0));
//						inventoryRepository.save(inventory);
//					}
//				}
//			}
//		}
		
		SaleEntity saleEntity = modelMapper.map(saleDetails, SaleEntity.class);
		saleEntity.setExternalId(UUID.randomUUID().toString());
		saleEntity.setOutletId(outletId);
		saleRepository.save(saleEntity);

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
