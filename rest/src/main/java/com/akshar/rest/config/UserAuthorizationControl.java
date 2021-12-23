package com.akshar.rest.config;

import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.stereotype.Service;

@Service
public class UserAuthorizationControl {

    private static final String ADMIN = "ADMIN_ROLE";

    public UserAuthorizationControl() {
    }

    public boolean checkAccessBasedOnRole(Authentication auth){
        if(auth.isAuthenticated() && !auth.getAuthorities().contains(new SimpleGrantedAuthority("USER_ROLE"))) {
            return ((User)auth.getPrincipal()).getAuthorities().contains(new SimpleGrantedAuthority(ADMIN));
        }
        return false;
    }
}