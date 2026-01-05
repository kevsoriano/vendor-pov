package com.vendorpov.Products.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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

	@Override
	public OutletDto createOutlet(OutletDto outletDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		OutletEntity outletEntity = modelMapper.map(outletDetails, OutletEntity.class);
		outletEntity.setOutletId(UUID.randomUUID().toString());
		outletRepository.save(outletEntity);
		OutletDto returnValue = modelMapper.map(outletEntity, OutletDto.class);
		
		return returnValue;
	}

	@Override
	public List<OutletDto> getOutlets(int page, int limit) {
		List<OutletDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<OutletEntity> outletPage = outletRepository.findAll(pageRequest);
		List<OutletEntity> outlets = outletPage.getContent();
		for(OutletEntity outlet: outlets) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			OutletDto productDto = modelMapper.map(outlet, OutletDto.class);
			returnValue.add(productDto);
		}
		return returnValue;
	}

	@Override
	public OutletDto getOutletByOutletId(String outletId) {
		OutletEntity outletEntity = outletRepository.findByOutletId(outletId);
//		if(productEntity==null) throw new UsernameNotFoundException(productId);
		return new ModelMapper().map(outletEntity, OutletDto.class);
	}

	@Override
	public OutletDto updateOutlet(String outletId, OutletDto outletDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		OutletEntity outletEntity = outletRepository.findByOutletId(outletId);
		OutletDto outletDto = modelMapper.map(outletEntity, OutletDto.class);
		
		outletDto.setName(outletDetails.getName());
		
		OutletEntity outlet = modelMapper.map(outletDto, OutletEntity.class);
		OutletEntity updatedProduct = outletRepository.save(outlet);

		OutletDto returnValue = modelMapper.map(updatedProduct, OutletDto.class);
		return returnValue;
	}

	@Override
	public void deleteOutlet(String outletId) {
		OutletEntity outletEntity = outletRepository.findByOutletId(outletId);
		outletRepository.delete(outletEntity);
	}

}
