package com.example.CameraCheck.service.token;

import com.example.CameraCheck.model.token.RefreshTokenModel;
import com.example.CameraCheck.model.user.UserModel;
import org.springframework.stereotype.Service;

@Service
public interface RefreshTokenService {
    RefreshTokenModel createRefreshToken(UserModel userModel);
    RefreshTokenModel verifyExpiration(String token);
    void deleteByToken(String token);
    void deleteByUser(UserModel userModel);

}
