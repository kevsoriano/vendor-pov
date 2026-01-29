//package com.vendorpov.Products.controllers;
//
//import java.util.ArrayList;
//import java.util.List;
//
//import org.modelmapper.ModelMapper;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.CrossOrigin;
//import org.springframework.web.bind.annotation.DeleteMapping;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PathVariable;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.PutMapping;
//import org.springframework.web.bind.annotation.RequestBody;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RequestParam;
//import org.springframework.web.bind.annotation.RestController;
//
//import com.vendorpov.Products.models.BrandRequestModel;
//import com.vendorpov.Products.models.BrandResponseModel;
//import com.vendorpov.Products.services.BrandService;
//import com.vendorpov.Products.shared.BrandDto;
//import com.vendorpov.Products.shared.ProductCountDto;
//
//import jakarta.validation.Valid;
//
//@CrossOrigin(origins = "http://localhost:5173")
//@RestController
//@RequestMapping("/brands")
//public class BrandController {
//
//	@Autowired
//	BrandService brandService;
//	@Autowired
//	ModelMapper modelMapper;
//
//	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, produces = {
//			MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
//	public ResponseEntity<BrandResponseModel> createBrand(@Valid @RequestBody BrandRequestModel outlet) {
//		BrandDto brandDto = modelMapper.map(outlet, BrandDto.class);
//		BrandDto createdOutlet = brandService.createBrand(brandDto);
//
//		BrandResponseModel returnValue = modelMapper.map(createdOutlet, BrandResponseModel.class);
//		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
//	}
//
//	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
//	public ResponseEntity<List<BrandResponseModel>> getBrands(@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
//		List<BrandResponseModel> returnValue = new ArrayList<>();
//		List<BrandDto> outlets = brandService.getBrands(page, limit);
//
//		for (BrandDto outlet : outlets) {
//			BrandResponseModel outletDetails = modelMapper.map(outlet, BrandResponseModel.class);
//			returnValue.add(outletDetails);
//		}
//
//		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
//	}
//
//	@GetMapping("/product-count")
//	public ResponseEntity<List<ProductCountDto>> getBrandsWithProductCount(@RequestParam(defaultValue = "0") int page,
//			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
//		List<ProductCountDto> roles = brandService.getBrandsWithProductCount(page, limit);
//
//		return ResponseEntity.status(HttpStatus.OK).body(roles);
//	}
//
//	@GetMapping(value = "/{brandId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
//	public ResponseEntity<BrandResponseModel> getBrand(@PathVariable String brandId) {
//		BrandDto brandDto = brandService.getBrandByExternalId(brandId);
//		BrandResponseModel returnValue = modelMapper.map(brandDto, BrandResponseModel.class);
//		returnValue.setId(brandDto.getId());
//		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
//	}
//
//	@PutMapping(value = "/{brandId}", consumes = { MediaType.APPLICATION_JSON_VALUE,
//			MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
//					MediaType.APPLICATION_XML_VALUE })
//	public ResponseEntity<BrandResponseModel> updateBrand(@PathVariable String brandId,
//			@RequestBody BrandRequestModel brandDetails) {
//		BrandDto brand = modelMapper.map(brandDetails, BrandDto.class);
//		BrandDto updatedBrand = brandService.updateBrand(brandId, brand);
//
//		BrandResponseModel returnValue = modelMapper.map(updatedBrand, BrandResponseModel.class);
//		returnValue.setId(updatedBrand.getId());
//		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
//	}
//
//	@DeleteMapping(value = "/{brandId}", produces = { MediaType.APPLICATION_JSON_VALUE,
//			MediaType.APPLICATION_XML_VALUE })
//	public HttpStatus deleteBrand(@PathVariable String brandId) {
//		brandService.deleteBrand(brandId);
//		return HttpStatus.OK;
//	}
//}