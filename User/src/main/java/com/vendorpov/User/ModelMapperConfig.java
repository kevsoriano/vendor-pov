package com.vendorpov.User;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.vendorpov.User.data.AddressEntity;
import com.vendorpov.User.data.AuthorityEntity;
import com.vendorpov.User.data.BaseEntity;
import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.UserEntity;
import com.vendorpov.User.shared.AddressDto;
import com.vendorpov.User.shared.AuthorityDto;
import com.vendorpov.User.shared.BaseDto;
import com.vendorpov.User.shared.RoleDto;
import com.vendorpov.User.shared.UserDto;

@Configuration
public class ModelMapperConfig {
	@Bean
	public ModelMapper modelMapper() {
		ModelMapper modelMapper = new ModelMapper();

		// 1. Set the Global Strategy to STRICT
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		// 2. Configure bidirectional mapping for BaseEntity <-> BaseDto
		// Entity (externalId) -> DTO (id)
		modelMapper.typeMap(BaseEntity.class, BaseDto.class).addMappings(mapper -> {
			mapper.map(BaseEntity::getExternalId, BaseDto::setId);
		});

		// DTO (id) -> Entity (externalId)
		modelMapper.typeMap(BaseDto.class, BaseEntity.class).addMappings(mapper -> {
			mapper.map(BaseDto::getId, BaseEntity::setExternalId);
		});

		// 3. Configure bidirectional mapping for all subclasses
		// UserEntity <-> UserDto
		modelMapper.typeMap(UserEntity.class, UserDto.class).addMappings(mapper -> {
			mapper.map(UserEntity::getExternalId, UserDto::setId);
		});
		modelMapper.typeMap(UserDto.class, UserEntity.class).addMappings(mapper -> {
			mapper.map(UserDto::getId, UserEntity::setExternalId);
		});

		// RoleEntity <-> RoleDto
		modelMapper.typeMap(RoleEntity.class, RoleDto.class).addMappings(mapper -> {
			mapper.map(RoleEntity::getExternalId, RoleDto::setId);
		});
		modelMapper.typeMap(RoleDto.class, RoleEntity.class).addMappings(mapper -> {
			mapper.map(RoleDto::getId, RoleEntity::setExternalId);
		});

		// AuthorityEntity <-> AuthorityDto
		modelMapper.typeMap(AuthorityEntity.class, AuthorityDto.class).addMappings(mapper -> {
			mapper.map(AuthorityEntity::getExternalId, AuthorityDto::setId);
		});
		modelMapper.typeMap(AuthorityDto.class, AuthorityEntity.class).addMappings(mapper -> {
			mapper.map(AuthorityDto::getId, AuthorityEntity::setExternalId);
		});

		// AddressEntity <-> AddressDto
		modelMapper.typeMap(AddressEntity.class, AddressDto.class).addMappings(mapper -> {
			mapper.map(AddressEntity::getExternalId, AddressDto::setId);
		});
		modelMapper.typeMap(AddressDto.class, AddressEntity.class).addMappings(mapper -> {
			mapper.map(AddressDto::getId, AddressEntity::setExternalId);
		});

		return modelMapper;
	}
}
