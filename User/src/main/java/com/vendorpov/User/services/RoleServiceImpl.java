package com.vendorpov.User.services;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.RoleRepository;
import com.vendorpov.User.shared.RoleDto;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	RoleRepository roleRepository;
	@Autowired
	ModelMapper modelMapper; 
	
	@Override
	public List<RoleDto> getRoles() {
		List<RoleDto> roles = new ArrayList<>();
		List<RoleEntity> roleEntities = new ArrayList<>();
		
		roleRepository.findAll().forEach(roleEntities::add);
		for (RoleEntity roleEntity : roleEntities) {
			RoleDto dto = modelMapper.map(roleEntity, RoleDto.class);
			dto.setId(roleEntity.getExternalId());
			roles.add(dto);
		}
		
		return roles;
	}

}
