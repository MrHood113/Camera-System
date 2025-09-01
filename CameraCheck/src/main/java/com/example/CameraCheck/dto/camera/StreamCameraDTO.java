package com.example.CameraCheck.dto.camera;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
public class StreamCameraDTO {
    private Long id;
    private String name;
    private String country;
    private String city;

    public StreamCameraDTO(Long id, String name, String country, String city) {
        this.id = id;
        this.name = name;
        this.country = country;
        this.city = city;
    }

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
}
