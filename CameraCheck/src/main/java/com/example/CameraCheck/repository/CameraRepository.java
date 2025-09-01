package com.example.CameraCheck.repository;

import com.example.CameraCheck.model.camera.CameraModel;
import com.example.CameraCheck.model.camera.HealthStatusEnum;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CameraRepository extends JpaRepository<CameraModel, Long>{
    @Query("""
        SELECT c FROM CameraModel c
        WHERE LOWER(c.name) LIKE LOWER(CONCAT('%', :term, '%'))
           OR LOWER(c.country) LIKE LOWER(CONCAT('%', :term, '%'))
           OR LOWER(c.city) LIKE LOWER(CONCAT('%', :term, '%'))
    """)
    List<CameraModel> searchByNameOrCountryOrCity(String term);
//    List<CameraModel> findByHealthCheckTypeEnumIsNotNullAndIsActiveTrue();  // Fill camera still working
//    List<CameraModel> findByHealthStatusEnum(HealthStatusEnum status);  // Fill camera by status
    List<CameraModel> findByHealthCheckTypeEnumIsNotNull();
}
