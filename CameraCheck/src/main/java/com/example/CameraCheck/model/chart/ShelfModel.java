package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "shelf")
@Data
public class ShelfModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "shelf_name", nullable = false, length = 255)
    private String shelfName;

    @Column(name = "category", length = 255)
    private String category;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "store_id")
    private StoreModel store;
}
