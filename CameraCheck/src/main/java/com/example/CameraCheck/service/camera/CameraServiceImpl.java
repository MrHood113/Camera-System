package com.example.CameraCheck.service.camera;

import com.example.CameraCheck.dto.camera.CameraDTO;
import com.example.CameraCheck.dto.camera.CameraHealthCheckDTO;
import com.example.CameraCheck.dto.camera.CameraHealthStatusDTO;
import com.example.CameraCheck.model.camera.CameraModel;
import com.example.CameraCheck.mapper.CameraMapper;
import com.example.CameraCheck.model.camera.HealthCheckTypeEnum;
import com.example.CameraCheck.model.camera.HealthStatusEnum;
import com.example.CameraCheck.repository.CameraRepository;
import com.example.CameraCheck.util.HealthCheckUtils;
import jakarta.persistence.EntityNotFoundException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CameraServiceImpl implements CameraService{
    private static final Logger log = LoggerFactory.getLogger(CameraServiceImpl.class);

    private final CameraRepository cameraRepository;
    private final CameraMapper cameraMapper;

    public CameraServiceImpl(CameraRepository cameraRepository, CameraMapper cameraMapper) {
        this.cameraRepository = cameraRepository;
        this.cameraMapper = cameraMapper;
    }

    // List all camera
    @Override
    public List<CameraDTO> getAllCameras() {
        return cameraRepository.findAll().stream()
                .map(cameraMapper::toDto)
                .toList();
    }

    // Search cameras by name
    @Override
    public List<CameraModel> searchCamera(String term) {
        if(term == null || term.isBlank()) {
            throw new IllegalArgumentException("Search term cannot be null or blank");
        } else {
            return cameraRepository.searchByNameOrCountryOrCity(term);
        }
    }

    @Override
    public List<CameraHealthCheckDTO> getCamerasForHealthCheck() {
        return cameraRepository.findByHealthCheckTypeEnumIsNotNull().stream()
                .map(cameraMapper::toHealthCheckDTO)
                .toList();
    }

    // Get camera by id for detail page
    @Override
    public CameraDTO getCameraById(Long id) {
        return cameraMapper.toDto(cameraRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Camera with id %d not found", id))));
    }

    // Create camera
    @Override
    @Transactional
    public CameraDTO createCamera(CameraDTO dto) {
        if (dto.getActive() == null) {
            dto.setActive(true);
        }

        HealthCheckTypeEnum detectedType = HealthCheckUtils.detectHealthCheckType(dto.getStreamUrl());

        CameraModel entity = cameraMapper.toEntity(dto);
        entity.setHealthCheckTypeEnum(detectedType);

        CameraModel saved = cameraRepository.save(entity);
        return cameraMapper.toDto(saved);
    }

    // Update camera
    @Override
    @Transactional
    public CameraDTO updateCamera(Long id, CameraDTO dto) {
        CameraModel camera = cameraRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(String.format("Camera with id %d not found", id)));

        cameraMapper.updateCameraFromDto(dto, camera);
        return cameraMapper.toDto(cameraRepository.save(camera));
    }

    // Update status camera
    @Override
    @Transactional
    public CameraHealthStatusDTO updateCameraHealthStatus(Long id, CameraHealthStatusDTO dto) {
        CameraModel camera = cameraRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(
                        String.format("Camera with id %d not found", id)
                ));

        HealthStatusEnum oldStatus = camera.getHealthStatusEnum();
        HealthStatusEnum newStatus = dto.healthStatusEnum();

        // Update status and log change time
        if (oldStatus != newStatus) {
            camera.setHealthStatusEnum(newStatus);
            camera.setLastStatusChangeAt(java.time.LocalDateTime.now());

            boolean isActive = switch (newStatus) {
                case ONLINE -> true;
                case OFFLINE, UNREACHABLE -> false;
                case UNKNOWN -> camera.getActive() != null ? camera.getActive() : false;
            };
            camera.setActive(isActive);
        }

        camera.setLastPingAt(java.time.LocalDateTime.now());

        return cameraMapper.toHealthStatusDTO(cameraRepository.save(camera));
    }

    @Override
    @Transactional
    public void deleteCamera(Long id) {
        if (cameraRepository.existsById(id)){
            cameraRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException(String.format("Camera with id %d not found", id));
        }
    }
}
