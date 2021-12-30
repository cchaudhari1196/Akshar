package com.akshar.rest.controller;


import com.akshar.rest.entities.User;
import com.akshar.rest.model.GiveAuthorityModel;
import com.akshar.rest.model.UserModel;
import com.akshar.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

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

    @PostMapping("/giveAuthority")
    public ResponseEntity giveAuthority(@RequestBody GiveAuthorityModel giveAuthority){
        try {
            userService.giveAuthority(giveAuthority);
        } catch (Exception e) {
            return new ResponseEntity(e.getMessage(), HttpStatus.NOT_ACCEPTABLE);
        }
        return new ResponseEntity("Authority Given", HttpStatus.OK);
    }

    @GetMapping("/{email}")
    public ResponseEntity getByMail(@PathVariable(value = "email") String email){
        return new ResponseEntity(userService.getUserByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/profile")
    public ResponseEntity getCurrentProfile(){
        String currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity(userService.getUserByEmail(currentUser), HttpStatus.OK);
    }

}
