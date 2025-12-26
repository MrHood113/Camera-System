package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "age_gender_visit")
@Data
public class AgeGenderVisitModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_visit_id")
    private CustomerVisitModel customerVisit;

    @Column(name = "age_group", length = 50, nullable = false)
    private String ageGroup;

    @Column(name = "gender", length = 50, nullable = false)
    private String gender;

    @Column(name = "visit_count", nullable = false)
    private int visitCount;
}
