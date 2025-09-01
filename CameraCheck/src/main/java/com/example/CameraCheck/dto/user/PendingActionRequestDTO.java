package com.example.CameraCheck.dto.user;

import com.example.CameraCheck.model.user.ActionTypeEnum;
import lombok.Data;

@Data
public class PendingActionRequestDTO {
    private String email;
    private ActionTypeEnum actionType;
    private String payload;

    public PendingActionRequestDTO(String email, ActionTypeEnum actionType, String payload) {
        this.email = email;
        this.actionType = actionType;
        this.payload = payload;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public ActionTypeEnum getActionType() {
        return actionType;
    }

    public void setActionType(ActionTypeEnum actionType) {
        this.actionType = actionType;
    }

    public String getPayload() {
        return payload;
    }

    public void setPayload(String payload) {
        this.payload = payload;
    }
}
