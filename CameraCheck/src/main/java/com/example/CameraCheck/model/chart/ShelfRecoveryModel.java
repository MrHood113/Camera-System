package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "shelf_recovery")
@Data
@NoArgsConstructor
public class ShelfRecoveryModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelf_id")
    private ShelfModel shelf;

    @Column(name = "total_replenishment_alerts", nullable = false)
    private int totalReplenishmentAlerts;

    @Column(name = "on_time_recoveries", nullable = false)
    private int onTimeRecoveries;

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;
}
