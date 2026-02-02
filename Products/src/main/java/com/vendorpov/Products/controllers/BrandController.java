package com.vendorpov.Products.controllers;

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

import com.vendorpov.Products.services.BrandService;
import com.vendorpov.Products.shared.BrandDto;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/brands")
public class BrandController {

	@Autowired
	BrandService brandService;
	@Autowired
	ModelMapper modelMapper;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<BrandDto> createBrand(@Valid @RequestBody BrandDto brand) {
		BrandDto returnValue = brandService.createBrand(brand);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<BrandDto>> getBrands(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
		List<BrandDto> returnValue = new ArrayList<>();
		
		List<BrandDto> brands = brandService.getBrands(page, limit);
		brands.forEach(brand -> returnValue.add(brand));

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

//	@GetMapping("/product-count")
//	public ResponseEntity<List<ProductCountDto>> getBrandsWithProductCount(@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
//		List<ProductCountDto> roles = brandService.getBrandsWithProductCount(page, limit);
//
//		return ResponseEntity.status(HttpStatus.OK).body(roles);
//	}

	@GetMapping(value = "/{brandId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<BrandDto> getBrand(@PathVariable String brandId) {
		BrandDto returnValue = brandService.getBrandByExternalId(brandId);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@PutMapping(value = "/{brandId}", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<BrandDto> updateBrand(@PathVariable String brandId,
			@RequestBody BrandDto brandDetails) {
		BrandDto returnValue = brandService.updateBrand(brandId, brandDetails);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@DeleteMapping(value = "/{brandId}", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteBrand(@PathVariable String brandId) {
		brandService.deleteBrand(brandId);
		return HttpStatus.OK;
	}
}