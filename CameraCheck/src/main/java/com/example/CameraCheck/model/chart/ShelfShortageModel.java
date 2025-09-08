package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "shelf_shortage")
public class ShelfShortageModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelf_id")
    private ShelfModel shelf;

    @Column(name = "total_operating_hours", nullable = false)
    private double totalOperatingHours;

    @Column(name = "shortage_hours", nullable = false)
    private double shortageHours;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
}
