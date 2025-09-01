package com.example.CameraCheck.service.user;

import com.example.CameraCheck.dto.user.RegisterRequestDTO;
import com.example.CameraCheck.dto.jwt.LoginResponseDTO;
import com.example.CameraCheck.dto.user.RegisterResponseDTO;
import org.springframework.stereotype.Service;

@Service
public interface UserAuthService {
    // Auth
    RegisterResponseDTO register(RegisterRequestDTO registerDto);
    RegisterResponseDTO verifyRegister(String token);
    LoginResponseDTO login(String username, String password);
    void logout(String refreshToken);
    String refreshAccessToken(String refreshToken);

}
