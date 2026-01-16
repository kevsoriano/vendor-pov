package com.vendorpov.User.services;

import java.util.ArrayList;
import java.util.Collection;
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
import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.RoleRepository;
import com.vendorpov.User.shared.AuthorityDto;
import com.vendorpov.User.shared.RoleDto;

@Service
public class RoleServiceImpl implements RoleService {

	@Autowired
	RoleRepository roleRepository;
	@Autowired
	AuthorityRepository authorityRepository;
	@Autowired
	ModelMapper modelMapper;

	@Override
	public RoleDto createRole(RoleDto roleDetails) {
		RoleEntity roleEntity = modelMapper.map(roleDetails, RoleEntity.class);
		roleEntity.setExternalId(UUID.randomUUID().toString());
		
		Collection<AuthorityDto> authorities = roleDetails.getAuthorities();
		List<AuthorityEntity> managedAuthorities = new ArrayList<>();
		
		authorities.forEach((authority) -> {
			AuthorityEntity persistedAuthority = authorityRepository.findByName(authority.getName());
			if (persistedAuthority != null) {
				managedAuthorities.add(persistedAuthority);
			} else {
				throw new RuntimeException("Authority '" + authority.getName() + "' does not exist. Please create it first.");
			}
		});
		
		roleEntity.setAuthorities(managedAuthorities);
		
		roleRepository.save(roleEntity);
		
		return modelMapper.map(roleEntity, RoleDto.class);
	}

	@Override
	public List<RoleDto> getRoles(int page, int limit) {
		List<RoleDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<RoleEntity> rolePage = roleRepository.findAll(pageRequest);
		List<RoleEntity> roles = rolePage.getContent();
		for(RoleEntity role: roles) {
			RoleDto roleDto = modelMapper.map(role, RoleDto.class);
			returnValue.add(roleDto);
		}
		return returnValue;
	}

	@Override
	public RoleDto getRoleByExternalId(String id) {
		RoleEntity roleEntity = roleRepository.findByExternalId(id);
		if(roleEntity==null) throw new NullPointerException(id + " does not exist.");
		RoleDto dto = modelMapper.map(roleEntity, RoleDto.class);
		return dto;
	}

	@Override
	public RoleDto updateRole(String id, RoleDto roleDetails) {
		RoleEntity existingRole = roleRepository.findByExternalId(id);

		existingRole.setName(roleDetails.getName());
		
		Collection<AuthorityDto> authorities = roleDetails.getAuthorities();
		List<AuthorityEntity> managedAuthorities = new ArrayList<>();
	    if (roleDetails.getAuthorities() != null && !roleDetails.getAuthorities().isEmpty()) {
			authorities.forEach((authority) -> {
				AuthorityEntity persistedAuthority = authorityRepository.findByExternalId(authority.getId());
				if (persistedAuthority != null) {
					persistedAuthority.setName(authority.getName());
					managedAuthorities.add(persistedAuthority);
				} else {
					throw new RuntimeException("Authority '" + authority.getId() + "' does not exist. Please create it first.");
				}
			});
	    }
	    existingRole.setAuthorities(managedAuthorities);
		
		RoleEntity updatedRole = roleRepository.save(existingRole);
		
		RoleDto returnValue = modelMapper.map(updatedRole, RoleDto.class);
	    
		return returnValue; 
	}

	@Override
	public void deleteRole(String id) {
		RoleEntity userEntity = roleRepository.findByExternalId(id);
		roleRepository.delete(userEntity);
	}

}
