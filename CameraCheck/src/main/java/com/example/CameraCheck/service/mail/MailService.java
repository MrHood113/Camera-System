package com.example.CameraCheck.service.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public interface MailService {
    void sendHtmlMail(String to, String subject, String htmlContent);
    void sendVerificationEmail(String to, String verificationLink);

}
