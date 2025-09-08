package com.example.CameraCheck.dto.chart;

import lombok.Data;

import java.util.List;

@Data
public class OsaRateDTO {
    private String shelfName;
    private List<String> labels;
    private List<Double> osaRates;
    private double threshold;
}
