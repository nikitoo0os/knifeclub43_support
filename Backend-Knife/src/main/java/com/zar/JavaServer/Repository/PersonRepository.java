package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface PersonRepository extends JpaRepository<Person,Long> {
    List<Person> findAll();
}