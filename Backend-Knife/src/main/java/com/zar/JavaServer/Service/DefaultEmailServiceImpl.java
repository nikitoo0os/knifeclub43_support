package com.zar.JavaServer.Service;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@AllArgsConstructor
public class DefaultEmailServiceImpl implements DefaultEmailService{
    private final JavaMailSender emailSender;

    @Autowired
    private Environment env;

    @Override
    public void sendSimpleEmail(String toAddress, String subject, String message) {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();
        simpleMailMessage.setTo(toAddress);
        simpleMailMessage.setFrom(Objects.requireNonNull(env.getProperty("spring.mail.username")));
        simpleMailMessage.setSubject(subject);
        simpleMailMessage.setText(message);
        emailSender.send(simpleMailMessage);
    }

    @Override
    public String getMail() {
        return env.getProperty("mail.to");
    }
}
