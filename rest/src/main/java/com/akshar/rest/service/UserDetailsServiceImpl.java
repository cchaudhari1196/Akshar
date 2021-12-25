package com.akshar.rest.service;

import com.akshar.rest.entities.Role;
import com.akshar.rest.entities.User;
import com.akshar.rest.persistence.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.EnvironmentAware;
import org.springframework.core.env.Environment;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Collection;

/*
* @author chirag
* UserDetailsService: This interface is commonly implemented if we have user/customer table in DB.
*                       this interface has loadUserByUserName: Inside which we specify logic to fetch user.
*
* */
@Service
public class UserDetailsServiceImpl implements UserDetailsService    {

    @Autowired
    private UserRepository userRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmailAddress(email);
        if(user == null)
                throw new UsernameNotFoundException(email + " not found.");
        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), getGrantedAuthority(user));
    }

    private Collection<GrantedAuthority> getGrantedAuthority(User user){
            Collection<GrantedAuthority> authorities = new ArrayList<>();
            for(Role role: user.getRoles()){
                authorities.add(new SimpleGrantedAuthority(role.getName()));
            }
//            if(user.getRoles().contains()){
//                    authorities.add(new SimpleGrantedAuthority("ADMIN_ROLE"));
//            }
//            authorities.add(new SimpleGrantedAuthority("USER_ROLE"));
            return authorities;
    }
}
