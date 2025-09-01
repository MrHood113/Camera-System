package com.example.CameraCheck.dto.user;

import lombok.Data;

import java.time.LocalDateTime;

@Data
public class PendingActionResponseDTO {
    private String token;
    private LocalDateTime expiry;

    public PendingActionResponseDTO(String token, LocalDateTime expiry) {
        this.token = token;
        this.expiry = expiry;
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public LocalDateTime getExpiry() {
        return expiry;
    }

    public void setExpiry(LocalDateTime expiry) {
        this.expiry = expiry;
    }
}
