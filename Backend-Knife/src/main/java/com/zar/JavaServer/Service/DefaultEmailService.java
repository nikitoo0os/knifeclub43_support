package com.zar.JavaServer.Service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

public interface DefaultEmailService {
    void sendSimpleEmail(String toAddress, String subject, String message);

    String getMail();
}
