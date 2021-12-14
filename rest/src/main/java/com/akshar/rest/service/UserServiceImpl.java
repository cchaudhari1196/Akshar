package com.akshar.rest.service;

import com.akshar.rest.entities.User;
import com.akshar.rest.model.LoginModel;
import com.akshar.rest.model.UserModel;
import com.akshar.rest.persistence.UserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService{

    Logger logger = LoggerFactory.getLogger(this.getClass());

    @Autowired
    UserRepository userRepository;

    @Override
    public void createCustomer(UserModel userModel) {
        logger.info("Creation request for customer {}", userModel);
        User cust = userModel.createModel();
        userRepository.save(cust);
    }

    @Override
    public UserModel getUserByEmail(String email){
        User user = userRepository.findByEmailAddress(email);
        return UserModel.createModel(user);
    }

    // Login
    @Override
    public boolean login(LoginModel loginModel) {
        logger.info("Login request for customer {} with password {}", loginModel.getEmail(), loginModel.getPassword());
        User user = userRepository.findByEmailAddress(loginModel.getEmail());
        if (user != null) {
            if (user.getPassword().equals(loginModel.getPassword())) {
                return true;
            }
        }

        return false;
    }

    @Override
    public boolean encodePasswords(String email) {
        User user = userRepository.findByEmailAddress(email);
        user.setPassword(new BCryptPasswordEncoder().encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

//    // Fetches full profile of a specific customer
//
//    public CustomerDTO getCustomerProfile(Long phoneNo) {
//        CustomerDTO custDTO = null;
//        logger.info("Profile request for customer {}", phoneNo);
//        Optional<Customer> optCust = userDAO.findById(phoneNo);
//        if (optCust.isPresent()) {
//            Customer cust = optCust.get();
//            custDTO = CustomerDTO.valueOf(cust);
//        }
//        logger.info("Profile for customer : {}", custDTO);
//        return custDTO;
//    }
}
