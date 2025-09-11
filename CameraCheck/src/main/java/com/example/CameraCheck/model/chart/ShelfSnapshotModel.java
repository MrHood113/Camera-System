package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;
import org.hibernate.annotations.CreationTimestamp;

import java.time.Instant;
import java.time.LocalDateTime;

@Entity
@Table(name = "shelf_snapshot")
public class ShelfSnapshotModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "shelf_id")
    private ShelfModel shelfModel;

    @Column(name = "expected_items", nullable = false)
    private int expectedItems;

    @Column(name = "current_items", nullable = false)
    private int currentItems;

    @Column(name = "event_timestamp", nullable = false)
    private Instant eventTimestamp;

    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private Instant createdAt = Instant.now();
}
