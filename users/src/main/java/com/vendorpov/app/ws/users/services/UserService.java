package com.vendorpov.app.ws.users.services;

import com.vendorpov.app.ws.users.models.request.UserDetailsRequestModel;
import com.vendorpov.app.ws.users.models.response.UserRest;

public interface UserService {
	UserRest createUser(UserDetailsRequestModel userDetails);
}
