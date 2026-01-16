package com.vendorpov.User.services;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.vendorpov.User.data.AuthorityEntity;
import com.vendorpov.User.data.AuthorityRepository;
import com.vendorpov.User.shared.AuthorityDto;

@Service
public class AuthorityServiceImpl implements AuthorityService {
	@Autowired
	AuthorityRepository authorityRepository;
	@Autowired
	ModelMapper modelMapper;

	@Override
	public AuthorityDto createAuthority(AuthorityDto authorityDetails) {
		authorityDetails.setId(UUID.randomUUID().toString());
		
		AuthorityEntity authorityEntity = modelMapper.map(authorityDetails, AuthorityEntity.class);
		
		authorityRepository.save(authorityEntity);
		
		return modelMapper.map(authorityEntity, AuthorityDto.class);
	}

	@Override
	public List<AuthorityDto> getAuthorities(int page, int limit) {
		List<AuthorityDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<AuthorityEntity> authorityPage = authorityRepository.findAll(pageRequest);
		List<AuthorityEntity> authorities = authorityPage.getContent();
		for(AuthorityEntity authority: authorities) {
			AuthorityDto authorityDto = modelMapper.map(authority, AuthorityDto.class);
			returnValue.add(authorityDto);
		}
		return returnValue;
	}

	@Override
	public AuthorityDto getAuthorityByExternalId(String id) {
		AuthorityEntity authorityEntity = authorityRepository.findByExternalId(id);
//		if(roleEntity==null) throw new UsernameNotFoundException(id);
		AuthorityDto dto = modelMapper.map(authorityEntity, AuthorityDto.class);
		return dto;
	}

	@Override
	public AuthorityDto updateAuthority(String id, AuthorityDto authorityDetails) {
		AuthorityEntity existingAuthority = authorityRepository.findByExternalId(id);

		existingAuthority.setName(authorityDetails.getName());
		
		AuthorityEntity updatedAuthority = authorityRepository.save(existingAuthority);
		
		AuthorityDto returnValue = modelMapper.map(updatedAuthority, AuthorityDto.class);
	    
		return returnValue; 
	}

	@Override
	public void deleteAuthority(String id) {
		AuthorityEntity authorityEntity = authorityRepository.findByExternalId(id);
		authorityRepository.delete(authorityEntity);
	}

}
