package com.example.CameraCheck.model.camera;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "cameras")
@AllArgsConstructor
@NoArgsConstructor
@Data
public class CameraModel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", length = 255, nullable = false)
    private String name;

    @Column(name = "latitude")
    private double latitude;
    @Column(name = "longitude")
    private double longitude;

    @Column(name = "country", length = 100, nullable = false)
    private String country;
    @Column(name = "city", length = 100, nullable = false)
    private String city;
    @Column(name = "countryCode", length = 10)
    private String countryCode;
    @Column(name = "zipCode", length = 20)
    private String zipCode;

    @Column(name = "timezone")
    private String timezone;

    @Column(name = "ipAddress", length = 100, nullable = false)
    private String ipAddress;

    @Column(name = "streamUrl")
    private String streamUrl;

    @Enumerated(EnumType.STRING)
    @Column(name = "health_status")
    private HealthStatusEnum healthStatusEnum;

    @Column(name = "last_status_change_at")
    private LocalDateTime lastStatusChangeAt;

    @Enumerated(EnumType.STRING)
    @Column(name = "health_check_type")
    private HealthCheckTypeEnum healthCheckTypeEnum;

    @Column(name = "last_ping_at")
    private LocalDateTime lastPingAt;

    @Column(name = "is_active")
    private Boolean isActive = true;

    @Column(name = "description", length = 1000)
    private String description;

    @Column(name = "note", length = 1000)
    private String note;

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

    public LocalDateTime getLastStatusChangeAt() {
        return lastStatusChangeAt;
    }

    public void setLastStatusChangeAt(LocalDateTime lastStatusChangeAt) {
        this.lastStatusChangeAt = lastStatusChangeAt;
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

    public Boolean getActive() {
        return isActive;
    }

    public void setActive(Boolean active) {
        isActive = active;
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
}