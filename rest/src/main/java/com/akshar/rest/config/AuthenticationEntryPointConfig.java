package com.akshar.rest.config;

import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.authentication.www.BasicAuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


/*This class will handle cases of failure of auth*/
@Component
public class AuthenticationEntryPointConfig extends BasicAuthenticationEntryPoint {
    @Override
    public void commence(HttpServletRequest request, HttpServletResponse response, AuthenticationException authException) throws IOException {
        response.addHeader("WWW-Authenticate","Basic Realm - " + getRealmName());
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
    }

    @Override
    public void afterPropertiesSet() {
        setRealmName("Akshar");
        super.afterPropertiesSet();
    }
}
