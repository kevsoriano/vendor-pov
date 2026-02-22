package com.vendorpov.Sale;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vendorpov.Sale.data.BaseEntity;
import com.vendorpov.Sale.data.SaleEntity;
import com.vendorpov.Sale.data.SaleLineItemEntity;
import com.vendorpov.Sale.shared.BaseDto;
import com.vendorpov.Sale.shared.SaleDto;
import com.vendorpov.Sale.shared.SaleLineItemDto;

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
		// SaleEntity <-> SaleDto
		modelMapper.typeMap(SaleEntity.class, SaleDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(SaleEntity::getExternalId, SaleDto::setId));
		modelMapper.typeMap(SaleDto.class, SaleEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(SaleDto::getId, SaleEntity::setExternalId);
					mapper.skip(SaleEntity::setId); // Prevent String-to-Long mapping
				});
		
		// SaleLineItemEntity <-> SaleLineItemDto
		modelMapper.typeMap(SaleLineItemEntity.class, SaleLineItemDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(SaleLineItemEntity::getExternalId, SaleLineItemDto::setId));
		modelMapper.typeMap(SaleLineItemDto.class, SaleLineItemEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(SaleLineItemDto::getId, SaleLineItemEntity::setExternalId);
					mapper.skip(SaleLineItemEntity::setId); // Prevent String-to-Long mapping
				});

		return modelMapper;
	}
}
