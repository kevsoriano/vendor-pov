package com.vendorpov.User.services;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
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

import com.vendorpov.User.data.AuthorityEntity;
import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.UserEntity;
import com.vendorpov.User.data.UserRepository;
import com.vendorpov.User.shared.AddressDto;
import com.vendorpov.User.shared.UserDto;

@Service
public class UserServiceImpl implements UserService {
	UserRepository userRepository;
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	public UserServiceImpl(UserRepository userRepository, BCryptPasswordEncoder bCryptPasswordEncoder) {
		this.userRepository = userRepository;
		this.bCryptPasswordEncoder = bCryptPasswordEncoder;
	}

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
		userDetails.setUserId(UUID.randomUUID().toString());
		userDetails.setEncryptedPassword(bCryptPasswordEncoder.encode(userDetails.getPassword()));
		
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
		
		UserEntity userEntity = modelMapper.map(userDetails, UserEntity.class);
		userRepository.save(userEntity);
		UserDto returnValue = modelMapper.map(userEntity, UserDto.class);
		
		return returnValue;
	}
	
	public UserDto getUserByEmail(String email) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByEmail(email);
		if(userEntity==null) throw new UsernameNotFoundException(email);
		return new ModelMapper().map(userEntity, UserDto.class);
	}

	@Override
	public UserDto getUserByUserId(String userId) throws UsernameNotFoundException {
		UserEntity userEntity = userRepository.findByUserId(userId);
		if(userEntity==null) throw new UsernameNotFoundException(userId);
		return new ModelMapper().map(userEntity, UserDto.class);
	}

	@Override
	public List<UserDto> getUsers(int page, int limit) {
		List<UserDto> returnValue = new ArrayList<>();
		Pageable pageRequest = PageRequest.of(page, limit);
		Page<UserEntity> userPage = userRepository.findAll(pageRequest);
		List<UserEntity> users = userPage.getContent();
		for(UserEntity user: users) {
			ModelMapper modelMapper = new ModelMapper();
			modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

			UserDto userDto = modelMapper.map(user, UserDto.class);
			returnValue.add(userDto);
		}
		return returnValue;
	}

	@Override
	public UserDto updateUser(String userId, UserDto userDetails) {
		List<AddressDto> addresses = new ArrayList<>();
		ModelMapper modelMapper = new ModelMapper();
		modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);

		UserEntity userEntity = userRepository.findByUserId(userId);

		UserDto userDto = modelMapper.map(userEntity, UserDto.class);
		userDto.setFirstName(userDetails.getFirstName());
		userDto.setLastName(userDetails.getLastName());
		for(int i = 0; i<userDetails.getAddresses().size();i++) {
			AddressDto address = userDetails.getAddresses().get(i);
			address.setAddressId(userEntity.getAddresses().get(i).getAddressId());
			address.setId(userEntity.getAddresses().get(i).getId());
			address.setUserDetails(userDto.getAddresses().get(i).getUserDetails());
			addresses.add(address);
		}
		userDto.setAddresses(addresses);

		UserEntity user = modelMapper.map(userDto, UserEntity.class);
		UserEntity updatedUser = userRepository.save(user);

		UserDto returnValue = modelMapper.map(updatedUser, UserDto.class);
		return returnValue;
	}

	@Override
	public void deleteUser(String userId) {
		UserEntity userEntity = userRepository.findByUserId(userId);
		userRepository.delete(userEntity);
	}

}
