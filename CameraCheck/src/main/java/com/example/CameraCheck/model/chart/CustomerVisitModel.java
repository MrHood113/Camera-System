package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

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

    @Column(name = "total_shortage_visits", nullable = false)
    private int totalShortageVisits;

    @Column(name = "total_store_visits", nullable = false)
    private int totalStoreVisits;

    @OneToMany(mappedBy = "customerVisit", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<AgeGenderVisitModel> ageGenderVisits;
}
