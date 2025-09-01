package com.example.CameraCheck.util;

import com.example.CameraCheck.exception.TokenExpiredException;
import com.example.CameraCheck.service.jwt.JwtService;
//import com.example.CameraCheck.service.redis.TokenService;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.security.core.authority.SimpleGrantedAuthority;


import jakarta.servlet.http.HttpServletRequest;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Component
public class JwtTokenValidatorUtil {

    private final JwtService jwtService;
//    private final TokenService tokenService;

    public JwtTokenValidatorUtil(JwtService jwtService) {
        this.jwtService = jwtService;
//        this.tokenService = tokenService;
    }

    public Optional<Authentication> validateToken(String token, HttpServletRequest request) {
        String username = jwtService.extractUsername(token);
        if (username == null) return Optional.empty();

        if (!jwtService.isTokenValid(token)) {
            throw new TokenExpiredException("Token is invalid or expired");
        }

//        if (!tokenService.isTokenValid(token)) {
//            throw new TokenExpiredException("Token is revoked or invalid");
//        }

        List<String> roles = jwtService.extractRoles(token);
        List<GrantedAuthority> authorities = roles.stream()
                .map(SimpleGrantedAuthority::new)
                .collect(Collectors.toList());

        UsernamePasswordAuthenticationToken authToken =
                new UsernamePasswordAuthenticationToken(username, null, authorities);

        authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        return Optional.of(authToken);
    }
}
