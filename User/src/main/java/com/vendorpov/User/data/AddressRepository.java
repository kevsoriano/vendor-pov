package com.vendorpov.User.data;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AddressRepository extends CrudRepository<AddressEntity, Long>, PagingAndSortingRepository<AddressEntity, Long> {
	List<AddressEntity> findAllByUserDetails(UserEntity userDetails);
	AddressEntity findByExternalId(String id);
//	AddressEntity findByType
}
