package com.vendorpov.Products;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vendorpov.Products.data.BaseEntity;
import com.vendorpov.Products.data.OutletEntity;
import com.vendorpov.Products.data.ProductAttributeEntity;
import com.vendorpov.Products.data.ProductEntity;
import com.vendorpov.Products.data.ProductTagEntity;
import com.vendorpov.Products.data.ProductVariantEntity;
import com.vendorpov.Products.data.SupplierEntity;
import com.vendorpov.Products.shared.BaseDto;
import com.vendorpov.Products.shared.OutletDto;
import com.vendorpov.Products.shared.ProductAttributeDto;
import com.vendorpov.Products.shared.ProductDto;
import com.vendorpov.Products.shared.ProductTagDto;
import com.vendorpov.Products.shared.ProductVariantDto;
import com.vendorpov.Products.shared.SupplierDto;

@Configuration
public class ModelMapperConfig {
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		// 1. Set the Global Strategy to STRICT
		modelMapper.getConfiguration()
						.setMatchingStrategy(MatchingStrategies.STRICT)
						.setAmbiguityIgnored(true);

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

		// Configure bidirectional mapping for all subclasses using includeBase for deep recursion
		// ProductEntity <-> ProductDto
		modelMapper.typeMap(ProductEntity.class, ProductDto.class)
		.includeBase(BaseEntity.class, BaseDto.class)
		.addMappings(mapper -> mapper.map(ProductEntity::getExternalId, ProductDto::setId));
	modelMapper.typeMap(ProductDto.class, ProductEntity.class)
		.includeBase(BaseDto.class, BaseEntity.class)
		.addMappings(mapper -> {
			mapper.map(ProductDto::getId, ProductEntity::setExternalId);
			mapper.skip(ProductEntity::setId); // Prevent String-to-Long mapping
		});
		// ProductTagEntity <-> ProductTagDto	
		modelMapper.typeMap(ProductTagEntity.class, ProductTagDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(ProductTagEntity::getExternalId, ProductTagDto::setId));
		modelMapper.typeMap(ProductTagDto.class, ProductTagEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(ProductTagDto::getId, ProductTagEntity::setExternalId);
					mapper.skip(ProductTagEntity::setId); // Prevent String-to-Long mapping
				});
		
		// ProductAttributeEntity <-> ProductAttributeDto	
		modelMapper.typeMap(ProductAttributeEntity.class, ProductAttributeDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(ProductAttributeEntity::getExternalId, ProductAttributeDto::setId));
		modelMapper.typeMap(ProductAttributeDto.class, ProductAttributeEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(ProductAttributeDto::getId, ProductAttributeEntity::setExternalId);
					mapper.skip(ProductAttributeEntity::setId); // Prevent String-to-Long mapping
				});
		
//		// ProductVariantEntity <-> ProductVariantDto
		modelMapper.typeMap(ProductVariantEntity.class, ProductVariantDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(ProductVariantEntity::getExternalId, ProductVariantDto::setId));
		modelMapper.typeMap(ProductVariantDto.class, ProductVariantEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(ProductVariantDto::getId, ProductVariantEntity::setExternalId);
					mapper.skip(ProductVariantEntity::setId);
				});
		
		// BrandEntity <-> BrandDto
//		modelMapper.typeMap(BrandEntity.class, BrandDto.class).includeBase(BaseEntity.class, BaseDto.class)
//				.addMappings(mapper -> mapper.map(BrandEntity::getExternalId, BrandDto::setId));
//		modelMapper.typeMap(BrandDto.class, BrandEntity.class).includeBase(BaseDto.class, BaseEntity.class)
//				.addMappings(mapper -> {
//					mapper.map(BrandDto::getId, BrandEntity::setExternalId);
//					mapper.skip(BrandEntity::setId); // Prevent String-to-Long mapping
//				});

//		// SupplierEntity <-> SupplierDto
		modelMapper.typeMap(SupplierEntity.class, SupplierDto.class).includeBase(BaseEntity.class, BaseDto.class)
				.addMappings(mapper -> mapper.map(SupplierEntity::getExternalId, SupplierDto::setId));
		modelMapper.typeMap(SupplierDto.class, SupplierEntity.class).includeBase(BaseDto.class, BaseEntity.class)
				.addMappings(mapper -> {
					mapper.map(SupplierDto::getId, SupplierEntity::setExternalId);
					mapper.skip(SupplierEntity::setId);
				});

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
