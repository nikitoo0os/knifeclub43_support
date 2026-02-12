package com.zar.JavaServer.Service;

import com.zar.JavaServer.Entity.*;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDate;
import java.util.List;
import java.util.Map;

public interface ReferenceService {
    boolean AddReservBlock(ReservBlock reservBlock, String token);
    boolean DelReservBlock(ReservBlock reservBlock, String token);
    void AddReference(Reference reference, String token);
    boolean DelReference(Reference reference, String token);
    void AddImgReference(ImgReference imgReference, String token);
    boolean DelImgReference(ImgReference imgReference, String token);
    void AddBirthday(Birthday birthday, String token);
    boolean DelBirthday(Birthday birthday, String token);
    Map<String, Object> getByReference_Id(short id);
    List<Reference> getAllReferences();
    List<Map<String, Object>> getAllReferencesReservation(String date, String token);
    ResponseEntity<List<Reference>> getAllReferencesForClient();
    List<ReservReference> getAllReservReferencesByDate(String date, String token);
    List<ReservReference> getAllReservReferences(String token);
    List<ReservReference> getAllReservReferencesByDateActive(String date);
    List<ReservReference> getAllReservReferencesByDateActiveFalse(String date, String token);
    List<ReservReference> getAllReservReferencesByStartDateAndEndDate(Short idReference);
    boolean reservReference(ReservReference reservReference, String token);
    Boolean reservReferenceClient(ReservReference reservReference);
    List<ImgReference> getAllImageByReferences();
    List<Birthday> getAllBirthdays();
    List<Birthday> getAllBirthdaysForClient();
    List<ReservBlock> getAllReservBlocks(String date, String token);
    List<Map<String, Object>> getTopReferences();
    Map<String, Object> getDate();
}
