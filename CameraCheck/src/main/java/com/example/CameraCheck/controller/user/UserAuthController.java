package com.example.CameraCheck.controller.user;

import com.example.CameraCheck.dto.jwt.LoginRequestDTO;
import com.example.CameraCheck.dto.user.RegisterRequestDTO;
import com.example.CameraCheck.dto.jwt.LoginResponseDTO;
import com.example.CameraCheck.dto.user.RegisterResponseDTO;
import com.example.CameraCheck.service.user.UserAuthService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/auth/")
public class UserAuthController {

    public final UserAuthService userAuthService;

    public UserAuthController(UserAuthService userAuthService) {
        this.userAuthService = userAuthService;
    }

    @GetMapping("/verify-register")
    public ResponseEntity<?> verifyRegister(@RequestParam String token) {
        RegisterResponseDTO response = userAuthService.verifyRegister(token);
        return ResponseEntity.ok(response);
    }

    @PostMapping("/register")
    public ResponseEntity<?> register(@Valid @RequestBody RegisterRequestDTO registerRequestDTO) {
        RegisterResponseDTO res = userAuthService.register(registerRequestDTO);
        return ResponseEntity.status(HttpStatus.CREATED).body(res);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequestDTO request) {
        LoginResponseDTO response = userAuthService.login(request.getUsername(), request.getPassword());
        return ResponseEntity.ok(response);
    }

    @PostMapping("/logout")
    public ResponseEntity<?> logout(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");
//        String accessToken = body.get("accessToken");

        userAuthService.logout(refreshToken);

        return ResponseEntity.ok(Map.of("message", "Logout successful"));
    }
}
