package com.zar.JavaServer.Service;

import com.zar.JavaServer.Entity.*;

import java.util.List;

public interface RestroomService {
    List<Restroom> getAllRestrooms();
    List<ReservRestroom> getAllReservRestroomsByDate(String date, String token);
    void AddRestroom(Restroom restroom, String token);
    boolean DelRestroom(Restroom restroom, String token);
    boolean DelReservRestroom(ReservRestroom reservrestroom, String token);
    boolean reservRestroom(ReservRestroom reservRestroom, String token);
}
