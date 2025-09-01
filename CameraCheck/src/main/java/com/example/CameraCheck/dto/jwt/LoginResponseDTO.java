package com.example.CameraCheck.dto.jwt;

import com.example.CameraCheck.model.user.RoleEnum;

public class LoginResponseDTO {
    private Long id;
    private String accessToken;
    private String refreshToken;
    private RoleEnum roleEnum;

    public LoginResponseDTO(Long id, String accessToken, String refreshToken, RoleEnum roleEnum) {
        this.id = id;
        this.accessToken = accessToken;
        this.refreshToken = refreshToken;
        this.roleEnum = roleEnum;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAccessToken() {
        return accessToken;
    }

    public void setAccessToken(String accessToken) {
        this.accessToken = accessToken;
    }

    public String getRefreshToken() {
        return refreshToken;
    }

    public void setRefreshToken(String refreshToken) {
        this.refreshToken = refreshToken;
    }

    public RoleEnum getRoleEnum() {
        return roleEnum;
    }

    public void setRoleEnum(RoleEnum roleEnum) {
        this.roleEnum = roleEnum;
    }
}
