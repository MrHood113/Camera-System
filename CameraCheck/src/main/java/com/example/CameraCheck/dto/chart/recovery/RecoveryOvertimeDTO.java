package com.example.CameraCheck.dto.chart.recovery;

import lombok.Data;

import java.util.List;

@Data
public class RecoveryOvertimeDTO {
    private List<String> labels;
    private List<Double> recoveryRates;
}
