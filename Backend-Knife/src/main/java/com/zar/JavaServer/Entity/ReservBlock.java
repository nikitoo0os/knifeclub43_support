package com.zar.JavaServer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;
import org.apache.tomcat.jni.Local;

import javax.persistence.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.Date;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "reserv_block")
public class ReservBlock {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @Column(name = "time_start_block", nullable = false, length = 5)
    private String timeStartBlock;

    @Column(name = "time_end_block", nullable = false, length = 5)
    private String timeEndBlock;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    @Column(name = "date_confirm")
    private Date dateConfirm;

    public boolean isTimeSlotInRange(LocalTime timeslot) {
        return (timeslot.isAfter(LocalTime.parse(getTimeStartBlock())) && timeslot.isBefore(LocalTime.parse(getTimeEndBlock()))) || (timeslot.equals(LocalTime.parse(getTimeStartBlock())) || timeslot.equals(LocalTime.parse(getTimeEndBlock())));
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getTimeStartBlock() {
        return timeStartBlock;
    }

    public void setTimeStartBlock(String timeStartBlock) {
        this.timeStartBlock = timeStartBlock;
    }

    public String getTimeEndBlock() {
        return timeEndBlock;
    }

    public void setTimeEndBlock(String timeEndBlock) {
        this.timeEndBlock = timeEndBlock;
    }

    public Date getDateConfirm() {
        return dateConfirm;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDateConfirm(Date dateConfirm) {
        this.dateConfirm = dateConfirm;
    }
}