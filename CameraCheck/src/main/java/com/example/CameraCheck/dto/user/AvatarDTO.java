package com.example.CameraCheck.dto.user;

public class AvatarDTO {
    private Long id;
    private String avatar;

    public AvatarDTO(Long id, String avatar) {
        this.id = id;
        this.avatar = avatar;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }
}
