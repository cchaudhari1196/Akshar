package com.akshar.rest.config;

import com.akshar.rest.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationEntryPointConfig entryPoint;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }

    @Override
    protected void configure(HttpSecurity http) throws Exception {
//        http.csrf().disable().authorizeRequests()
//                .antMatchers("/admin")
//                .access("@userAuthorizationControl.checkAccessBasedOnRole(authentication)")
//                .anyRequest().authenticated().and().httpBasic().authenticationEntryPoint(entryPoint);

            http.authorizeRequests().
                    antMatchers("/admin").hasRole("ADMIN").
                    antMatchers("/api/v1/students", "/api/v1/courses").hasAnyRole("USER", "ADMIN").
                    antMatchers("/", "static/css", "static/js").
                    permitAll().
                    and().
                    formLogin();

    }
}
