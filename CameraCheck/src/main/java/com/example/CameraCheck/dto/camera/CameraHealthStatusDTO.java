package com.example.CameraCheck.dto.camera;

import com.example.CameraCheck.model.camera.HealthStatusEnum;

import java.time.LocalDateTime;

public record CameraHealthStatusDTO(
        HealthStatusEnum healthStatusEnum,
        String note,
        LocalDateTime lastPingAt,
        Boolean isActive
) {}
