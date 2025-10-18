package com.vendorpov.users.services;

import com.vendorpov.users.models.request.UserDetailsRequestModel;
import com.vendorpov.users.models.response.UserRest;

public interface UserService {
	UserRest createUser(UserDetailsRequestModel userDetails);
}
