package com.example.CameraCheck.model.stream;

import com.example.CameraCheck.model.camera.CameraModel;

public class StreamUrlModel {
    private Long id;
    private String streamUrl;

    public StreamUrlModel(Long id, String streamUrl) {
        this.id = id;
        this.streamUrl = streamUrl;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStreamUrl() {
        return streamUrl;
    }

    public void setStreamUrl(String streamUrl) {
        this.streamUrl = streamUrl;
    }

    public static StreamUrlModel fromEntity(CameraModel cameraModel) {
        return new StreamUrlModel(
                cameraModel.getId(),
                cameraModel.getStreamUrl());
    }
}
