package com.example.CameraCheck.dto.chart.customer;

import lombok.Data;

import java.util.List;

@Data
public class CustomerShortageOvertimeDTO {
    private List<String> labels;
    private List<Integer> visitCounts;
    private List<Integer> shortageVisitCounts;
    private int operatingHours;
    private List<Double> avgShelfShortageHours;
}
