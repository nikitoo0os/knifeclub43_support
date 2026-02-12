package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.Reference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.math.BigInteger;
import java.util.List;

public interface ReferenceRepository extends JpaRepository<Reference,Long> {
    List<Reference> findByStatusTrueOrderByUpdatedAsc();
    List<Reference> findAll();

    List<Reference> findAllByOrderByUpdatedAsc();

    @Query("select r from Reference r where r.id = ?1")
    Reference findByReference_Id(Short id);

    @Query("SELECT r, COUNT(rr) FROM Reference r LEFT JOIN r.reservReferences rr " +
            "WHERE (rr.fioClient!='' AND rr.fioClient!=null) AND (rr.phone!='' AND rr.phone!=null) " +
            "AND ((rr.status=null AND rr.closedbron=false) " +
            "OR (rr.status=true AND (rr.closedbron=false OR rr.closedbron=true))) " +
            "GROUP BY r " +
            "ORDER BY count(rr) DESC")
    List<Object[]> countReservationsByReference();
}
