package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "gender_visit")
@Data
public class GenderVisitModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_visit_id")
    private CustomerVisitModel customerVisit;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "store_visits", nullable = false)
    private int storeVisits;

    @Column(name = "shortage_visits", nullable = false)
    private int shortageVisits;
}
