package com.vendorpov.Products.services;

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

@Service
public class SaleServiceImpl implements SaleService {

	@Autowired
	SaleRepository saleRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public SaleDto createSale(SaleDto saleDetails) {
		SaleEntity saleEntity = modelMapper.map(saleDetails, SaleEntity.class);
		saleEntity.setExternalId(UUID.randomUUID().toString());
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
