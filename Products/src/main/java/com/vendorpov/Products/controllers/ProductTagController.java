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

import com.vendorpov.Products.services.ProductTagService;
import com.vendorpov.Products.shared.ProductTagDto;

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/productTags")
public class ProductTagController {

	@Autowired
	ProductTagService productTagService;
	@Autowired
	ModelMapper modelMapper;

	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductTagDto> createProductTag(@Valid @RequestBody ProductTagDto productTag) {
		ProductTagDto returnValue = productTagService.createProductTag(productTag);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<ProductTagDto>> getProductTags(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
		List<ProductTagDto> returnValue = new ArrayList<>();
		
		List<ProductTagDto> productTags = productTagService.getProductTags(page, limit);
		productTags.forEach(productTag -> returnValue.add(productTag));
		
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping(value = "/{productTagId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductTagDto> getProductTag(@PathVariable String productTagId) {
		ProductTagDto returnValue = productTagService.getProductTagByExternalId(productTagId);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@PutMapping(value = "/{productTagId}", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductTagDto> updateProductTag(@PathVariable String productTagId,
			@RequestBody ProductTagDto productTagDetails) {
		ProductTagDto returnValue = productTagService.updateProductTag(productTagId, productTagDetails);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@DeleteMapping(value = "/{productTagId}", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteProductTag(@PathVariable String productTagId) {
		productTagService.deleteProductTag(productTagId);
		return HttpStatus.OK;
	}
}
