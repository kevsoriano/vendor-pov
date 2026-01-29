package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vendorpov.Products.data.OutletEntity;
import com.vendorpov.Products.data.OutletRepository;
import com.vendorpov.Products.shared.OutletDto;

@Service
public class OutletServiceImpl implements OutletService {

	@Autowired
	OutletRepository outletRepository;
	@Autowired
	private ModelMapper modelMapper;

	@Override
	public OutletDto createOutlet(OutletDto outletDetails) {
		OutletEntity outletEntity = modelMapper.map(outletDetails, OutletEntity.class);
		outletEntity.setExternalId(UUID.randomUUID().toString());
		outletRepository.save(outletEntity);

		OutletDto returnValue = modelMapper.map(outletEntity, OutletDto.class);
		returnValue.setId(outletEntity.getExternalId());

		return returnValue;
	}

	@Override
	public List<OutletDto> getOutlets(int page, int limit) {
		List<OutletDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<OutletEntity> outletPage = outletRepository.findAll(pageRequest);
		List<OutletEntity> outlets = outletPage.getContent();

		for (OutletEntity outlet : outlets) {
			OutletDto productDto = modelMapper.map(outlet, OutletDto.class);
			productDto.setId(outlet.getExternalId());
			returnValue.add(productDto);
		}

		return returnValue;
	}

	@Override
	public OutletDto getOutletByExternalId(String id) {
		OutletEntity outletEntity = outletRepository.findByExternalId(id);
		OutletDto returnValue = modelMapper.map(outletEntity, OutletDto.class);
		returnValue.setId(outletEntity.getExternalId());
		return returnValue;
	}

	@Override
	public OutletDto updateOutlet(String id, OutletDto outletDetails) {
		OutletEntity existingOutlet = outletRepository.findByExternalId(id);
		existingOutlet.setName(outletDetails.getName());

		OutletEntity updatedOutlet = outletRepository.save(existingOutlet);

		OutletDto returnValue = modelMapper.map(updatedOutlet, OutletDto.class);
		returnValue.setId(updatedOutlet.getExternalId());

		return returnValue;
	}

	@Override
	public void deleteOutlet(String id) {
		OutletEntity outletEntity = outletRepository.findByExternalId(id);
		outletRepository.delete(outletEntity);
	}

}