package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "age_visit")
@Data
public class AgeVisitModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_visit_id")
    private CustomerVisitModel customerVisit;

    @Column(name = "age_group", length = 50)
    private String ageGroup;

    @Column(name = "store_visits", nullable = false)
    private int storeVisits;

    @Column(name = "shortage_visits", nullable = false)
    private int shortageVisits;
}
