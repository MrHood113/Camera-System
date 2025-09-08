package com.example.CameraCheck.model.chart;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Table(name = "store")
@Data
public class StoreModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "store_name", nullable = false, length = 255)
    private String storeName;

    @Column(name = "location", length = 255)
    private String location;

    @OneToMany(mappedBy = "store")
    private List<ShelfModel> shelves;

    public StoreModel(Long id, String storeName, String location, List<ShelfModel> shelves) {
        this.id = id;
        this.storeName = storeName;
        this.location = location;
        this.shelves = shelves;
    }
}
