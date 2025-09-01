package com.example.CameraCheck.service.user;

import com.example.CameraCheck.dto.user.AvatarDTO;
import com.example.CameraCheck.dto.user.BackgroundDTO;
import com.example.CameraCheck.dto.user.UserDTO;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public interface UserService {
    // CRUD
    List<UserDTO> getAllUsers();
    UserDTO getUserById(Long id);
    UserDTO updateUser(Long id, UserDTO userDto);
    AvatarDTO updateAvatar(Long id, MultipartFile file);
    BackgroundDTO updateBackground(Long id, MultipartFile file);
    void deleteUser(Long id);
}
