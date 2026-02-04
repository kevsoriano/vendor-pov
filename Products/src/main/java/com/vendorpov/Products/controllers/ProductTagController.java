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

import com.vendorpov.Products.models.ProductRequestModel;
import com.vendorpov.Products.models.ProductTagRequestModel;
import com.vendorpov.Products.models.ProductTagResponseModel;
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
	public ResponseEntity<ProductTagResponseModel> createProductTag(@Valid @RequestBody ProductRequestModel productTag) {
		ProductTagDto productTagDto = modelMapper.map(productTag, ProductTagDto.class);
		ProductTagDto createdProductTag = productTagService.createProductTag(productTagDto);
		
		ProductTagResponseModel returnValue = modelMapper.map(createdProductTag, ProductTagResponseModel.class);
		returnValue.setId(createdProductTag.getId());
		
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<ProductTagResponseModel>> getProductTags(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit, @RequestParam(required = false) String sort) {
		List<ProductTagResponseModel> returnValue = new ArrayList<>();
		List<ProductTagDto> productTags = productTagService.getProductTags(page, limit);
		
		productTags.forEach(productTag -> {
			ProductTagResponseModel productTagDetails = modelMapper.map(productTag, ProductTagResponseModel.class);
			productTagDetails.setId(productTag.getId());
			returnValue.add(productTagDetails);
		});
		
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@GetMapping(value = "/{productTagId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductTagResponseModel> getProductTag(@PathVariable String productTagId) {
		ProductTagDto productTagDetails = productTagService.getProductTagByExternalId(productTagId);
		ProductTagResponseModel returnValue = modelMapper.map(productTagDetails, ProductTagResponseModel.class);
		returnValue.setId(productTagDetails.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@PutMapping(value = "/{productTagId}", consumes = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE }, produces = { MediaType.APPLICATION_JSON_VALUE,
					MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<ProductTagResponseModel> updateProductTag(@PathVariable String productTagId,
			@RequestBody ProductTagRequestModel productTagDetails) {
		ProductTagDto productTagDto = modelMapper.map(productTagDetails, ProductTagDto.class);
		ProductTagDto updatedProductTag = productTagService.updateProductTag(productTagId, productTagDto);
		
		ProductTagResponseModel returnValue = modelMapper.map(updatedProductTag, ProductTagResponseModel.class);
		returnValue.setId(updatedProductTag.getId());
		
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}

	@DeleteMapping(value = "/{productTagId}", produces = { MediaType.APPLICATION_JSON_VALUE,
			MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteProductTag(@PathVariable String productTagId) {
		productTagService.deleteProductTag(productTagId);
		return HttpStatus.OK;
	}
}
