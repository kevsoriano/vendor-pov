package com.vendorpov.Products.data;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;

import com.vendorpov.Products.models.SupplierResponseModel;

//@FeignClient(name = "supplier",url = "http://localhost:65277")
public interface SupplierServiceClient {

//	@GetMapping("/suppliers")
//	public List<SupplierResponseModel> getSuppliers();
}
