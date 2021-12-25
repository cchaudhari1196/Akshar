package com.akshar.rest.controller;


import com.akshar.rest.model.GiveAuthorityModel;
import com.akshar.rest.model.UserModel;
import com.akshar.rest.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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

    @GetMapping("/byEmail/{email}")
    public ResponseEntity getByMail(@PathVariable(value = "email") String email){
        return new ResponseEntity(userService.getUserByEmail(email), HttpStatus.OK);
    }

    @GetMapping("/contact")
    public ResponseEntity contact(){
        return new ResponseEntity("You can Contact me at 8830703113", HttpStatus.OK);
    }

    @GetMapping("/encodePassword/{email}")
    public ResponseEntity encodePassword(@PathVariable(value = "email") String email){
        return new ResponseEntity(userService.encodePasswords(email), HttpStatus.OK);
    }
}
