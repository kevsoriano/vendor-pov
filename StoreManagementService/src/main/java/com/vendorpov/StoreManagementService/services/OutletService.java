package com.vendorpov.StoreManagementService.services;

import java.util.List;

import com.vendorpov.StoreManagementService.shared.OutletDto;

public interface OutletService {
	OutletDto createOutlet(OutletDto outletDetails);
	List<OutletDto> getOutlets(int page, int limit);
	OutletDto getOutletByExternalId(String id);
	OutletDto updateOutlet(String id, OutletDto outletDetails);
	void deleteOutlet(String id);
}
