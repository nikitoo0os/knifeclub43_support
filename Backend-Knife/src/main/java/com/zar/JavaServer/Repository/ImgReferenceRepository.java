package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.ImgReference;
import com.zar.JavaServer.Entity.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface ImgReferenceRepository extends JpaRepository<ImgReference,Long> {
    List<ImgReference> findAll();
}
