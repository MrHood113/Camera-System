package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
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

    @Column(name = "replenishment_alerts", nullable = false)
    private int replenishmentAlerts;

    @Column(name = "on_time_recoveries", nullable = false)
    private int onTimeRecoveries;

    @Column(name = "overtime_recoveries", nullable = false)
    private int overtimeRecoveries;

    @Column(name = "event_timestamp", nullable = false)
    private Instant eventTimestamp;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
