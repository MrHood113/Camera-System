package com.example.CameraCheck.repository;

import com.example.CameraCheck.model.token.RefreshTokenModel;
import com.example.CameraCheck.model.user.UserModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RefreshTokenRepository extends JpaRepository<RefreshTokenModel, Long> {
    Optional<RefreshTokenModel> findByToken(String token);
    void deleteByToken(String token);
    void deleteByUser(UserModel userModel);
//    boolean existsByToken(String token);
//    Optional<RefreshToken> findByToken(String token);

}
