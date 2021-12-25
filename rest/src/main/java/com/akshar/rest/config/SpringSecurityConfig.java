package com.akshar.rest.config;

import com.akshar.rest.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.annotation.web.configurers.ExpressionUrlAuthorizationConfigurer;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.AuthenticationEntryPoint;

/*This class will have all all the configuartions*/
@Configuration
@EnableWebSecurity
public class SpringSecurityConfig extends WebSecurityConfigurerAdapter {

    @Autowired
    private AuthenticationEntryPointConfig entryPoint;
    @Autowired
    private UserDetailsServiceImpl userDetailsService;

    /*This method will get UserDetails (Objects of User) from UserDetailsServiceImpl class. and also, add password encoder. */
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(new BCryptPasswordEncoder());
    }


    /*This method will have logic for which endpoint to secure*/
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.csrf().disable().authorizeRequests().
//                antMatchers("/user/contact").permitAll().
//                antMatchers("/user/create").hasAuthority("ADMIN").
                anyRequest().authenticated().
                and().formLogin().
                and().httpBasic();

    }
}
