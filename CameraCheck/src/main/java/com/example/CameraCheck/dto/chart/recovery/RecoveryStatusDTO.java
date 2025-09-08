package com.example.CameraCheck.dto.chart.recovery;

import lombok.Data;

@Data
public class RecoveryStatusDTO {
    private String shelfNameOrCategory;
    private int totalReplenishments;
    private int onTimeRecoveries;
    private double recoveryRate;
}
