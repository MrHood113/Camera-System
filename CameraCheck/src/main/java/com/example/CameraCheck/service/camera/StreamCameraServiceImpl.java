package com.example.CameraCheck.service.camera;

import com.example.CameraCheck.dto.camera.StreamCameraDTO;
import com.example.CameraCheck.dto.camera.StreamUrlDTO;
import com.example.CameraCheck.mapper.CameraMapper;
import com.example.CameraCheck.model.camera.CameraModel;
import com.example.CameraCheck.model.stream.StreamCameraModel;
import com.example.CameraCheck.model.stream.StreamUrlModel;
import com.example.CameraCheck.repository.CameraRepository;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class StreamCameraServiceImpl implements StreamCameraService{
    private final CameraRepository cameraRepository;
    private final CameraMapper cameraMapper;

    public StreamCameraServiceImpl(CameraRepository cameraRepository, CameraMapper cameraMapper) {
        this.cameraRepository = cameraRepository;
        this.cameraMapper = cameraMapper;
    }

    @Override
    public List<StreamCameraDTO> getAllStreamCameras() {
        return cameraRepository.findAll().stream()
                .map(cameraMapper::toStreamCameraDTO)
                .collect(Collectors.toList());
    }

    @Override
    public StreamCameraDTO getStreamCameraById(Long id) {
        return cameraMapper.toStreamCameraDTO(cameraRepository.findById(id).orElseThrow(() ->
                        new EntityNotFoundException(String.format("Camera with id %d not found", id))));
    }

    @Override
    public StreamUrlDTO getStreamUrlById(Long id) {
        return cameraMapper.toStreamUrlDTO(cameraRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("Stream url with id %d not found", id))));
    }
}
