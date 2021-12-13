package com.akshar.rest.service;

import com.akshar.rest.model.LoginModel;
import com.akshar.rest.model.UserModel;

public interface UserService {
    void createCustomer(UserModel userModel);

    boolean login(LoginModel loginModel);
}
