package com.vendorpov.User.services;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.RoleRepository;
import com.vendorpov.User.shared.RoleDto;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	RoleRepository roleRepository;
	
	@Override
	public List<RoleDto> getRoles() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		List<RoleDto> roles = new ArrayList<>();
		List<RoleEntity> roleEntities = new ArrayList<>();
		
		roleRepository.findAll().forEach(roleEntities::add);
		Type listType = new TypeToken<List<RoleDto>>() {}.getType();
		roles = modelMapper.map(roleEntities, listType);
		
		return roles;
	}

}
