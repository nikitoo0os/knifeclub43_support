package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.ReservRestroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservRestroomRepository extends JpaRepository<ReservRestroom,Long> {
    @Query("select r from ReservRestroom r where r.date = ?1")
    List<ReservRestroom> findByDate(LocalDate date);
}
