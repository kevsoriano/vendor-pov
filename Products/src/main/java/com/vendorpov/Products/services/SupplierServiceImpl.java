package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.vendorpov.Products.data.SupplierEntity;
import com.vendorpov.Products.data.SupplierRepository;
import com.vendorpov.Products.shared.ProductVariantCountDto;
import com.vendorpov.Products.shared.SupplierDto;

@Service
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	SupplierRepository supplierRepository;
	@Autowired
    private ModelMapper modelMapper;

	@Override
	public SupplierDto createSupplier(SupplierDto supplierDetails) {
		SupplierEntity supplierEntity = modelMapper.map(supplierDetails, SupplierEntity.class);
		supplierEntity.setExternalId(UUID.randomUUID().toString());
		supplierRepository.save(supplierEntity);
		
		SupplierDto returnValue = modelMapper.map(supplierEntity, SupplierDto.class);
		returnValue.setId(supplierEntity.getExternalId());
		
		return returnValue;
	}

	@Override
	public List<SupplierDto> getSuppliers(int page, int limit) {
		List<SupplierDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<SupplierEntity> supplierPage = supplierRepository.findAll(pageRequest);
		List<SupplierEntity> suppliers = supplierPage.getContent();
		for(SupplierEntity supplier: suppliers) {
			SupplierDto supplierDto = modelMapper.map(supplier, SupplierDto.class);
			supplierDto.setId(supplier.getExternalId());
			returnValue.add(supplierDto);
		}
		return returnValue;
	}

	@Override
	public SupplierDto getSupplierByExternalId(String id) {
		SupplierEntity supplierEntity = supplierRepository.findByExternalId(id);
		if (supplierEntity == null) {
	        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier not found with supplier ID: " + id);
	    }
		SupplierDto returnValue = modelMapper.map(supplierEntity, SupplierDto.class);
		returnValue.setId(supplierEntity.getExternalId());
		return returnValue;
	}

	@Override
	public SupplierDto updateSupplier(String id, SupplierDto supplierDetails) {
		SupplierEntity supplierEntity = supplierRepository.findByExternalId(id);
		supplierEntity.setName(supplierDetails.getName());
		supplierEntity.setDescription(supplierDetails.getDescription());

		SupplierEntity updatedSupplier = supplierRepository.save(supplierEntity);
		SupplierDto returnValue = modelMapper.map(updatedSupplier, SupplierDto.class);
		returnValue.setId(supplierEntity.getExternalId());
		
		return returnValue;
	}

	@Override
	public void deleteSupplier(String id) {
		SupplierEntity supplierEntity = supplierRepository.findByExternalId(id);
		supplierRepository.delete(supplierEntity);
	}

	@Override
	public List<ProductVariantCountDto> getSuppliersWithProductCount(int page, int limit) {
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<ProductVariantCountDto> supplierPage = supplierRepository.findAllSuppliersWithProductCounts(pageRequest);
		List<ProductVariantCountDto> suppliers = supplierPage.getContent();
		return suppliers;
	}
}
