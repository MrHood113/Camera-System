package com.example.CameraCheck.controller.camera;

import com.example.CameraCheck.dto.camera.CameraHealthCheckDTO;
import com.example.CameraCheck.dto.camera.CameraHealthStatusDTO;
import com.example.CameraCheck.service.camera.CameraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/cameras")
public class CameraHealthController {

    private CameraService cameraService;

    public CameraHealthController(CameraService cameraService) {
        this.cameraService = cameraService;
    }

    @GetMapping("/health-check")
    public ResponseEntity<List<CameraHealthCheckDTO>> getCamerasForHealthCheck() {
        return ResponseEntity.ok(cameraService.getCamerasForHealthCheck());
    }

    @PutMapping("/{id}/health-status")
    public ResponseEntity<CameraHealthStatusDTO> updateCameraHealth(@PathVariable Long id, @RequestBody CameraHealthStatusDTO dto) {
        return ResponseEntity.ok(cameraService.updateCameraHealthStatus(id, dto));
    }
}
