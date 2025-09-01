package com.example.CameraCheck.service.user;

import com.example.CameraCheck.dto.user.AvatarDTO;
import com.example.CameraCheck.dto.user.BackgroundDTO;
import com.example.CameraCheck.dto.user.UserDTO;
import com.example.CameraCheck.mapper.UserMapper;
import com.example.CameraCheck.model.user.UserModel;
import com.example.CameraCheck.repository.UserRepository;
import com.example.CameraCheck.service.image.FileStorageService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {
    private final UserRepository userRepository;
    private final UserMapper userMapper;
    private final FileStorageService fileStorageService;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper, FileStorageService fileStorageService) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
        this.fileStorageService = fileStorageService;
    }

    @Override
    public List<UserDTO> getAllUsers() {
        return userRepository.findAll().stream()
                .map(userMapper::toUserDTO)
                .toList();
    }

    @Override
    public UserDTO getUserById(Long id) {
        return userMapper.toUserDTO(userRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with id %d not found", id))));
    }

    @Override
    @Transactional
    public UserDTO updateUser(Long id, UserDTO userDto) {
        UserModel user = userRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with id %d not found", id)));

        userMapper.updateUserFromDTO(userDto, user);
        return userMapper.toUserDTO(userRepository.save(user));
    }

    @Override
    @Transactional
    public AvatarDTO updateAvatar(Long id, MultipartFile file) {
        UserModel user = userRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with id %d not found", id)));

        String avatarUrl = fileStorageService.save(file);
        user.setAvatar(avatarUrl);

        UserModel savedUser = userRepository.save(user);

        return userMapper.toAvatarDTO(savedUser);
    }

    @Override
    @Transactional
    public BackgroundDTO updateBackground(Long id, MultipartFile file) {
        UserModel user = userRepository.findById(id).orElseThrow(() ->
                new EntityNotFoundException(String.format("User with id %d not found", id)));

        String backgroundUrl = fileStorageService.save(file);
        user.setBackground(backgroundUrl);

        UserModel saveUser = userRepository.save(user);

        return userMapper.toBackgroundDTO(saveUser);
    }

    @Override
    @Transactional
    public void deleteUser(Long id) {
        if (userRepository.existsById(id)){
            userRepository.deleteById(id);
        } else {
            throw new EntityNotFoundException(String.format("User with id %d not found", id));
        }

    }
}
