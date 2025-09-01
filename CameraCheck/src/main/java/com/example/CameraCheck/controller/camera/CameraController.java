package com.example.CameraCheck.controller.camera;

import com.example.CameraCheck.dto.camera.CameraDTO;
import com.example.CameraCheck.model.camera.CameraModel;
import com.example.CameraCheck.model.stream.StreamCameraModel;
import com.example.CameraCheck.model.stream.StreamUrlModel;
import com.example.CameraCheck.service.camera.CameraService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.net.URI;
import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/authenticated/cameras")
public class CameraController {

    private final CameraService cameraService;
    private static final Logger log = LoggerFactory.getLogger(CameraController.class);

    public CameraController(CameraService cameraService) {
        this.cameraService = cameraService;
    }

    @GetMapping()
    public ResponseEntity<List<CameraDTO>> getAllCameras() {
        return ResponseEntity.ok(cameraService.getAllCameras());
    }

    @GetMapping("/{id}")
    public ResponseEntity<CameraDTO> getCameraById(@PathVariable Long id){
        return ResponseEntity.ok(cameraService.getCameraById(id));
    }

    @PostMapping
    public ResponseEntity<CameraDTO> createCamera(@RequestBody CameraDTO dto){
        CameraDTO newCameraModel = cameraService.createCamera(dto);
        return  ResponseEntity.status(HttpStatus.CREATED).body(newCameraModel);
    }

    @PutMapping("/{id}")
    public ResponseEntity<CameraDTO> updateCamera(@PathVariable Long id, @RequestBody CameraDTO dto){
        return ResponseEntity.ok(cameraService.updateCamera(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCamera(@PathVariable Long id){
        cameraService.deleteCamera(id);
        return ResponseEntity.noContent().build();
    }

    @GetMapping("/search")
    public ResponseEntity<List<CameraModel>> searchCameras(@RequestParam("q") String query) {
        List<CameraModel> results = cameraService.searchCamera(query);
        return ResponseEntity.ok(results);
    }

}