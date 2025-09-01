package com.example.CameraCheck.service.user;

import com.example.CameraCheck.dto.user.PendingActionRequestDTO;
import com.example.CameraCheck.dto.user.PendingActionResponseDTO;
import com.example.CameraCheck.mapper.PendingActionMapper;
import com.example.CameraCheck.model.user.ActionTypeEnum;
import com.example.CameraCheck.model.user.PendingActionModel;
import com.example.CameraCheck.repository.PendingActionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PendingActionServiceImpl implements PendingActionService{
    private final PendingActionRepository pendingActionRepository;
    private final PendingActionMapper pendingActionMapper;

    public PendingActionServiceImpl(PendingActionRepository pendingActionRepository, PendingActionMapper pendingActionMapper) {
        this.pendingActionRepository = pendingActionRepository;
        this.pendingActionMapper = pendingActionMapper;
    }

    @Override
    @Transactional
    public PendingActionResponseDTO createPendingAction(String email, ActionTypeEnum actionType, String payloadJson) {
        pendingActionRepository.deleteByEmailAndActionType(email, actionType);

        PendingActionModel entity = pendingActionMapper.toEntity(email, actionType, payloadJson);
        PendingActionModel saved = pendingActionRepository.save(entity);

        return pendingActionMapper.toResponseDTO(saved);
    }

    @Override
    public Optional<PendingActionRequestDTO> verifyToken(String token, ActionTypeEnum actionType) {
        return pendingActionRepository.findByToken(token)
                .filter(pending -> pending.getActionType() == actionType)
                .filter(pending -> pending.getExpiry().isAfter(LocalDateTime.now()))
                .map(pending -> {
                    PendingActionRequestDTO dto = pendingActionMapper.toRequestDTO(pending);

                    pendingActionRepository.delete(pending);

                    return dto;
                });
    }

    @Override
    @Transactional
    public void deletePendingAction(String email, ActionTypeEnum actionType) {
        pendingActionRepository.deleteByEmailAndActionType(email, actionType);
    }

    @Override
    public boolean existsPendingAction(String email, ActionTypeEnum actionType) {
        return pendingActionRepository.existsByEmailAndActionType(email, actionType);
    }
}
