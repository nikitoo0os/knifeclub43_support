package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.ReservBlock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.time.LocalDate;
import java.util.List;

public interface ReservBlockRepository extends JpaRepository<ReservBlock,Long> {
    @Query("select r from ReservBlock r where r.date=?1")
    List<ReservBlock> findByDate(LocalDate date);

    @Query("select r from ReservBlock r where r.date between ?1 and ?2")
    List<ReservBlock> findByDateBetween(LocalDate dateStart, LocalDate dateEnd);
}
