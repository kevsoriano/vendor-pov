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

import com.vendorpov.Products.models.OutletRequestModel;
import com.vendorpov.Products.models.OutletResponseModel;
import com.vendorpov.Products.services.OutletService;
import com.vendorpov.Products.shared.OutletDto;

import jakarta.validation.Valid;

@CrossOrigin(origins= "http://localhost:5173")
@RestController
@RequestMapping("/outlets")
public class OutletController {
	
	@Autowired
	OutletService outletService;
	@Autowired
	ModelMapper modelMapper;
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<OutletResponseModel> createOutlet(@Valid @RequestBody OutletRequestModel outlet) {
		OutletDto authorityDto = modelMapper.map(outlet, OutletDto.class);
		OutletDto createdOutlet = outletService.createOutlet(authorityDto);

		OutletResponseModel returnValue = modelMapper.map(createdOutlet, OutletResponseModel.class);
		returnValue.setId(createdOutlet.getId());
		return ResponseEntity.status(HttpStatus.CREATED).body(returnValue);
	}
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<OutletResponseModel>> getOutlets(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<OutletResponseModel> returnValue = new ArrayList<>();
		List<OutletDto> outlets = outletService.getOutlets(page, limit);
		
		outlets.forEach(outlet -> {
			OutletResponseModel outletDetails = modelMapper.map(outlet, OutletResponseModel.class);
			outletDetails.setId(outlet.getId());
			returnValue.add(outletDetails);
		});

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{outletId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<OutletResponseModel> getOutlet(@PathVariable String outletId) {
		OutletDto outletDto = outletService.getOutletByExternalId(outletId);
		OutletResponseModel returnValue = modelMapper.map(outletDto, OutletResponseModel.class);
		returnValue.setId(outletDto.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@PutMapping(value="/{outletId}", consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<OutletResponseModel> updateOutlet(@PathVariable String outletId, @RequestBody OutletRequestModel outletDetails) {
		OutletDto outletDto = modelMapper.map(outletDetails, OutletDto.class);
		OutletDto updatedOutlet = outletService.updateOutlet(outletId, outletDto);
		
		OutletResponseModel returnValue = modelMapper.map(updatedOutlet, OutletResponseModel.class);
		returnValue.setId(updatedOutlet.getId());
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@DeleteMapping(value = "/{outletId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteOutlet(@PathVariable String outletId) {
		outletService.deleteOutlet(outletId);
		return HttpStatus.OK;
	}

}