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

import com.vendorpov.Products.models.ProductRequestModel;
import com.vendorpov.Products.models.ProductResponseModel;
import com.vendorpov.Products.services.ProductService;
import com.vendorpov.Products.shared.ProductDto;

import jakarta.validation.Valid;

@CrossOrigin(origins= "http://localhost:5173")
@RestController
@RequestMapping("/products")
public class ProductController {
	
	@Autowired
	ProductService productService;
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductResponseModel> createProduct(@Valid @RequestBody ProductRequestModel product) {
		ProductDto productDto = modelMapper.map(product, ProductDto.class);
		ProductDto createdProduct = productService.createProduct(productDto);
		
		ProductResponseModel returnValue = modelMapper.map(createdProduct, ProductResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<ProductResponseModel>> getProducts(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<ProductResponseModel> returnValue = new ArrayList<>();
		List<ProductDto> products = productService.getProducts(page, limit);

		for(ProductDto product: products) {
			ProductResponseModel productDetails = modelMapper.map(product, ProductResponseModel.class);
			returnValue.add(productDetails);
		}

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{productId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductResponseModel> getProduct(@PathVariable String productId) {
		ProductDto productDto = productService.getProductByExternalId(productId);
		ProductResponseModel returnValue = modelMapper.map(productDto, ProductResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@PutMapping(value="/{productId}", consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductResponseModel> updateProduct(@PathVariable String productId, @RequestBody ProductRequestModel productDetails) {
		ProductDto productDto = modelMapper.map(productDetails, ProductDto.class);
		ProductDto updatedProduct = productService.updateProduct(productId, productDto);

		ProductResponseModel returnValue = modelMapper.map(updatedProduct, ProductResponseModel.class);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@DeleteMapping(value = "/{productId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteProduct(@PathVariable String productId) {
		productService.deleteProduct(productId);
		return HttpStatus.OK;
	}
}
