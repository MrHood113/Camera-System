package com.example.CameraCheck.dto.camera;

import com.example.CameraCheck.model.camera.HealthCheckTypeEnum;

public record CameraHealthCheckDTO(
        Long id,
        String ipAddress,
        String streamUrl,
        HealthCheckTypeEnum healthCheckTypeEnum
) {}

