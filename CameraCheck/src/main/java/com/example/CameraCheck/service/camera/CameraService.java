package com.example.CameraCheck.service.camera;

import com.example.CameraCheck.dto.camera.CameraDTO;
import com.example.CameraCheck.dto.camera.CameraHealthCheckDTO;
import com.example.CameraCheck.dto.camera.CameraHealthStatusDTO;
import com.example.CameraCheck.model.camera.CameraModel;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface CameraService {
    List<CameraDTO> getAllCameras();
    List<CameraModel> searchCamera(String name);
    List<CameraHealthCheckDTO> getCamerasForHealthCheck();
    CameraDTO getCameraById(Long id);
    CameraDTO createCamera(CameraDTO dto);
    CameraDTO updateCamera(Long id, CameraDTO  dto);
    CameraHealthStatusDTO updateCameraHealthStatus(Long id, CameraHealthStatusDTO dto);
    void deleteCamera(Long id);
}
