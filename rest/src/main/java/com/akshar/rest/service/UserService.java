package com.akshar.rest.service;

import com.akshar.rest.model.LoginModel;
import com.akshar.rest.model.UserModel;

public interface UserService {
    void createCustomer(UserModel userModel);

    UserModel getUserByEmail(String email);

    boolean login(LoginModel loginModel);

    boolean encodePasswords(String email);
}
