package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "customer_visit")
@Data
public class CustomerVisitModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private StoreModel store;

    @Column(name = "age_group", length = 50)
    private String ageGroup;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "shortage_visits", nullable = false)
    private int shortageVisits;

    @Column(name = "total_store_visits", nullable = false)
    private int totalStoreVisits;
}
