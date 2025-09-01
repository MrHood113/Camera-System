package com.example.CameraCheck.service.user;

import com.example.CameraCheck.dto.user.PendingActionRequestDTO;
import com.example.CameraCheck.dto.user.PendingActionResponseDTO;
import com.example.CameraCheck.model.user.ActionTypeEnum;

import java.util.Optional;

public interface PendingActionService {
    PendingActionResponseDTO createPendingAction(String email, ActionTypeEnum actionType, String payloadJson);
    Optional<PendingActionRequestDTO> verifyToken(String token, ActionTypeEnum actionType);
    void deletePendingAction(String email, ActionTypeEnum actionType);
    boolean existsPendingAction(String email, ActionTypeEnum actionType);
}
