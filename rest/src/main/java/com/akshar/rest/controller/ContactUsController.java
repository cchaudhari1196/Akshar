package com.akshar.rest.controller;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/contactUs")
public class ContactUsController {
    @GetMapping
    public ResponseEntity contact(){
        return new ResponseEntity("You can Contact me at 8830703113", HttpStatus.OK);
    }
}
