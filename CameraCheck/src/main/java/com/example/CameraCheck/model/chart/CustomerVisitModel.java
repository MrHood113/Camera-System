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

    @Column(name = "visit_time", nullable = false)
    private LocalDateTime visitTime;

    @Column(name = "age_group", length = 50)
    private String ageGroup;

    @Column(name = "gender", length = 20)
    private String gender;

    @Column(name = "during_shortage", nullable = false)
    private boolean duringShortage;
}
