package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;

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

    @Column(name = "timestamp", nullable = false)
    private LocalDateTime timestamp;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public ShelfModel getShelfModel() {
        return shelfModel;
    }

    public void setShelfModel(ShelfModel shelfModel) {
        this.shelfModel = shelfModel;
    }

    public int getExpectedItems() {
        return expectedItems;
    }

    public void setExpectedItems(int expectedItems) {
        this.expectedItems = expectedItems;
    }

    public int getCurrentItems() {
        return currentItems;
    }

    public void setCurrentItems(int currentItems) {
        this.currentItems = currentItems;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }
}
