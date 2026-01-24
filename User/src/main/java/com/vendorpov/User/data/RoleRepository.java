package com.vendorpov.User.data;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

import com.vendorpov.User.shared.RoleCountDto;

@Repository
public interface RoleRepository extends CrudRepository<RoleEntity, Long>, PagingAndSortingRepository<RoleEntity, Long> {
	RoleEntity findByExternalId(String id);

	RoleEntity findByName(String name);

	List<RoleEntity> findByNameIn(List<String> names);

	@Query(value = "SELECT new com.vendorpov.User.shared.RoleCountDto(r.externalId, r.name, COUNT(u)) " + "FROM users u JOIN u.roles r "
			+ "GROUP BY r.externalId, r.name", countQuery = "SELECT COUNT(DISTINCT r.externalId) FROM users u JOIN u.roles r")
	Page<RoleCountDto> findAllRolesWithUserCounts(Pageable pageable);
}
