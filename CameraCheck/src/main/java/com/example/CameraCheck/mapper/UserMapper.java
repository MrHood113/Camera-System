package com.example.CameraCheck.mapper;

import com.example.CameraCheck.dto.user.*;
import com.example.CameraCheck.model.user.RoleEnum;
import com.example.CameraCheck.model.user.UserCredentialModel;
import com.example.CameraCheck.model.user.UserModel;
import com.example.CameraCheck.model.user.PendingActionModel;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.mapstruct.Context;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.time.LocalDate;

@Mapper(componentModel = "spring")
public interface UserMapper {
    @Mapping(target = "password", expression = "java(passwordEncoder.encode(dto.getPassword()))")
    UserCredentialModel toCredential(RegisterRequestDTO dto, @Context PasswordEncoder passwordEncoder);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "phone", ignore = true)
    @Mapping(target = "name", ignore = true)
    @Mapping(target = "gender", ignore = true)
    @Mapping(target = "joinedDate", ignore = true)
    @Mapping(target = "description", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "background", ignore = true)
    @Mapping(target = "roleEnum", constant = "USER")
    @Mapping(target = "credential", expression = "java(toCredential(dto, passwordEncoder))")
    UserModel toUser(RegisterRequestDTO dto, @Context PasswordEncoder passwordEncoder);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "credential.username", target = "username")
    @Mapping(source = "credential.email", target = "email")
    RegisterResponseDTO toUserResponse(UserModel userModel);

    @Mapping(source = "id", target = "id")
    @Mapping(source = "name", target = "name")
    @Mapping(source = "credential.email", target = "email")
    @Mapping(source = "phone", target = "phone")
    @Mapping(source = "gender", target = "gender")
    @Mapping(source = "joinedDate", target = "joinedDate")
    @Mapping(source = "description", target = "description")
    @Mapping(source = "avatar", target = "avatar")
    @Mapping(source = "background", target = "background")
    UserDTO toUserDTO(UserModel userModel);

    @Mapping(target = "credential.username", ignore = true)
    @Mapping(target = "credential.password", ignore = true)
    @Mapping(target = "roleEnum", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(source = "email", target = "credential.email")
    void updateUserFromDTO(UserDTO dto, @MappingTarget UserModel model);

    AvatarDTO toAvatarDTO(UserModel user);
    BackgroundDTO toBackgroundDTO(UserModel user);

    default UserModel pendingActionToUser(PendingActionModel pendingAction) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            JsonNode payload = mapper.readTree(pendingAction.getPayload());

            String username = payload.get("username").asText();
            String password = payload.get("password").asText();

            UserModel user = new UserModel();
            UserCredentialModel credential = new UserCredentialModel();
            credential.setUsername(username);
            credential.setPassword(password);

            user.setCredential(credential);
            user.setRoleEnum(RoleEnum.USER);
            user.setJoinedDate(LocalDate.now());
            return user;
        } catch (Exception e) {
            throw new RuntimeException("Error mapping PendingAction to User", e);
        }
    }
}
