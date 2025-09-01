package com.example.CameraCheck.util;

import com.example.CameraCheck.model.camera.HealthCheckTypeEnum;

public class HealthCheckUtils {
    public static HealthCheckTypeEnum detectHealthCheckType(String streamUrl) {
        if (streamUrl == null || streamUrl.isBlank()) {
            return HealthCheckTypeEnum.PING;
        }

        String url = streamUrl.toLowerCase();

        if (url.startsWith("rtsp://")) {
            return HealthCheckTypeEnum.RTSP;
        }

        if (url.startsWith("http://") || url.startsWith("https://")) {
            return HealthCheckTypeEnum.HTTP;
        }

        return HealthCheckTypeEnum.PING;
    }
}
