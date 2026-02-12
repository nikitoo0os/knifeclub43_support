package com.zar.JavaServer;

import com.zar.JavaServer.Service.DefaultEmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.event.EventListener;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.time.LocalDateTime;

@SpringBootApplication
public class JavaServerApplication {

	@Autowired
	private DefaultEmailService emailService;

    public JavaServerApplication(DefaultEmailService emailService) {
        this.emailService = emailService;
    }

    public static void main(String[] args) {
		SpringApplication.run(JavaServerApplication.class, args);
	}

	@EventListener(ApplicationReadyEvent.class)
	public void sendStartupEmail() {
		emailService.sendSimpleEmail("clubknife@yandex.ru", "[INFO] Сервер запущен", "Это сообщение было отправлено автоматически при запуске сервера для проверки работоспособности почтового сервиса. Время запуска: " + LocalDateTime.now());
	}
}
