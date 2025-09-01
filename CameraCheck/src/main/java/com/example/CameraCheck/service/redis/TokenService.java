//package com.example.CameraCheck.service.redis;
//
//import org.springframework.data.redis.core.RedisTemplate;
//import org.springframework.stereotype.Service;
//
//import java.util.concurrent.TimeUnit;
//
//@Service
//public class TokenService {
//    private final RedisTemplate<String, String> redisTemplate;
//
//    public TokenService(RedisTemplate<String, String> redisTemplate) {
//        this.redisTemplate = redisTemplate;
//    }
//
//    public void saveAccessToken(String token, long expirationMillis) {
//        redisTemplate.opsForValue().set("access:token:" + token, "valid", expirationMillis, TimeUnit.MILLISECONDS);
//    }
//
//    public void saveRefreshToken(String token, long expirationMillis, Long userId) {
//        redisTemplate.opsForValue().set("refresh:token:" + token, userId.toString(), expirationMillis, TimeUnit.MILLISECONDS);
//    }
//
//
//    public boolean isTokenValid(String token) {
//        return Boolean.TRUE.equals(redisTemplate.hasKey(token));
//    }
//
//    public void removeToken(String accessToken, String refreshToken) {
//        redisTemplate.delete("access:token: " + accessToken);
//        redisTemplate.delete("refresh:token: " + refreshToken);
//    }
//}
