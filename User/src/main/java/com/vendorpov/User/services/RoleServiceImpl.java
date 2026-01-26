package com.vendorpov.User.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
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
import com.vendorpov.User.exceptions.ResourceNotFoundException;
import com.vendorpov.User.shared.AuthorityDto;
import com.vendorpov.User.shared.RoleCountDto;
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
		
		Set<AuthorityDto> authorities = roleDetails.getAuthorities();
		Set<AuthorityEntity> managedAuthorities = new HashSet<>();
		
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
	public List<RoleCountDto> getRolesWithUserCount(int page, int limit) {
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<RoleCountDto> rolePage = roleRepository.findAllRolesWithUserCounts(pageRequest);
		List<RoleCountDto> roles = rolePage.getContent();
		return roles;
	}

	@Override
	public RoleDto getRoleByExternalId(String id) {
		RoleEntity roleEntity = roleRepository.findByExternalId(id);
		if(roleEntity==null) throw new ResourceNotFoundException(id + " does not exist.");
		RoleDto dto = modelMapper.map(roleEntity, RoleDto.class);
		return dto;
	}

	@Override
	public RoleDto updateRole(String id, RoleDto roleDetails) {
		RoleEntity existingRole = roleRepository.findByExternalId(id);
		
		if(existingRole==null) throw new ResourceNotFoundException(id + " does not exist.");

		existingRole.setName(roleDetails.getName());
		
		Set<AuthorityDto> authorities = roleDetails.getAuthorities();
	    if (authorities != null && !authorities.isEmpty()) {
	    	Set<AuthorityEntity> managedAuthorities = new HashSet<>();
			authorities.forEach((authority) -> {
				AuthorityEntity persistedAuthority = authorityRepository.findByExternalId(authority.getId());
				if (persistedAuthority != null) {
					// Update role memberships only; ignore modifications to existing authority attributes.
					// persistedAuthority.setName(authority.getName());
					managedAuthorities.add(persistedAuthority);
				} else {
					throw new ResourceNotFoundException("Authority '" + authority.getId() + "' does not exist. Please create it first.");
				}
			});
			existingRole.setAuthorities(managedAuthorities);
	    }
		
		RoleEntity updatedRole = roleRepository.save(existingRole);
		
		RoleDto returnValue = modelMapper.map(updatedRole, RoleDto.class);
	    
		return returnValue; 
	}

	@Override
	public void deleteRole(String id) {
		RoleEntity roleEntity = roleRepository.findByExternalId(id);
		if(roleEntity==null) throw new ResourceNotFoundException(id + " does not exist.");
		roleRepository.delete(roleEntity);
	}

}
