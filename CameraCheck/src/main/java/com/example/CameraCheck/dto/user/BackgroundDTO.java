package com.example.CameraCheck.dto.user;

public class BackgroundDTO {
    private Long id;
    private String background;

    public BackgroundDTO(Long id, String background) {
        this.id = id;
        this.background = background;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getBackground() {
        return background;
    }

    public void setBackground(String background) {
        this.background = background;
    }
}
