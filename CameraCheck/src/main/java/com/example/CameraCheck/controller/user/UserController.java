package com.example.CameraCheck.controller.user;

import com.example.CameraCheck.dto.user.AvatarDTO;
import com.example.CameraCheck.dto.user.BackgroundDTO;
import com.example.CameraCheck.dto.user.UserDTO;
import com.example.CameraCheck.service.user.UserAuthService;
import com.example.CameraCheck.service.user.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin(origins = "*", allowedHeaders = "*")
@RequestMapping("/api/users")
public class UserController {
    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping()
    public ResponseEntity<List<UserDTO>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDTO> getUserById(@PathVariable Long id){
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO dto){
        return ResponseEntity.ok(userService.updateUser(id, dto));
    }

    @PatchMapping("/{id}/avatar")
    public ResponseEntity<AvatarDTO> updateAvatar(@PathVariable Long id, @RequestParam("file") MultipartFile file){
        return ResponseEntity.ok(userService.updateAvatar(id, file));
    }

    @PatchMapping("/{id}/background")
    public ResponseEntity<BackgroundDTO> updateBackground(@PathVariable Long id, @RequestParam("file") MultipartFile file){
        return ResponseEntity.ok(userService.updateBackground(id, file));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id){
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}
