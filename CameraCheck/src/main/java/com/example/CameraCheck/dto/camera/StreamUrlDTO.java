package com.example.CameraCheck.dto.camera;

import com.example.CameraCheck.model.camera.HealthCheckTypeEnum;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class StreamUrlDTO {
    private Long id;
    private String streamUrl;
    private HealthCheckTypeEnum healthCheckTypeEnum;

    public StreamUrlDTO(Long id, String streamUrl, HealthCheckTypeEnum healthCheckTypeEnum) {
        this.id = id;
        this.streamUrl = streamUrl;
        this.healthCheckTypeEnum = healthCheckTypeEnum;
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

    public HealthCheckTypeEnum getHealthCheckTypeEnum() {
        return healthCheckTypeEnum;
    }

    public void setHealthCheckTypeEnum(HealthCheckTypeEnum healthCheckTypeEnum) {
        this.healthCheckTypeEnum = healthCheckTypeEnum;
    }
}
