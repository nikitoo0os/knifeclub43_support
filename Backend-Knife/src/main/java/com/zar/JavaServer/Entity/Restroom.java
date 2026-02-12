package com.zar.JavaServer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "restroom")
public class Restroom {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Short id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "url_img")
    private String url;

    @JsonIgnore
    @OneToMany(mappedBy = "restroom")
    private Set<ReservRestroom> reservRestrooms = new LinkedHashSet<>();

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Set<ReservRestroom> getReservRestrooms() {
        return reservRestrooms;
    }

    public void setReservRestrooms(Set<ReservRestroom> reservRestrooms) {
        this.reservRestrooms = reservRestrooms;
    }

}