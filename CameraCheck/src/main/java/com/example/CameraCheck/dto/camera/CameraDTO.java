package com.example.CameraCheck.dto.camera;

import com.example.CameraCheck.model.camera.HealthCheckTypeEnum;
import com.example.CameraCheck.model.camera.HealthStatusEnum;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class CameraDTO {
    private Long id;
    private String name;

    private double latitude;
    private double longitude;

    private String country;
    private String city;
    private String countryCode;
    private String zipCode;

    private String timezone;
    private String ipAddress;
    private String streamUrl;

    private HealthStatusEnum healthStatusEnum;
    private HealthCheckTypeEnum healthCheckTypeEnum;

    private LocalDateTime lastPingAt;
    private LocalDateTime lastStatusChangeAt;

    private String description;
    private String note;

    @JsonProperty("isActive")
    private Boolean isActive;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public double getLatitude() {
        return latitude;
    }

    public void setLatitude(double latitude) {
        this.latitude = latitude;
    }

    public double getLongitude() {
        return longitude;
    }

    public void setLongitude(double longitude) {
        this.longitude = longitude;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getCity() {
        return city;
    }

    public void setCity(String city) {
        this.city = city;
    }

    public String getCountryCode() {
        return countryCode;
    }

    public void setCountryCode(String countryCode) {
        this.countryCode = countryCode;
    }

    public String getZipCode() {
        return zipCode;
    }

    public void setZipCode(String zipCode) {
        this.zipCode = zipCode;
    }

    public String getTimezone() {
        return timezone;
    }

    public void setTimezone(String timezone) {
        this.timezone = timezone;
    }

    public String getIpAddress() {
        return ipAddress;
    }

    public void setIpAddress(String ipAddress) {
        this.ipAddress = ipAddress;
    }

    public String getStreamUrl() {
        return streamUrl;
    }

    public void setStreamUrl(String streamUrl) {
        this.streamUrl = streamUrl;
    }

    public HealthStatusEnum getHealthStatusEnum() {
        return healthStatusEnum;
    }

    public void setHealthStatusEnum(HealthStatusEnum healthStatusEnum) {
        this.healthStatusEnum = healthStatusEnum;
    }

    public HealthCheckTypeEnum getHealthCheckTypeEnum() {
        return healthCheckTypeEnum;
    }

    public void setHealthCheckTypeEnum(HealthCheckTypeEnum healthCheckTypeEnum) {
        this.healthCheckTypeEnum = healthCheckTypeEnum;
    }

    public LocalDateTime getLastPingAt() {
        return lastPingAt;
    }

    public void setLastPingAt(LocalDateTime lastPingAt) {
        this.lastPingAt = lastPingAt;
    }

    public LocalDateTime getLastStatusChangeAt() {
        return lastStatusChangeAt;
    }

    public void setLastStatusChangeAt(LocalDateTime lastStatusChangeAt) {
        this.lastStatusChangeAt = lastStatusChangeAt;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getNote() {
        return note;
    }

    public void setNote(String note) {
        this.note = note;
    }

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
    }
}
