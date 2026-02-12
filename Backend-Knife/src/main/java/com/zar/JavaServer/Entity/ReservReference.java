package com.zar.JavaServer.Entity;

import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.math.BigDecimal;
import java.math.BigInteger;
import java.time.LocalDate;
import java.util.Date;

@Entity
@NoArgsConstructor
@Table(name = "reserv_reference")
public class ReservReference {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private BigInteger id;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_reference")
    private Reference reference;

    @Column(name = "date")
    private LocalDate date;

    @Column(name = "description")
    private String description;

    @Column(name = "description_admin")
    private String descriptionAdmin;

    @Column(name = "time", length = 20)
    private String time;

    @Column(name = "phone", length = 17)
    private String phone;

    @Column(name = "email", length = 50)
    private String email;

    @Column(name = "fio_client", length = 50)
    private String fioClient;

    @Column(name = "status")
    private Boolean status;

    @Column(name = "date_bron")
    private Date dateBron;

    @Column(name = "date_confirm_cancel")
    private Date dateConfirmCancel;

    @Column(name = "closedbron")
    private Boolean closedbron;
    @Column(name = "count_person")
    private Short count_person;

    public BigInteger getId() {
        return id;
    }

    public void setId(BigInteger id) {
        this.id = id;
    }

    public Reference getReference() {
        return reference;
    }

    public void setReference(Reference reference) {
        this.reference = reference;
    }

    public LocalDate getDate() {
        return date;
    }

    public void setDate(LocalDate date) {
        this.date = date;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionAdmin() {
        return descriptionAdmin;
    }

    public void setDescriptionAdmin(String descriptionAdmin) {
        this.descriptionAdmin = descriptionAdmin;
    }

    public Boolean getStatus() {
        return status;
    }

    public void setStatus(Boolean status) {
        this.status = status;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getFioClient() {
        return fioClient;
    }

    public void setFioClient(String fioClient) {
        this.fioClient = fioClient;
    }

    public Boolean getClosedbron() {
        return closedbron;
    }

    public void setClosedbron(Boolean closedbron) {
        this.closedbron = closedbron;
    }

    public Date getDateBron() {
        return dateBron;
    }

    public void setDateBron(Date dateBron) {
        this.dateBron = dateBron;
    }

    public Date getDateConfirmCancel() {
        return dateConfirmCancel;
    }

    public void setDateConfirmCancel(Date dateConfirmCancel) {
        this.dateConfirmCancel = dateConfirmCancel;
    }

    public Short getCount_person() {
        return count_person;
    }

    public void setCount_person(Short count_person) {
        this.count_person = count_person;
    }

    public ReservReference(ReservReference reservRef) {
        setDate(reservRef.getDate());
        setStatus(reservRef.getStatus());
        setClosedbron(reservRef.getClosedbron());
        setId(reservRef.getId());
        setReference(reservRef.getReference());
        setTime(reservRef.getTime());
    }
}
