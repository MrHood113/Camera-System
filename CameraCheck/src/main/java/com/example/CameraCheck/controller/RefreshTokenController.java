package com.example.CameraCheck.controller;

import com.example.CameraCheck.model.token.RefreshTokenModel;
import com.example.CameraCheck.service.jwt.UserDetailsImpl;
import com.example.CameraCheck.service.token.RefreshTokenService;
import com.example.CameraCheck.service.jwt.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth/tokens")
public class RefreshTokenController {
    private final RefreshTokenService refreshTokenService;
    private final JwtService jwtService;

    public RefreshTokenController(RefreshTokenService refreshTokenService, JwtService jwtService) {
        this.refreshTokenService = refreshTokenService;
        this.jwtService = jwtService;
    }


    @PostMapping("/refresh")
    public ResponseEntity<?> refreshToken(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
        System.out.println("Received refreshToken: " + refreshToken);

        RefreshTokenModel token = refreshTokenService.verifyExpiration(refreshToken);
        String newAccessToken = jwtService.generateToken(new UserDetailsImpl(token.getUserModel()));
        return ResponseEntity.ok(Map.of("accessToken", newAccessToken));
    }
}
