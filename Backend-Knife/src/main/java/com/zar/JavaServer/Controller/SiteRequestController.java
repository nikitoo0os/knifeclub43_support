package com.zar.JavaServer.Controller;

import com.zar.JavaServer.DTO.SiteRequest;
import com.zar.JavaServer.Service.DefaultEmailService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Map;
import java.util.concurrent.CompletableFuture;

@RestController
@AllArgsConstructor
public class SiteRequestController {
    private final DefaultEmailService emailService;

    @PostMapping("/site-request")
    public ResponseEntity<Boolean> sendSiteRequest(@RequestBody SiteRequest request) {
        if (request == null || isBlank(request.getName()) || isBlank(request.getPhone())) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(false);
        }

        // Простая защита от ботов: реальный пользователь это поле не заполняет.
        if (!isBlank(request.getWebsite())) {
            return ResponseEntity.ok(true);
        }

        final String subject = buildSubject(request);
        final String message = buildMessage(request);

        CompletableFuture.runAsync(() -> {
            try {
                emailService.sendSimpleEmail(emailService.getMail(), subject, message);
            } catch (MailException mailException) {
                System.out.println("Ошибка отправки заявки с сайта... " + mailException.getMessage());
            }
        });

        return ResponseEntity.ok(true);
    }

    private String buildSubject(SiteRequest request) {
        String subject = "[С сайта] Новая заявка";
        if (!isBlank(request.getPage())) {
            subject += ": " + trimForSubject(request.getPage());
        }
        return subject;
    }

    private String buildMessage(SiteRequest request) {
        StringBuilder message = new StringBuilder();
        message.append("Новая заявка с сайта").append("\r\n\r\n");
        appendLine(message, "Страница", request.getPage());
        appendLine(message, "Заголовок формы", request.getTitle());
        appendLine(message, "Имя", request.getName());
        appendLine(message, "Телефон", request.getPhone());
        appendLine(message, "E-mail", request.getEmail());

        if (request.getFields() != null && !request.getFields().isEmpty()) {
            message.append("\r\nДетали:\r\n");
            for (Map.Entry<String, String> entry : request.getFields().entrySet()) {
                appendLine(message, entry.getKey(), entry.getValue());
            }
        }

        appendLine(message, "Комментарий", request.getMessage());
        appendLine(message, "URL", request.getSourceUrl());
        appendLine(message, "Дата отправки", LocalDateTime.now().format(DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm")));
        return message.toString();
    }

    private void appendLine(StringBuilder builder, String label, String value) {
        if (!isBlank(value)) {
            builder.append(label).append(": ").append(value.trim()).append("\r\n");
        }
    }

    private boolean isBlank(String value) {
        return value == null || value.trim().isEmpty();
    }

    private String trimForSubject(String value) {
        String normalized = value.replaceAll("[\\r\\n]+", " ").trim();
        return normalized.length() > 80 ? normalized.substring(0, 80) : normalized;
    }
}
