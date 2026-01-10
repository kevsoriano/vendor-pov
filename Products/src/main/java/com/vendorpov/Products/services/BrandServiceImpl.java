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

import com.vendorpov.Products.data.BrandEntity;
import com.vendorpov.Products.data.BrandRepository;
import com.vendorpov.Products.shared.BrandDto;

@Service
public class BrandServiceImpl implements BrandService {
	@Autowired
	BrandRepository brandRepository;

	@Override
	public List<BrandDto> getBrands(int page, int limit) {
		List<BrandDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<BrandEntity> brandPage = brandRepository.findAll(pageRequest);
		List<BrandEntity> brands = brandPage.getContent();
		for(BrandEntity brand: brands) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			BrandDto productDto = modelMapper.map(brand, BrandDto.class);
			returnValue.add(productDto);
		}
		return returnValue;
	}

	@Override
	public BrandDto createBrand(BrandDto brandDetails) {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		BrandEntity brandEntity = modelMapper.map(brandDetails, BrandEntity.class);
		brandEntity.setBrandId(UUID.randomUUID().toString());
		brandRepository.save(brandEntity);
		
		return modelMapper.map(brandEntity, BrandDto.class);
	}

	@Override
	public BrandDto getBrandByBrandId(String brandId) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public BrandDto updateBrand(String brandId, BrandDto brandDetails) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void deleteBrand(String brandId) {
		// TODO Auto-generated method stub
		
	}

}
