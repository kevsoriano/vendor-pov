package com.vendorpov.Sale.controllers;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
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

import com.vendorpov.Sale.models.SaleRequestModel;
import com.vendorpov.Sale.models.SaleResponseModel;
import com.vendorpov.Sale.services.SaleService;
import com.vendorpov.Sale.shared.SaleDto;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/sale")
public class SaleController {
	@Autowired
	SaleService saleService;
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<SaleResponseModel> createSale(@Valid @RequestBody SaleRequestModel sale) {
		SaleDto saleDto = modelMapper.map(sale, SaleDto.class);
		SaleDto createdSale = saleService.createSale(saleDto);

		SaleResponseModel returnValue = modelMapper.map(createdSale, SaleResponseModel.class);
		returnValue.setId(createdSale.getId());
		return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
	}
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<SaleResponseModel>> getSales(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<SaleResponseModel> returnValue = new ArrayList<>();
		List<SaleDto> sales = saleService.getSales(page, limit);
		
		sales.forEach(sale -> {
			SaleResponseModel saleDetails = modelMapper.map(sale, SaleResponseModel.class);
			saleDetails.setId(sale.getId());
			returnValue.add(saleDetails);
		});

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{saleId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<SaleResponseModel> getSale(@PathVariable String saleId) {
		SaleDto saleDto = saleService.getSaleByExternalId(saleId);
		SaleResponseModel returnValue = modelMapper.map(saleDto, SaleResponseModel.class);
		returnValue.setId(saleDto.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@PutMapping(value="/{saleId}", consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<SaleResponseModel> updateSale(@PathVariable String saleId, @RequestBody SaleRequestModel saleDetails) {
		SaleDto saleDto = modelMapper.map(saleDetails, SaleDto.class);
		SaleDto updatedSale = saleService.updateSale(saleId, saleDto);
		
		SaleResponseModel returnValue = modelMapper.map(updatedSale, SaleResponseModel.class);
		returnValue.setId(updatedSale.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@DeleteMapping(value = "/{saleId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteSale(@PathVariable String saleId) {
		saleService.deleteSale(saleId);
		return HttpStatus.OK;
	}
}
