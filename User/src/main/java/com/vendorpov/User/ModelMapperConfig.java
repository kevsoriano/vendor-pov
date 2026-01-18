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

		// Set the Global Strategy to STRICT
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

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
		// UserEntity <-> UserDto
		modelMapper.typeMap(UserEntity.class, UserDto.class)
			.includeBase(BaseEntity.class, BaseDto.class)
			.addMappings(mapper -> mapper.map(UserEntity::getExternalId, UserDto::setId));
		modelMapper.typeMap(UserDto.class, UserEntity.class)
			.includeBase(BaseDto.class, BaseEntity.class)
			.addMappings(mapper -> {
				mapper.map(UserDto::getId, UserEntity::setExternalId);
				mapper.skip(UserEntity::setId); // Prevent String-to-Long mapping
			});

		// RoleEntity <-> RoleDto
		modelMapper.typeMap(RoleEntity.class, RoleDto.class)
			.includeBase(BaseEntity.class, BaseDto.class)
			.addMappings(mapper -> mapper.map(RoleEntity::getExternalId, RoleDto::setId));
		modelMapper.typeMap(RoleDto.class, RoleEntity.class)
			.includeBase(BaseDto.class, BaseEntity.class)
			.addMappings(mapper -> {
				mapper.map(RoleDto::getId, RoleEntity::setExternalId);
				mapper.skip(RoleEntity::setId);
			});

		// AuthorityEntity <-> AuthorityDto
		modelMapper.typeMap(AuthorityEntity.class, AuthorityDto.class)
			.includeBase(BaseEntity.class, BaseDto.class)
			.addMappings(mapper -> mapper.map(AuthorityEntity::getExternalId, AuthorityDto::setId));
		modelMapper.typeMap(AuthorityDto.class, AuthorityEntity.class)
			.includeBase(BaseDto.class, BaseEntity.class)
			.addMappings(mapper -> {
				mapper.map(AuthorityDto::getId, AuthorityEntity::setExternalId);
				mapper.skip(AuthorityEntity::setId);
			});

		// AddressEntity <-> AddressDto
		modelMapper.typeMap(AddressEntity.class, AddressDto.class)
			.includeBase(BaseEntity.class, BaseDto.class)
			.addMappings(mapper -> mapper.map(AddressEntity::getExternalId, AddressDto::setId));
		modelMapper.typeMap(AddressDto.class, AddressEntity.class)
			.includeBase(BaseDto.class, BaseEntity.class)
			.addMappings(mapper -> {
				mapper.map(AddressDto::getId, AddressEntity::setExternalId);
				mapper.skip(AddressEntity::setId);
			});

		// Configure bidirectional mapping for List<String> roles to List<RoleDto>
		// UserRequestModel <-> UserDto
//		modelMapper.typeMap(UserRequestModel.class, UserDto.class)
//				.addMappings(mapper -> mapper.using(new Converter<List<String>, List<RoleDto>>() {
//					@Override
//					public List<RoleDto> convert(MappingContext<List<String>, List<RoleDto>> context) {
//						List<String> roleNames = context.getSource();
//						if (roleNames == null)
//							return null;
//						return roleNames.stream().map(RoleDto::new).collect(Collectors.toList());
//					}
//				}).map(UserRequestModel::getRoles, UserDto::setRoles));
//
//		modelMapper.typeMap(UserDto.class, UserRequestModel.class)
//				.addMappings(mapper -> mapper.using(new Converter<List<RoleDto>, List<String>>() {
//					@Override
//					public List<String> convert(MappingContext<List<RoleDto>, List<String>> context) {
//						List<RoleDto> roles = context.getSource();
//						if (roles == null)
//							return null;
//						return roles.stream().map(RoleDto::getName).collect(Collectors.toList());
//					}
//				}).map(UserDto::getRoles, UserRequestModel::setRoles));

		return modelMapper;
	}
}
