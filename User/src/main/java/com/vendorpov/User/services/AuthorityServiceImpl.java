package com.vendorpov.User.services;

import java.lang.reflect.Type;
import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.vendorpov.User.data.AuthorityEntity;
import com.vendorpov.User.data.AuthorityRepository;
import com.vendorpov.User.shared.AuthorityDto;

@Service
public class AuthorityServiceImpl implements AuthorityService {
	@Autowired
	AuthorityRepository authorityRepository;
	
	
	@Override
	public List<AuthorityDto> getAuthorities() {
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		List<AuthorityDto> returnValue = new ArrayList<>();
		List<AuthorityEntity> authorities = new ArrayList<>();
		
		authorityRepository.findAll().forEach(authorities::add);
		Type listType = new TypeToken<List<AuthorityDto>>() {}.getType();
		returnValue = modelMapper.map(authorities, listType);
		
		return returnValue;
	}

}
