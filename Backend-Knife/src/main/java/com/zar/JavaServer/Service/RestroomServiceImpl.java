package com.zar.JavaServer.Service;

import com.zar.JavaServer.Entity.ReservRestroom;
import com.zar.JavaServer.Entity.Restroom;
import com.zar.JavaServer.Repository.*;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
@AllArgsConstructor
public class RestroomServiceImpl implements RestroomService{

    private final RestroomRepository restroomRepository;
    private final ReservRestroomRepository reservRestroomRepository;
    private final AuthorizationService authService;

    @Override
    public List<Restroom> getAllRestrooms() {
        return restroomRepository.findAll();
    }

    @Override
    public List<ReservRestroom> getAllReservRestroomsByDate(String date, String token) {
        if (authService.findTokenTrenerAdmin(token)) {
            return reservRestroomRepository.findByDate(LocalDate.parse(date));
        }
        else return null;
    }

    @Override
    public void AddRestroom(Restroom restroom, String token) {
        if (authService.findTokenAdmin(token)) {
            restroomRepository.save(restroom);
        }
    }

    @Override
    public boolean DelRestroom(Restroom restroom, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                restroomRepository.delete(restroom);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public boolean DelReservRestroom(ReservRestroom reservrestroom, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                reservRestroomRepository.delete(reservrestroom);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
                return false;
            }
        }
        else return false;
    }

    @Override
    public boolean reservRestroom(ReservRestroom reservRestroom, String token) {
        if (authService.findTokenAdmin(token)) {
            try {
                reservRestroomRepository.save(reservRestroom);
                return true;
            } catch (Exception e) {
                System.out.println(e.getMessage());
            }
        }
        return false;
    }
}
