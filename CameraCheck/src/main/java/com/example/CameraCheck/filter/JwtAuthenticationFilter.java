package com.example.CameraCheck.filter;

import com.example.CameraCheck.exception.TokenExpiredException;
import com.example.CameraCheck.service.jwt.JwtService;
import com.example.CameraCheck.util.JwtTokenValidatorUtil;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtService jwtService;
    private final UserDetailsService userDetailsService;
    private final JwtTokenValidatorUtil jwtTokenValidatorUtil;

    public JwtAuthenticationFilter(JwtService jwtService, UserDetailsService userDetailsService, JwtTokenValidatorUtil jwtTokenValidatorUtil) {
        this.jwtService = jwtService;
        this.userDetailsService = userDetailsService;
        this.jwtTokenValidatorUtil = jwtTokenValidatorUtil;
    }

    @Override
    protected boolean shouldNotFilter(HttpServletRequest request) throws ServletException {
        String path = request.getRequestURI();
        return path.contains("/uploads/");
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request,
                                    HttpServletResponse response,
                                    FilterChain filterChain)
            throws ServletException, IOException {

        final String authHeader = request.getHeader("Authorization");
        final String token;
        final String username;
        String path = request.getRequestURI();

//        if (path.contains("/uploads/")) {
//            filterChain.doFilter(request, response);
//            return;
//        }

        if (authHeader == null || !authHeader.startsWith("Bearer ")) {
            filterChain.doFilter(request, response);
            return;
        }

        token = authHeader.substring(7);

        if(SecurityContextHolder.getContext().getAuthentication() == null) {
            var authentication = jwtTokenValidatorUtil.validateToken(token, request)
                    .orElseThrow(() -> new TokenExpiredException("Token is invalid or expired"));

            SecurityContextHolder.getContext().setAuthentication(authentication);
        }

        filterChain.doFilter(request, response);
    }
}
