package com.vendorpov.User.data;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorityRepository extends CrudRepository<AuthorityEntity, Long>, PagingAndSortingRepository<AuthorityEntity, Long> {
	AuthorityEntity findByName(String name);
	AuthorityEntity findByExternalId(String id);
}
