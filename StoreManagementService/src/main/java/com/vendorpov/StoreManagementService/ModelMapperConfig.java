package com.vendorpov.StoreManagementService;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vendorpov.StoreManagementService.data.BaseEntity;
import com.vendorpov.StoreManagementService.data.OutletEntity;
import com.vendorpov.StoreManagementService.shared.BaseDto;
import com.vendorpov.StoreManagementService.shared.OutletDto;

@Configuration
public class ModelMapperConfig {
	@Bean
	ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		// 1. Set the Global Strategy to STRICT
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		// 2. Explicitly map the ID mismatch
		// Configure bidirectional mapping for BaseEntity <-> BaseDto
		// Entity (externalId) -> DTO (id)
		modelMapper.typeMap(BaseEntity.class, BaseDto.class).addMappings(mapper -> {
			mapper.map(BaseEntity::getExternalId, BaseDto::setId);
		});

		// DTO (id) -> Entity (externalId)
		modelMapper.typeMap(BaseDto.class, BaseEntity.class).addMappings(mapper -> {
			mapper.map(BaseDto::getId, BaseEntity::setExternalId);
			mapper.skip(BaseEntity::setId); // Prevent String-to-Long mapping
		});

		// Configure bidirectional mapping for all subclasses using includeBase for deep
		// recursion
//		// OutletEntity <-> OutletDto
		modelMapper.typeMap(OutletEntity.class, OutletDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(OutletEntity::getExternalId, OutletDto::setId));
		modelMapper.typeMap(OutletDto.class, OutletEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(OutletDto::getId, OutletEntity::setExternalId);
					mapper.skip(OutletEntity::setId);
				});

		return modelMapper;
	}
}
