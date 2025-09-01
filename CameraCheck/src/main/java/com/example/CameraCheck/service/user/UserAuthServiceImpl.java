package com.example.CameraCheck.service.user;

import com.example.CameraCheck.dto.user.PendingActionRequestDTO;
import com.example.CameraCheck.dto.user.PendingActionResponseDTO;
import com.example.CameraCheck.dto.user.RegisterRequestDTO;
import com.example.CameraCheck.exception.DuplicateResourceException;
import com.example.CameraCheck.exception.InvalidTokenException;
import com.example.CameraCheck.mapper.PendingActionMapper;
import com.example.CameraCheck.mapper.UserMapper;
import com.example.CameraCheck.dto.jwt.LoginResponseDTO;
import com.example.CameraCheck.model.token.RefreshTokenModel;
import com.example.CameraCheck.model.user.ActionTypeEnum;
import com.example.CameraCheck.model.user.PendingActionModel;
import com.example.CameraCheck.model.user.UserModel;
import com.example.CameraCheck.dto.user.RegisterResponseDTO;
import com.example.CameraCheck.repository.PendingActionRepository;
import com.example.CameraCheck.service.jwt.UserDetailsImpl;
import com.example.CameraCheck.repository.UserRepository;
//import com.example.CameraCheck.service.redis.TokenService;
import com.example.CameraCheck.service.mail.MailService;
import com.example.CameraCheck.service.token.RefreshTokenService;
import com.example.CameraCheck.service.jwt.JwtService;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserAuthServiceImpl implements UserAuthService {

    private final UserRepository userRepository;
    private final PendingActionRepository pendingActionRepository;
    private final PasswordEncoder passwordEncoder;
    private final UserMapper userMapper;
    private final PendingActionMapper pendingActionMapper;
    private final JwtService jwtService;
    private final RefreshTokenService refreshTokenService;
    private final PendingActionService pendingActionService;
    private final MailService mailService;
//    private final TokenService tokenService;

//    @Value("${jwt.expiration}")
//    private long jwtExpiration;
//    @Value("${jwt.refreshExpirationMs}")
//    private long jwtRefreshExpirationMs;

    public UserAuthServiceImpl(UserRepository userRepository, PendingActionRepository pendingActionRepository, PasswordEncoder passwordEncoder, UserMapper userMapper, PendingActionMapper pendingActionMapper, JwtService jwtService, RefreshTokenService refreshTokenService, PendingActionService pendingActionService, MailService mailService) {
        this.userRepository = userRepository;
        this.pendingActionRepository = pendingActionRepository;
        this.passwordEncoder = passwordEncoder;
        this.userMapper = userMapper;
        this.pendingActionMapper = pendingActionMapper;
        this.jwtService = jwtService;
        this.refreshTokenService = refreshTokenService;
//        this.tokenService = tokenService;
        this.pendingActionService = pendingActionService;
        this.mailService = mailService;
    }
    @Override
    @Transactional
    public RegisterResponseDTO register(RegisterRequestDTO registerDto) {
        if (userRepository.existsByCredentialUsername(registerDto.getUsername())) {
            throw new DuplicateResourceException(
                    String.format("User with username %s already exists", registerDto.getUsername()));
        }

        String payloadJson = pendingActionMapper.payloadJson(registerDto, passwordEncoder.encode(registerDto.getPassword()));

        PendingActionResponseDTO pending = pendingActionService.createPendingAction(
                registerDto.getEmail(),
                ActionTypeEnum.REGISTER,
                payloadJson
        );

        String verificationLink = String.format(
                "http://localhost:5173/api/auth/verify-register?token=%s&actionType=%s",
                pending.getToken(),
                ActionTypeEnum.REGISTER.name()
        );

        mailService.sendVerificationEmail(registerDto.getEmail(), verificationLink);

        return new RegisterResponseDTO("Check your email to verify your account!");

//        UserModel userModel = userMapper.toUser(registerDto, passwordEncoder);
//        UserModel saved = userRepository.save(userModel);
//        return userMapper.toUserResponse(saved);
    }

    @Override
    @Transactional
    public RegisterResponseDTO verifyRegister(String token) {
        PendingActionRequestDTO pendingAction = pendingActionService.verifyToken(token, ActionTypeEnum.REGISTER)
                .orElseThrow(() -> new InvalidTokenException("Token is invalid or expired"));

        PendingActionModel model = pendingActionRepository.findByToken(token)
                .orElseThrow(() -> new InvalidTokenException("Token not found"));

        UserModel user = userMapper.pendingActionToUser(model);
        UserModel saved = userRepository.save(user);
        return userMapper.toUserResponse(saved);
    }

    @Override
    public LoginResponseDTO login(String username, String password) {
        UserModel userModel = userRepository.findByCredentialUsername(username)
                .orElseThrow(() -> new EntityNotFoundException(String.format("User with username %s not found", username)));

        if (!passwordEncoder.matches(password, userModel.getCredential().getPassword())) {
            throw new BadCredentialsException("Invalid password");
        }

        UserDetails userDetails = new UserDetailsImpl(userModel);

        String accessToken = jwtService.generateToken(userDetails);
        String refreshToken = refreshTokenService.createRefreshToken(userModel).getToken();

//        tokenService.saveAccessToken(accessToken, jwtExpiration);
//        tokenService.saveRefreshToken(refreshToken, jwtRefreshExpirationMs, user.getId());

        return new LoginResponseDTO(userModel.getId(), accessToken, refreshToken, userModel.getRoleEnum());
    }

    @Override
    @Transactional
    public void logout(String refreshToken) {
        refreshTokenService.deleteByToken(refreshToken);
//        tokenService.removeToken(accessToken, refreshToken);
    }

    @Override
    public String refreshAccessToken(String refreshToken) {
        RefreshTokenModel token = refreshTokenService.verifyExpiration(refreshToken);
        UserModel userModel = token.getUserModel();
        return jwtService.generateToken(new UserDetailsImpl(userModel));
    }


}
