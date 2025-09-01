package com.example.CameraCheck.config;

import com.example.CameraCheck.filter.JwtAuthenticationFilter;
import com.example.CameraCheck.service.jwt.JwtService;
import com.example.CameraCheck.util.JwtTokenValidatorUtil;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.userdetails.UserDetailsService;

@Configuration
public class FilterConfig {

    @Bean
    public JwtAuthenticationFilter jwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService,
                                                           JwtTokenValidatorUtil jwtTokenValidatorUtil) {
        return new JwtAuthenticationFilter(jwtService, userDetailsService, jwtTokenValidatorUtil);
    }
}
