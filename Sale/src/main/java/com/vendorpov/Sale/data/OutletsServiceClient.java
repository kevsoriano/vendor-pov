package com.vendorpov.Sale.data;

import java.util.List;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import com.vendorpov.Sale.models.OutletResponseModel;

@FeignClient(name="outlets")
public interface OutletsServiceClient {

	@GetMapping("outlets")
	public List<OutletResponseModel> getOutlets();
	
	@GetMapping("outlets/{id}")
	public OutletResponseModel getOutlet(@PathVariable String id);
}
