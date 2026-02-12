package com.zar.JavaServer.Controller;

import com.zar.JavaServer.Entity.ReservRestroom;
import com.zar.JavaServer.Entity.Restroom;
import com.zar.JavaServer.Service.RestroomService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@AllArgsConstructor
public class RestroomController {

    private final RestroomService restroomService;

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ КОМНАТ ОТДЫХА
    @GetMapping("/restrooms")
    public List<Restroom> getAllRestrooms(){
        return restroomService.getAllRestrooms();
    }

    @PostMapping("/addrestroom")
    public void saveTypeReference(@RequestBody Restroom restroom, @RequestParam String token){
        restroomService.AddRestroom(restroom, token);
    }

    @PostMapping("/delrestroom")
    public boolean delRestroom(@RequestBody Restroom restroom, @RequestParam String token){
        return restroomService.DelRestroom(restroom, token);
    }

    @PostMapping("/delreservrestroom")
    public boolean delReservRestroom(@RequestBody ReservRestroom reservrestroom, @RequestParam String token){
        return restroomService.DelReservRestroom(reservrestroom, token);
    }

    @PostMapping("/addreservrestroom")
    public void saveTypeReference(@RequestBody ReservRestroom reservRestroom, @RequestParam String token){
        restroomService.reservRestroom(reservRestroom, token);
    }

    //МЕТОД ПОЛУЧЕНИЯ ВСЕХ БРОНЕЙ КОМНАТ ЗА ДЕНЬ
    @GetMapping("/reservrestrooms")
    public List<ReservRestroom> getAllReservReferencesByDate(@RequestParam String date, @RequestParam String token){
        return restroomService.getAllReservRestroomsByDate(date, token);
    }
}
