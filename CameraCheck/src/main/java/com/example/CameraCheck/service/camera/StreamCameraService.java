package com.example.CameraCheck.service.camera;

import com.example.CameraCheck.dto.camera.StreamCameraDTO;
import com.example.CameraCheck.dto.camera.StreamUrlDTO;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StreamCameraService {
    List<StreamCameraDTO> getAllStreamCameras();
    StreamCameraDTO getStreamCameraById(Long id);
    StreamUrlDTO getStreamUrlById(Long id);
}
