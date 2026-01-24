package com.vendorpov.User;

import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.vendorpov.User.data.AuthorityEntity;
import com.vendorpov.User.data.AuthorityRepository;
import com.vendorpov.User.data.RoleEntity;
import com.vendorpov.User.data.RoleRepository;
import com.vendorpov.User.data.UserEntity;
import com.vendorpov.User.data.UserRepository;
import com.vendorpov.User.shared.RolesEnum;

import jakarta.transaction.Transactional;

@Component
public class InitialUsersSetup {
	@Autowired
	AuthorityRepository authorityRepository;
	
	@Autowired
	RoleRepository roleRepository;
	
	@Autowired
	BCryptPasswordEncoder bCryptPasswordEncoder;
	
	@Autowired
	UserRepository usersRepository;
	
	private final Logger logger = LoggerFactory.getLogger(this.getClass());
	
	@Transactional
	@EventListener
	public void onApplicationEvent(ApplicationReadyEvent event) {
		logger.info("From Application Ready Event");
		
		AuthorityEntity readAuthority = createAuthority("READ");
		AuthorityEntity writeAuthority = createAuthority("WRITE");
		AuthorityEntity deleteAuthority = createAuthority("DELETE");
		
		createRole(RolesEnum.ROLE_USER.name(), new HashSet<>(Arrays.asList(readAuthority, writeAuthority)));
		RoleEntity roleAdmin = createRole(RolesEnum.ROLE_ADMIN.name(), new HashSet<>(Arrays.asList(readAuthority, writeAuthority, deleteAuthority)));
		
		if(roleAdmin == null) return;
		
		UserEntity adminUser = new UserEntity();
		adminUser.setFirstName("admin");
		adminUser.setLastName("admin");
		adminUser.setEmail("admin@test.com");
		adminUser.setEncryptedPassword(bCryptPasswordEncoder.encode("12345678"));
		adminUser.setRoles(new HashSet<>(Arrays.asList(roleAdmin)));
		
		UserEntity storedAdminUser = usersRepository.findByEmail("admin@test.com");
		
		if(storedAdminUser == null) {
			usersRepository.save(adminUser);
		}
		
	}
	
	@Transactional
	private AuthorityEntity createAuthority(String name) {
		
		AuthorityEntity authority = authorityRepository.findByName(name);
		
		if(authority == null) {
			authority = new AuthorityEntity(name);
			authorityRepository.save(authority);
		}
		
		return authority;
	}
	
	@Transactional
	private RoleEntity createRole(String name, Set<AuthorityEntity> authorities) {
		
		RoleEntity role = roleRepository.findByName(name);
		
		if(role == null) {
			role = new RoleEntity(name, authorities);
			roleRepository.save(role);
		}
		
		return role;
		
	}
}
