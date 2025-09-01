package com.example.CameraCheck.controller.camera;

import com.example.CameraCheck.dto.camera.StreamCameraDTO;
import com.example.CameraCheck.dto.camera.StreamUrlDTO;
import com.example.CameraCheck.model.stream.StreamCameraModel;
import com.example.CameraCheck.model.stream.StreamUrlModel;
import com.example.CameraCheck.service.camera.StreamCameraService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/authenticated")
public class StreamCamereController {
    private final StreamCameraService streamCameraService;

    public StreamCamereController(StreamCameraService streamCameraService) {
        this.streamCameraService = streamCameraService;
    }

    @GetMapping("/stream-camera")
    public ResponseEntity<List<StreamCameraDTO>> getAllStreamCameras() {
        return ResponseEntity.ok(streamCameraService.getAllStreamCameras());
    }

    @GetMapping("/stream-camera/{id}")
    public ResponseEntity<StreamCameraDTO> getStreamCameraById(@PathVariable Long id){
        StreamCameraDTO camera = streamCameraService.getStreamCameraById(id);
        return ResponseEntity.ok(camera);
    }

    @GetMapping("/{id}/stream-url")
    public ResponseEntity<StreamUrlDTO> getStreamUrlById(@PathVariable Long id){
        StreamUrlDTO camera = streamCameraService.getStreamUrlById(id);
        return ResponseEntity.ok(camera);
    }
}
