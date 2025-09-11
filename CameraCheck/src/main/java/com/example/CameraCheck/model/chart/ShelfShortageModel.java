package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
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

    @Column(name = "shelf_operating_hours", nullable = false)
    private double shelfOperatingHours;

    @Column(name = "shelf_shortage_hours", nullable = false)
    private double shelfShortageHours;

    @Column(name = "duration_above_threshold", nullable = false)
    private double durationAboveThreshold;

    @Column(name = "event_timestamp", nullable = false)
    private Instant eventTimestamp;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
