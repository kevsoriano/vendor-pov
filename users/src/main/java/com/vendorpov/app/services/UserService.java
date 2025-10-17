package com.vendorpov.app.services;

import com.vendorpov.app.models.request.UserDetailsRequestModel;
import com.vendorpov.app.models.response.UserRest;

public interface UserService {
	UserRest createUser(UserDetailsRequestModel userDetails);
}
