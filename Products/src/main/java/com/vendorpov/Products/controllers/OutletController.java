package com.vendorpov.Products.controllers;

import java.util.ArrayList;
import java.util.List;

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

import com.vendorpov.Products.services.OutletService;
import com.vendorpov.Products.shared.OutletDto;

import jakarta.validation.Valid;

@CrossOrigin(origins= "http://localhost:5173")
@RestController
@RequestMapping("/outlets")
public class OutletController {
	
	@Autowired
	OutletService outletService;
	
	@PostMapping(consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<OutletDto> createOutlet(@Valid @RequestBody OutletDto outlet) {
		OutletDto returnValue = outletService.createOutlet(outlet);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<List<OutletDto>> getOutlets(@RequestParam(defaultValue = "0") int page,
			@RequestParam(defaultValue = "50") int limit,
			@RequestParam(required = false) String sort) {
		List<OutletDto> returnValue = new ArrayList<>();
		
		List<OutletDto> outlets = outletService.getOutlets(page, limit);
		outlets.forEach(outlet -> returnValue.add(outlet));

		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@GetMapping(value="/{outletId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<OutletDto> getOutlet(@PathVariable String outletId) {
		OutletDto returnValue = outletService.getOutletByExternalId(outletId);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@PutMapping(value="/{outletId}", consumes = { MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE }, produces = {
			MediaType.APPLICATION_JSON_VALUE , MediaType.APPLICATION_XML_VALUE })
	public ResponseEntity<OutletDto> updateOutlet(@PathVariable String outletId, @RequestBody OutletDto outletDetails) {
		OutletDto returnValue = outletService.updateOutlet(outletId, outletDetails);
		return ResponseEntity.status(HttpStatus.OK).body(returnValue);
	}
	
	@DeleteMapping(value = "/{outletId}", produces = { MediaType.APPLICATION_JSON_VALUE, MediaType.APPLICATION_XML_VALUE })
	public HttpStatus deleteOutlet(@PathVariable String outletId) {
		outletService.deleteOutlet(outletId);
		return HttpStatus.OK;
	}

}