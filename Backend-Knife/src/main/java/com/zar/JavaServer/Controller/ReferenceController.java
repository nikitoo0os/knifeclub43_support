package com.zar.JavaServer.Controller;

import com.zar.JavaServer.Entity.*;
import com.zar.JavaServer.Service.DefaultEmailService;
import com.zar.JavaServer.Service.ReferenceService;
import lombok.AllArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.MailException;
import org.springframework.web.bind.annotation.*;

import java.math.BigInteger;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class ReferenceController {
    private final ReferenceService referenceService;
    private final DefaultEmailService emailService;

    @GetMapping("/referencesimgall")
    public List<ImgReference> getAllImageByReferences(){
        return referenceService.getAllImageByReferences();
    }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ УСЛУГ
    @GetMapping("/referenceslist")
    public List<Reference> getAllReferences(){
        return referenceService.getAllReferences();
    }

    @GetMapping("/getdate")
    public Map<String, Object> getDate(){
        return referenceService.getDate();
    }

    @GetMapping("/referenceslistreservation")
    public List<Map<String, Object>> getAllReferencesReservation(@RequestParam String date, @RequestParam String token){
        return referenceService.getAllReferencesReservation(date, token);
    }

    @GetMapping("/referenceslistclient")
    public ResponseEntity<List<Reference>> getAllReferencesForClient(){
        return referenceService.getAllReferencesForClient();
    }

    //МЕТОД ПОЛУЧЕНИЯ УСЛУГИ ПО ID
    @GetMapping("/reference/{id}")
    public Map<String, Object> getByReference_Id(@PathVariable("id") Short id){
        return referenceService.getByReference_Id(id);
    }

    @PostMapping("/addreference")
    public void saveReference(@RequestBody Reference reference, @RequestParam String token){
        referenceService.AddReference(reference, token);
    }

    @PostMapping("/delreference")
    public boolean delReference(@RequestBody Reference reference, @RequestParam String token){
        return referenceService.DelReference(reference, token);
    }

    @PostMapping("/addbirthday")
    public void saveBirthday(@RequestBody Birthday birthday, @RequestParam String token){
        referenceService.AddBirthday(birthday, token);
    }

    @PostMapping("/delbirthday")
    public boolean delBirthday(@RequestBody Birthday birthday, @RequestParam String token){
        return referenceService.DelBirthday(birthday, token);
    }

    @PostMapping("/addimgreference")
    public void saveImgReference(@RequestBody ImgReference imgReference, @RequestParam String token){
        referenceService.AddImgReference(imgReference, token);
    }

    @PostMapping("/delimgreference")
    public boolean delImgReference(@RequestBody ImgReference imgReference, @RequestParam String token){
        return referenceService.DelImgReference(imgReference, token);
    }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ БРОНЕЙ ЗА ДЕНЬ
    @GetMapping("/reservreferences")
    public List<ReservReference> getAllReservReferencesByDate(@RequestParam String date, @RequestParam String token){
        return referenceService.getAllReservReferencesByDate(date, token);
    }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ БРОНЕЙ
    @GetMapping("/reservreferencesall")
    public List<ReservReference> getAllReservReferences(@RequestParam String token){
        return referenceService.getAllReservReferences(token);
    }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ АКТИВНЫХ БРОНЕЙ ЗА ДЕНЬ
    @GetMapping("/reservreferencesactive")
    public List<ReservReference> getAllReservReferencesByDateAtive(@RequestParam String date, @RequestParam String token){
        return referenceService.getAllReservReferencesByDateActiveFalse(date, token);
    }

    @GetMapping("/reservreferencesperiod")
    public List<ReservReference> getAllReservReferencesByPeriod(@RequestParam Short idReference){
        return referenceService.getAllReservReferencesByStartDateAndEndDate(idReference);
    }

    @PostMapping("/reservReference")
    public boolean reservReference(@RequestBody ReservReference reservReference, @RequestParam String token){
        BigInteger id = reservReference.getId();
        if (referenceService.reservReference(reservReference, token))
        {
            if (id == null) {
                if (reservReference.getFioClient() != null) {
                    if (reservReference.getFioClient() != "") {
                        new Thread(new Runnable() { // самому себе
                            @Override
                            public void run() {
                                try {
                                    String message = "Дата бронирования: " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\r\n";
                                    if (reservReference.getTime() != null)
                                        message += "Время бронирования: " + reservReference.getTime() + "\r\n";
                                    if (reservReference.getReference() != null)
                                        message += "Услуга: " + reservReference.getReference().getName() + "\r\n" + "\r\n";
                                    if (reservReference.getFioClient() != null)
                                        message += "Клиент: " + reservReference.getFioClient() + "\r\n";
                                    if (reservReference.getPhone() != null)
                                        message += "Телефон: " + reservReference.getPhone() + "\r\n";
                                    if (reservReference.getEmail() != null)
                                        message += "E-mail: " + reservReference.getEmail() + "\r\n";
                                    if (reservReference.getCount_person() != null)
                                        message += "Количество человек: " + reservReference.getCount_person() + "\r\n";
                                    if (reservReference.getDescription() != null)
                                        message += "Комментарий: " + reservReference.getDescription() + "\r\n";
                                    if (reservReference.getDescriptionAdmin() != null)
                                        message += "Комментарий админа: " + reservReference.getDescriptionAdmin() + "\r\n";

                                    emailService.sendSimpleEmail(emailService.getMail(),
                                            "[С админа] Новое бронирование на " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM")) + " " + reservReference.getTime(),
                                            message
                                    );
                                } catch (MailException mailException) {
                                    System.out.println("Ошибка отправки сообщения... " + mailException.getMessage());
                                }
                            }
                        }).start();

                        if (reservReference.getEmail() != null && reservReference.getEmail() != "") {
                            new Thread(new Runnable() { // клиентам
                                @Override
                                public void run() {
                                    try {
                                        String message;
                                        message = "Для подтверждения бронирования мы свяжемся с вами в Telegram или ВКонтакте для внесения предоплаты." + "\r\n" + "\r\n";
                                        message += "Если вы не получили сообщение, это значит, что ваш номер телефона не привязан к Telegram. В этом случае, пожалуйста, напишите нам в Telegram или ВКонтакте самостоятельно. \n" +
                                                "Нам можно написать в Telegram по номеру +7 (958) 391-55-72, или @KnifeClubKirov" + "\r\n" + "\r\n";
                                        message += "Дата бронирования: " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\r\n";
                                        message += "Время бронирования: " + reservReference.getTime() + "\r\n";
                                        message += "Услуга: " + reservReference.getReference().getName() + "\r\n" + "\r\n";
                                        message += "Клиент: " + reservReference.getFioClient() + "\r\n";
                                        if (reservReference.getPhone() != null)
                                            message += "Телефон: " + reservReference.getPhone() + "\r\n";
                                        message += "E-mail: " + reservReference.getEmail() + "\r\n";
                                        message += "Количество человек: " + reservReference.getCount_person() + "\r\n";
                                        if (reservReference.getDescription() != null)
                                            message += "Комментарий: " + reservReference.getDescription() + "\r\n";
                                        message += "\r\n" + "Забронировали за вами тренировку, будем ждать! Орловская, 15 \r\n" +
                                                "Если у вас что-то изменится, позвоните пожалуйста заранее по номеру телефона +7 (833) 279-94-74.\r\n" +
                                                "Оплата на месте НАЛИЧНЫМИ.\r\n";
                                        message += "\r\n" + "У нас обязательна сменная обувь, но если вам не удобно брать ее с собой, то вы можете переодеться в наши тапочки. \r\n";
                                        message += "\r\n" + "Бахил и одноразовых носков у нас нет.";
                                        emailService.sendSimpleEmail(reservReference.getEmail(),
                                                "Новое бронирование на " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM")) + " " + reservReference.getTime(),
                                                message
//                                "Дата бронирования: " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\r\n" +
//                                        "Время бронирования: " + reservReference.getTime() + "\r\n" +
//                                        "Услуга: " + reservReference.getReference().getName() + "\r\n" +
//                                        "\r\n" +
//                                        "Клиент: " + reservReference.getFioClient() + "\r\n" +
//                                        "Телефон: " + reservReference.getPhone() + "\r\n" +
//                                        "E-mail: " + reservReference.getEmail() + "\r\n" +
//                                        "Количество человек: " + reservReference.getCount_person() + "\r\n" +
//                                        "Комментарий: " + reservReference.getDescription()
                                        );
                                    } catch (MailException mailException) {
                                        System.out.println("Ошибка отправки сообщения... " + mailException.getMessage());
                                    }
                                }
                            }).start();
                        }
                    }
                }
            }
            return true;
        }
        else return false;
    }

    @PostMapping(value="/reservReferenceclient")
    public Boolean reservReferenceClient(@RequestBody ReservReference reservReference){
        Boolean result = referenceService.reservReferenceClient(reservReference);
        if (Boolean.TRUE.equals(result)) {
            //ОТПРАВКА ПОЧТЫ
            new Thread(new Runnable() { // самому себе
                @Override
                public void run() {
                    try {
                        emailService.sendSimpleEmail(emailService.getMail(),
                                "[С клиента] Новое бронирование на " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM")) + " " + reservReference.getTime(),
                                "Дата бронирования: " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\r\n" +
                                        "Время бронирования: " + reservReference.getTime() + "\r\n" +
                                        "Услуга: " + reservReference.getReference().getName() + "\r\n" +
                                        "\r\n" +
                                        "Клиент: " + reservReference.getFioClient() + "\r\n" +
                                        "Телефон: " + reservReference.getPhone() + "\r\n" +
                                        "E-mail: " + reservReference.getEmail() + "\r\n" +
                                        "Количество человек: " + reservReference.getCount_person() + "\r\n" +
                                        "Комментарий: " + reservReference.getDescription()
                        );
                    } catch (MailException mailException) {
                        System.out.println("Ошибка отправки сообщения... " + mailException.getMessage());
                    }
                }
            }).start();
            if (reservReference.getEmail() != null && reservReference.getEmail() != "") {
                new Thread(new Runnable() { // клиентам
                    @Override
                    public void run() {
                        try {
                            String message;
                            message = "Для подтверждения бронирования мы свяжемся с вами в Telegram или ВКонтакте для внесения предоплаты." + "\r\n" + "\r\n";
                            message += "Если вы не получили сообщение, это значит, что ваш номер телефона не привязан к Telegram. В этом случае, пожалуйста, напишите нам в Telegram или ВКонтакте самостоятельно. \n" +
                                    "Нам можно написать в Telegram по номеру +7 (958) 391-55-72, или @KnifeClubKirov" + "\r\n" + "\r\n";
                            message += "Дата бронирования: " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\r\n";
                            message += "Время бронирования: " + reservReference.getTime() + "\r\n";
                            message += "Услуга: " + reservReference.getReference().getName() + "\r\n" + "\r\n";
                            message += "Клиент: " + reservReference.getFioClient() + "\r\n";
                            if (reservReference.getPhone() != null)
                                message += "Телефон: " + reservReference.getPhone() + "\r\n";
                            message += "E-mail: " + reservReference.getEmail() + "\r\n";
                            message += "Количество человек: " + reservReference.getCount_person() + "\r\n";
                            if (reservReference.getDescription() != null)
                                message += "Комментарий: " + reservReference.getDescription() + "\r\n";
                            message += "\r\n" + "Забронировали за вами тренировку, будем ждать! Орловская, 15 \r\n" +
                                    "Если у вас что-то изменится, позвоните пожалуйста заранее по номеру телефона +7 (833) 279-94-74.\r\n" +
                                    "Оплата на месте НАЛИЧНЫМИ.\r\n";
                            message += "\r\n" + "У нас обязательна сменная обувь, но если вам не удобно брать ее с собой, то вы можете переодеться в наши тапочки. \r\n";
                            message += "\r\n" + "Бахил и одноразовых носков у нас нет.";
                            emailService.sendSimpleEmail(reservReference.getEmail(),
                                    "Новое бронирование на " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM")) + " " + reservReference.getTime(),
                                    message
//                                "Дата бронирования: " + reservReference.getDate().format(DateTimeFormatter.ofPattern("dd/MM/yyyy")) + "\r\n" +
//                                        "Время бронирования: " + reservReference.getTime() + "\r\n" +
//                                        "Услуга: " + reservReference.getReference().getName() + "\r\n" +
//                                        "\r\n" +
//                                        "Клиент: " + reservReference.getFioClient() + "\r\n" +
//                                        "Телефон: " + reservReference.getPhone() + "\r\n" +
//                                        "E-mail: " + reservReference.getEmail() + "\r\n" +
//                                        "Количество человек: " + reservReference.getCount_person() + "\r\n" +
//                                        "Комментарий: " + reservReference.getDescription()
                            );
                        } catch (MailException mailException) {
                            System.out.println("Ошибка отправки сообщения... " + mailException.getMessage());
                        }
                    }
                }).start();
            }
            return true;
        }
        else if (result == null) {
            return null;
        }
        else return false;
    }

    @GetMapping("/birthdaysclient")
    public List<Birthday> getAllBirthdaysForClient(){
        return referenceService.getAllBirthdaysForClient();
    }

    @GetMapping("/birthdays")
    public List<Birthday> getAllBirthdays(){
        return referenceService.getAllBirthdays();
    }

    @GetMapping("/gettopreferences")
    public List<Map<String, Object>> getTopReferences(){
        return referenceService.getTopReferences();
    }

    @PostMapping("/addreservblock")
    public boolean saveReservBlock(@RequestBody ReservBlock reservBlock, @RequestParam String token){
        return referenceService.AddReservBlock(reservBlock, token);
    }

    @PostMapping("/delreservblock")
    public boolean delReservBlock(@RequestBody ReservBlock reservBlock, @RequestParam String token){
        return referenceService.DelReservBlock(reservBlock, token);
    }

    @GetMapping("/getreservblocks")
    public List<ReservBlock> getReservBlocks(@RequestParam String date, @RequestParam String token){
        return referenceService.getAllReservBlocks(date, token);
    }
}
