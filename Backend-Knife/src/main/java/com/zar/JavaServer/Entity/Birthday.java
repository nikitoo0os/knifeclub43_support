package com.zar.JavaServer.Entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor
@Table(name = "birthday")
public class Birthday {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Short id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "description_price")
    private String description_price;

    @Column(name = "description_reference")
    private String description_reference;

    @Column(name = "url_img")
    private String url;

    @Column(name = "status")
    private Boolean status;

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

    public String getDescription_price() {
        return description_price;
    }

    public void setDescription_price(String description) {
        this.description_price = description;
    }

    public String getDescription_reference() {
        return description_reference;
    }

    public void setDescription_reference(String description) {
        this.description_reference = description;
    }

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }
}