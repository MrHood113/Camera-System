package com.example.CameraCheck.mapper;

import com.example.CameraCheck.dto.camera.*;
import com.example.CameraCheck.model.camera.CameraModel;
import org.mapstruct.*;


@Mapper(componentModel = "spring")
public interface CameraMapper {


    CameraDTO toDto(CameraModel cameraModel);  // Map all camera
    StreamCameraDTO toStreamCameraDTO(CameraModel cameraModel);  // Map stream camera
    StreamUrlDTO toStreamUrlDTO(CameraModel cameraModel);  // Map url to check
    CameraHealthCheckDTO toHealthCheckDTO(CameraModel model);  // Map health check type
    CameraHealthStatusDTO toHealthStatusDTO(CameraModel model);  // Map status

    @Mapping(source = "id", target = "id", ignore = true)
    @Mapping(source = "healthStatusEnum", target = "healthStatusEnum")
    @Mapping(target = "healthCheckTypeEnum", ignore = true)
    CameraModel toEntity(CameraDTO dto);

    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void updateCameraFromDto(CameraDTO dto, @MappingTarget CameraModel entity);

    @Mappings({
            @Mapping(target = "healthStatusEnum", source = "healthStatusEnum"),
            @Mapping(target = "note", source = "note"),
            @Mapping(target = "lastPingAt", source = "lastPingAt"),
    })
    void updateHealthStatusDTO(CameraHealthStatusDTO dto, @MappingTarget CameraModel camera);
}
