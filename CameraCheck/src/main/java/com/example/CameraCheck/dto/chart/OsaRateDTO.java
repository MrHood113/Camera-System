package com.example.CameraCheck.dto.chart;

import lombok.Data;

import java.util.List;

public class OsaRateDTO {
    private String shelfName;
    private List<String> labels;
    private List<Double> osaRates;
    private double threshold;

    public String getShelfName() {
        return shelfName;
    }

    public void setShelfName(String shelfName) {
        this.shelfName = shelfName;
    }

    public List<String> getLabels() {
        return labels;
    }

    public void setLabels(List<String> labels) {
        this.labels = labels;
    }

    public List<Double> getOsaRates() {
        return osaRates;
    }

    public void setOsaRates(List<Double> osaRates) {
        this.osaRates = osaRates;
    }

    public double getThreshold() {
        return threshold;
    }

    public void setThreshold(double threshold) {
        this.threshold = threshold;
    }
}
