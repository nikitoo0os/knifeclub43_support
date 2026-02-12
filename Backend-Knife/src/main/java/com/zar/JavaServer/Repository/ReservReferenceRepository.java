package com.zar.JavaServer.Repository;

import com.zar.JavaServer.Entity.Reference;
import com.zar.JavaServer.Entity.ReservReference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;

import java.time.LocalDate;
import java.util.List;

public interface ReservReferenceRepository extends JpaRepository<ReservReference,Long> {
    @Query("select r from ReservReference r where r.date=?1 and (r.status=null OR r.status=true OR (r.status=false AND r.closedbron=true))")
    List<ReservReference> findByDateAndStatusTrueAndStatusNull(LocalDate date);
    @Query("select r from ReservReference r where r.date between ?1 and ?2 and (r.status=null OR r.status=true OR (r.status=false AND r.closedbron=true))")
    List<ReservReference> findByDateBetween(LocalDate dateStart, LocalDate dateEnd);
    List<ReservReference> findByDate(LocalDate date);
    @Query("SELECT r FROM ReservReference r " +
            "WHERE r.date=?1 AND r.reference=?2")
    List<ReservReference> findByDateAndReference(LocalDate date, Reference ref);
    @Query("SELECT r FROM ReservReference r " +
            "WHERE (r.fioClient!='' AND r.fioClient!=null) AND (r.phone!='' AND r.phone!=null)")
    List<ReservReference> findAllNotNull();
}
