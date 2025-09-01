package com.example.CameraCheck.service.jwt;

import com.example.CameraCheck.util.JwtUtil;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Base64;
import java.util.Date;
import java.util.List;

@Service
public class JwtServiceImpl implements JwtService{
    private JwtUtil jwtUtil;

    public JwtServiceImpl(JwtUtil jwtUtil) {
        this.jwtUtil = jwtUtil;
    }

    @Override
    public String generateToken(UserDetails userDetails) {
        return jwtUtil.generateToken(userDetails);
    }

    @Override
    public String extractUsername(String token) {
        return jwtUtil.extractUsername(token);
    }

    @Override
    public boolean isTokenValid(String token) {
        try {
            final String username = extractUsername(token);
            return (username != null && !jwtUtil.isTokenExpired(token));
        } catch (Exception e) {
            return false;
        }
    }

    @Override
    public List<String> extractRoles(String token) {
        return jwtUtil.extractRoles(token);
    }
}
