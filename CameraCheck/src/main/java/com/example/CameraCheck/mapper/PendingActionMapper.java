package com.example.CameraCheck.mapper;

import com.example.CameraCheck.dto.user.PendingActionRequestDTO;
import com.example.CameraCheck.dto.user.PendingActionResponseDTO;
import com.example.CameraCheck.dto.user.RegisterRequestDTO;
import com.example.CameraCheck.model.user.ActionTypeEnum;
import com.example.CameraCheck.model.user.PendingActionModel;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import com.example.CameraCheck.util.TokenGenerator;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring", imports = {LocalDateTime.class, TokenGenerator.class, ActionTypeEnum.class})
public interface PendingActionMapper {
    PendingActionResponseDTO toResponseDTO(PendingActionModel model);
    PendingActionRequestDTO toRequestDTO(PendingActionModel model);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "token", expression = "java(TokenGenerator.generateToken())")
    @Mapping(target = "expiry", expression = "java(LocalDateTime.now().plusMinutes(5))")
    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
    PendingActionModel toEntity(String email, ActionTypeEnum actionType, String payloadJson);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "token", expression = "java(TokenGenerator.generateToken())")
    @Mapping(target = "expiry", expression = "java(LocalDateTime.now().plusMinutes(5))")
    @Mapping(target = "actionType", expression = "java(ActionTypeEnum.REGISTER)")
    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
    @Mapping(target = "payload", expression = "java(payloadJson(registerDto, encodedPassword))")
    PendingActionModel fromRegisterDto(RegisterRequestDTO registerDto, String encodedPassword);

//    @Mapping(target = "id", ignore = true)
//    @Mapping(target = "token", expression = "java(TokenGenerator.generateToken())")
//    @Mapping(target = "expiry", expression = "java(LocalDateTime.now().plusMinutes(5))")
//    @Mapping(target = "createdAt", expression = "java(LocalDateTime.now())")
//    PendingActionModel fromParams(String email, ActionTypeEnum actionType, String payloadJson);

    default String payloadJson(RegisterRequestDTO dto, String encodedPassword) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> payload = new HashMap<>();
            payload.put("username", dto.getUsername());
            payload.put("password", encodedPassword);
            return mapper.writeValueAsString(payload);
        } catch (Exception e) {
            throw new RuntimeException("Error creating payload JSON", e);
        }
    }
}
