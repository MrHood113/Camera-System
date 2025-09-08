package com.example.CameraCheck.dto.chart.customer;

import lombok.Data;

@Data
public class CustomerShortageByDemographicsDTO {
    private String ageGroup;
    private int maleShortageVisitCount;
    private int femaleShortageVisitCount;
}
