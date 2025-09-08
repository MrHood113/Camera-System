package com.example.CameraCheck.dto.chart.shortage;

import lombok.Data;

import java.util.List;

@Data
public class ShortageOvertimeDTO {
    private List<String> labels;
    private List<Double> shortageRates;
}
