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
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import com.vendorpov.User.data.AddressEntity;
import com.vendorpov.User.data.AuthorityEntity;
import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.RoleRepository;
import com.vendorpov.User.data.UserEntity;
import com.vendorpov.User.data.UserRepository;
import com.vendorpov.User.shared.AddressDto;
import com.vendorpov.User.shared.RoleDto;
import com.vendorpov.User.shared.UserDto;

@Service
public class UserServiceImpl implements UserService {
	@Autowired
	UserRepository userRepository;
	@Autowired
	RoleRepository roleRepository;
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	ModelMapper modelMapper;

	@Override
	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByEmail(username);
		if(userEntity==null) throw new UsernameNotFoundException(username);
		
		Collection<GrantedAuthority> authorities = new ArrayList<>();
		Collection<RoleEntity> roles = userEntity.getRoles();
		
		roles.forEach((role)-> {
			authorities.add(new SimpleGrantedAuthority(role.getName()));
			
			Collection<AuthorityEntity> authorityEntities = role.getAuthorities();
			authorityEntities.forEach((authority)-> {
				authorities.add(new SimpleGrantedAuthority(authority.getName()));
			});
		});
		
		return new User(userEntity.getEmail(),
				userEntity.getEncryptedPassword(),
				true, true, true, true,
				authorities);
	}

	@Override
	public UserDto createUser(UserDto userDetails) {
		UserEntity userEntity = modelMapper.map(userDetails, UserEntity.class);
		userEntity.setExternalId(UUID.randomUUID().toString());
		
		Collection<RoleDto> roles = userDetails.getRoles();
		List<RoleEntity> managedRoles = new ArrayList<>();
		
		roles.forEach((role) -> {
			RoleEntity persistedRole = roleRepository.findByName(role.getName());
			if (persistedRole != null) {
				managedRoles.add(persistedRole);
			} else {
				throw new RuntimeException("Role '" + role.getName() + "' does not exist. Please create it first.");
			}
		});
		
		userEntity.setRoles(managedRoles);
		
		userRepository.save(userEntity);
		
		return modelMapper.map(userEntity, UserDto.class);
	}
	
	public UserDto getUserByEmail(String email) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByEmail(email);
		if(userEntity==null) throw new UsernameNotFoundException(email);
		UserDto dto = modelMapper.map(userEntity, UserDto.class);
		return dto;
	}

	@Override
	public UserDto getUserByExternalId(String id) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByExternalId(id);
		if(userEntity==null) throw new UsernameNotFoundException(id);
		UserDto dto = modelMapper.map(userEntity, UserDto.class);
		return dto;
	}

	@Override
	public List<UserDto> getUsers(int page, int limit) {
		List<UserDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<UserEntity> userPage = userRepository.findAll(pageRequest);
		List<UserEntity> users = userPage.getContent();
		for(UserEntity user: users) {
			UserDto userDto = modelMapper.map(user, UserDto.class);
			returnValue.add(userDto);
		}
		return returnValue;
	}

	@Override
	public UserDto updateUser(String id, UserDto userDetails) {
		UserEntity existingUser = userRepository.findByExternalId(id);

		existingUser.setFirstName(userDetails.getFirstName());
	    existingUser.setLastName(userDetails.getLastName());
		
	    if (userDetails.getAddresses() != null && !userDetails.getAddresses().isEmpty()) {
	        List<AddressEntity> updatedAddresses = new ArrayList<>();
	        
	        for (AddressDto addressDto : userDetails.getAddresses()) {
	            AddressEntity addressEntity = modelMapper.map(addressDto, AddressEntity.class);
	            addressEntity.setUserDetails(existingUser); 
	            updatedAddresses.add(addressEntity);
	        }
	        
	        existingUser.setAddresses(updatedAddresses);
	    }

		UserEntity updatedUser = userRepository.save(existingUser);

		UserDto returnValue = modelMapper.map(updatedUser, UserDto.class);
	    
		return returnValue; 
	}

	@Override
	public void deleteUser(String id) {
		UserEntity userEntity = userRepository.findByExternalId(id);
		userRepository.delete(userEntity);
	}

}
