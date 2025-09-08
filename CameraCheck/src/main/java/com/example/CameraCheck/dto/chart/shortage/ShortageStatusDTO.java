package com.example.CameraCheck.dto.chart.shortage;

import lombok.Data;

@Data
public class ShortageStatusDTO {
    private String shelfNameOrCategory;
    private double totalOperatingHours;
    private double shortageHours;
    private double shortageRate;
}
