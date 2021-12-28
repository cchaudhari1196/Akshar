package com.akshar.rest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/login")
public class LoginController {
    @PostMapping
    public ResponseEntity login(){
        var currentUser = SecurityContextHolder.getContext().getAuthentication().getName();
        return new ResponseEntity(currentUser + " Logged In", HttpStatus.OK);
    }
}
