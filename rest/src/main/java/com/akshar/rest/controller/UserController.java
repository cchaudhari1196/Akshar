package com.akshar.rest.controller;


import com.akshar.rest.model.UserModel;
import com.akshar.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/create")
    public ResponseEntity create(@RequestBody UserModel userModel){
        userService.createCustomer(userModel);
        return new ResponseEntity("Created", HttpStatus.OK);
    }
}
