package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.Birthday;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface BirthdayRepository extends JpaRepository<Birthday,Long> {
    List<Birthday> findByStatusTrue();
}
