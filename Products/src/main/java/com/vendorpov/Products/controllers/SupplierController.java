package com.vendorpov.Products.controllers;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendorpov.Products.services.SupplierService;
import com.vendorpov.Products.models.SupplierRequestModel;
import com.vendorpov.Products.models.SupplierResponseModel;
import com.vendorpov.Products.shared.SupplierDto;

import jakarta.validation.Valid;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/suppliers")
public class SupplierController {
	@Autowired
	SupplierService supplierService;
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<SupplierResponseModel> createSupplier(@Valid @RequestBody SupplierRequestModel supplier) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		SupplierDto supplierDto = modelMapper.map(supplier, SupplierDto.class);
		SupplierDto createdSupplier = supplierService.createSupplier(supplierDto);
		
		SupplierResponseModel returnValue = modelMapper.map(createdSupplier, SupplierResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<SupplierResponseModel>> getSuppliers(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<SupplierResponseModel> returnValue = new ArrayList<>();
		List<SupplierDto> suppliers = supplierService.getSuppliers(page, limit);

		for(SupplierDto supplier: suppliers) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			SupplierResponseModel supplierDetails = modelMapper.map(supplier, SupplierResponseModel.class);
			returnValue.add(supplierDetails);
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{supplierId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<SupplierResponseModel> getSupplier(@PathVariable String supplierId) {
		SupplierDto supplierDto = supplierService.getSupplier(supplierId);
		SupplierResponseModel returnValue = new ModelMapper().map(supplierDto, SupplierResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@PutMapping(value="/{supplierId}", consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<SupplierResponseModel> updateSupplier(@PathVariable String supplierId, @RequestBody SupplierRequestModel supplierDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		SupplierDto supplierDto = modelMapper.map(supplierDetails, SupplierDto.class);
		SupplierDto updatedSupplier = supplierService.updateSupplier(supplierId, supplierDto);

		SupplierResponseModel returnValue = modelMapper.map(updatedSupplier, SupplierResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@DeleteMapping(value = "/{supplierId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteSupplier(@PathVariable String supplierId) {
		supplierService.deleteSupplier(supplierId);
		return HttpStatus.OK;
	}
}
