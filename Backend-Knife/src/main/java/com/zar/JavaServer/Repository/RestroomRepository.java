package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.Restroom;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface RestroomRepository extends JpaRepository<Restroom,Long> {
    List<Restroom> findAll();
}
