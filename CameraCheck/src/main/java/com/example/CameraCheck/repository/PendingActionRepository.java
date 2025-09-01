package com.example.CameraCheck.repository;

import com.example.CameraCheck.model.user.ActionTypeEnum;
import com.example.CameraCheck.model.user.PendingActionModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PendingActionRepository extends JpaRepository<PendingActionModel, Long> {
    Optional<PendingActionModel> findByToken(String token);
    Optional<PendingActionModel> findByEmailAndActionType(String email, ActionTypeEnum actionType);

    boolean existsByEmailAndActionType(String email, ActionTypeEnum actionType);
    void deleteByEmailAndActionType(String email, ActionTypeEnum actionType);
}
