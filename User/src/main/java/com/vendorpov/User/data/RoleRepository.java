package com.vendorpov.User.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long>, PagingAndSortingRepository<RoleEntity, Long> {
	RoleEntity findByName(String name);
	List<RoleEntity> findByNameIn(List<String> names);
}
