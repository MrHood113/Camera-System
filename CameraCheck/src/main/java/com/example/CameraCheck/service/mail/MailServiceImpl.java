package com.example.CameraCheck.service.mail;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class MailServiceImpl implements MailService {
    private final JavaMailSender mailSender;
    @Value("${app.mail.from}")
    private String fromEmail;

    @Value("${sendgrid.api.key}")
    private String sendgridApiKey;

    public MailServiceImpl(JavaMailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public void sendHtmlMail(String to, String subject, String htmlContent) {
        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            System.out.println(htmlContent);

            mailSender.send(message);
        } catch (MessagingException e) {
            throw new RuntimeException("Failed to send email!", e);
        }
    }

    @Override
    public void sendVerificationEmail(String to, String verificationLink) {
            String subject = ("Verify your account");

            String content = """
                <h2>Welcome to Lamtusco!</h2>
                <p>Click the link below to verify your account:</p>
                <p><a href="%s" target="_blank">Verify account</a></p>
                <br/>
                <p>This link will expire in <b>5 minutes</b>.</p>
                """.formatted(verificationLink);
            System.out.println(content);

        sendHtmlMail(to, subject, content);


    }

    public void testSendGridKey() {
        System.out.println("Using SendGrid API Key: " + sendgridApiKey);
    }
}
