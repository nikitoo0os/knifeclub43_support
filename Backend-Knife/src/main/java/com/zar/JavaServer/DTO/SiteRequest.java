package com.zar.JavaServer.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Map;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class SiteRequest {
    private String page;
    private String title;
    private String name;
    private String phone;
    private String email;
    private String message;
    private String sourceUrl;
    private String website; // honeypot: если заполнено ботом, заявку игнорируем
    private Map<String, String> fields;
}
