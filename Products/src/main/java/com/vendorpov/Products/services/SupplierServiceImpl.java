package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.vendorpov.Products.data.SupplierEntity;
import com.vendorpov.Products.data.SupplierRepository;
import com.vendorpov.Products.shared.SupplierDto;

@Service
public class SupplierServiceImpl implements SupplierService {

	@Autowired
	SupplierRepository supplierRepository;

	@Override
	public SupplierDto createSupplier(SupplierDto supplierDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		SupplierEntity supplierEntity = modelMapper.map(supplierDetails, SupplierEntity.class);
		supplierEntity.setSupplierId(UUID.randomUUID().toString());
		supplierRepository.save(supplierEntity);
		SupplierDto returnValue = modelMapper.map(supplierEntity, SupplierDto.class);
		
		return returnValue;
	}

	@Override
	public List<SupplierDto> getSuppliers(int page, int limit) {
		List<SupplierDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<SupplierEntity> supplierPage = supplierRepository.findAll(pageRequest);
		List<SupplierEntity> suppliers = supplierPage.getContent();
		for(SupplierEntity supplier: suppliers) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			SupplierDto supplierDto = modelMapper.map(supplier, SupplierDto.class);
			returnValue.add(supplierDto);
		}
		return returnValue;
	}

	@Override
	public SupplierDto getSupplier(String supplierId) {
		SupplierEntity supplierEntity = supplierRepository.findBySupplierId(supplierId);
		if (supplierEntity == null) {
	        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Supplier not found with supplier ID: " + supplierId);
	    }
		return new ModelMapper().map(supplierEntity, SupplierDto.class);
	}

	@Override
	public SupplierDto updateSupplier(String supplierId, SupplierDto supplierDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		SupplierEntity supplierEntity = supplierRepository.findBySupplierId(supplierId);
		supplierEntity.setName(supplierDetails.getName());

		SupplierEntity updatedSupplier = supplierRepository.save(supplierEntity);
		
		return modelMapper.map(updatedSupplier, SupplierDto.class);
	}

	@Override
	public void deleteSupplier(String supplierId) {
		SupplierEntity supplierEntity = supplierRepository.findBySupplierId(supplierId);
		supplierRepository.delete(supplierEntity);
	}
}
