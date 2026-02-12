package com.zar.JavaServer.Config;

import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.env.Environment;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@AllArgsConstructor
public class WebConfig implements WebMvcConfigurer {
    @Autowired
    private Environment env;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        String allowedOrigins = env.getProperty("cors.allowedOrigins");
        registry.addMapping("/**")
                .allowedOrigins(allowedOrigins);
    }
}
