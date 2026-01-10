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
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.vendorpov.Products.models.BrandRequestModel;
import com.vendorpov.Products.models.BrandResponseModel;
import com.vendorpov.Products.services.BrandService;
import com.vendorpov.Products.shared.BrandDto;

import jakarta.validation.Valid;

@CrossOrigin(origins= "http://localhost:5173")
@RestController
@RequestMapping("/brands")
public class BrandController {
	
	@Autowired
	BrandService brandService;
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<BrandResponseModel>> getBrands(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<BrandResponseModel> returnValue = new ArrayList<>();
		List<BrandDto> outlets = brandService.getBrands(page, limit);

		for(BrandDto outlet: outlets) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			BrandResponseModel outletDetails = modelMapper.map(outlet, BrandResponseModel.class);
			returnValue.add(outletDetails);
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<BrandResponseModel> createOutlet(@Valid @RequestBody BrandRequestModel outlet) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		BrandDto brandDto = modelMapper.map(outlet, BrandDto.class);
		BrandDto createdOutlet = brandService.createBrand(brandDto);
		
		BrandResponseModel returnValue = modelMapper.map(createdOutlet, BrandResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
}