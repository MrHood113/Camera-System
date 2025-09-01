package com.example.CameraCheck.service.token;

import com.example.CameraCheck.exception.TokenExpiredException;
import com.example.CameraCheck.model.token.RefreshTokenModel;
import com.example.CameraCheck.model.user.UserModel;
import com.example.CameraCheck.repository.RefreshTokenRepository;
import com.example.CameraCheck.service.jwt.JwtService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.UUID;

@Service
public class RefreshTokenServiceImpl implements RefreshTokenService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final JwtService jwtService;
    @Value("${jwt.refreshExpirationMs}")
    private Long refreshExpirationMs;

    public RefreshTokenServiceImpl(RefreshTokenRepository refreshTokenRepository, JwtService jwtService) {
        this.refreshTokenRepository = refreshTokenRepository;
        this.jwtService = jwtService;
    }

    @Override
    public RefreshTokenModel createRefreshToken(UserModel userModel) {
        RefreshTokenModel token = new RefreshTokenModel();
        token.setUserModel(userModel);
        token.setToken(UUID.randomUUID().toString());
        token.setExpiryDate(Instant.now().plusMillis(refreshExpirationMs));
        return refreshTokenRepository.save(token);
    }

    @Override
    public RefreshTokenModel verifyExpiration(String token) {
        RefreshTokenModel rfToken = refreshTokenRepository.findByToken(token)
                .orElseThrow(() -> new EntityNotFoundException("Refresh token does not exist"));

        if (rfToken.getExpiryDate().isBefore(Instant.now())) {
            refreshTokenRepository.delete(rfToken);
            throw new TokenExpiredException("Refresh token has expired");
        }

        return rfToken;
    }

    @Override
    public void deleteByToken(String token) {
        refreshTokenRepository.deleteByToken(token);
    }

    @Override
    public void deleteByUser(UserModel userModel) {
        refreshTokenRepository.deleteByUser(userModel);
    }
}
