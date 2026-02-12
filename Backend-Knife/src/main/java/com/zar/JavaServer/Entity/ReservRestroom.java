package com.zar.JavaServer.Entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;

@Entity
@NoArgsConstructor
@Table(name = "reserv_restroom")
public class ReservRestroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Integer id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_restroom")
    private Restroom restroom;

    @Column(name = "description")
    private String description;

    @Column(name = "time", length = 20)
    private String time;

    @Column(name = "date", nullable = false)
    private LocalDate date;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public Restroom getRestroom() {
        return restroom;
    }

    public void setRestroom(Restroom restroom) {
        this.restroom = restroom;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }
}
