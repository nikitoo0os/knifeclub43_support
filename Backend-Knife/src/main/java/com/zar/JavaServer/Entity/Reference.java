package com.zar.JavaServer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.NoArgsConstructor;

import javax.annotation.PostConstruct;
import javax.persistence.*;
import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.*;

@Entity
@NoArgsConstructor
@Table(name = "reference")
public class Reference {

    public Reference(Reference reference) { // Конструктор для клонирования
        setName(reference.getName());
        setUrl(reference.getUrl());
        setStatus(reference.getStatus());
        setId(reference.getId());
        setDescription(reference.getDescription());
        setPrice(reference.getPrice());
        setDuration(reference.getDuration());
        setReservDuration(reference.getReservDuration());
        setTimeStart(reference.getTimeStart());
        setTimeEnd(reference.getTimeEnd());
        setTimeStartHoliday(reference.getTimeStartHoliday());
        setTimeEndHoliday(reference.getTimeEndHoliday());
        setReservReferences(reference.getReservReferences());
    }
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false)
    private Short id;

    @Column(name = "name", nullable = false, length = 150)
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "description_client")
    private String descriptionClient;

    @Column(name = "url_img")
    private String url;

    @Column(name = "status_visible")
    private Boolean status;

    @Column(name = "price")
    private BigDecimal price;

    @Column(name = "duration", nullable = false)
    private Short duration;

    @Column(name = "duration_client")
    private Short durationClient;

    @Column(name = "reserv_duration")
    private Short reservDuration;

    @Column(name = "time_start", length = 5, nullable = false)
    private String timeStart;

    @Column(name = "time_end", length = 5, nullable = false)
    private String timeEnd;

    @Column(name = "time_start_holiday", length = 5, nullable = false)
    private String timeStartHoliday;

    @Column(name = "time_end_holiday", length = 5, nullable = false)
    private String timeEndHoliday;

    @Column(name = "updated")
    private Date updated;

    @JsonIgnore
    @OneToMany(mappedBy = "reference")
    private Set<ReservReference> reservReferences = new LinkedHashSet<>();

    @Transient
    private List<LocalTime> timeslots = new ArrayList<>(); // Локальные листы для определения интервала времени в будние дни

    @Transient
    private List<LocalTime> timeslotsHoliday = new ArrayList<>(); // Локальные листы для определения интервала времени в выходные дни

    public List<LocalTime> getTimeslots() { // Получение слотов в будние дни
        timeslots.clear(); // Сначало очищение старого
        LocalTime time_start = LocalTime.of(Integer.parseInt(getTimeStart().split(":")[0]), Integer.parseInt(getTimeStart().split(":")[1]));
        LocalTime time_end = LocalTime.of(Integer.parseInt(getTimeEnd().split(":")[0]), Integer.parseInt(getTimeEnd().split(":")[1]));
        LocalTime time_slot = time_start;
        for (int i = time_slot.getHour() * 60 + time_slot.getMinute(); i < time_end.getHour() * 60 + time_end.getMinute(); i += getReservDuration()) { // Цикл с timeStart до timeEnd для определения временных слотов
            timeslots.add(time_slot); // Добавление слота
            time_slot = time_slot.plusMinutes(getReservDuration()); // Инкремент
        }
        return timeslots;
    }

    public List<LocalTime> getTimeslotsHoliday() { // Получение слотов в выходные дни
        timeslotsHoliday.clear(); // Сначало очищение старого
        LocalTime time_start = LocalTime.of(Integer.parseInt(getTimeStartHoliday().split(":")[0]), Integer.parseInt(getTimeStartHoliday().split(":")[1]));
        LocalTime time_end = LocalTime.of(Integer.parseInt(getTimeEndHoliday().split(":")[0]), Integer.parseInt(getTimeEndHoliday().split(":")[1]));
        LocalTime time_slot = time_start;
        for (int i = time_slot.getHour() * 60 + time_slot.getMinute(); i < time_end.getHour() * 60 + time_end.getMinute(); i += getReservDuration()) { // Цикл с timeStart до timeEnd для определения временных слотов
            timeslotsHoliday.add(time_slot); // Добавление слота
            time_slot = time_slot.plusMinutes(getReservDuration()); // Инкремент
        }
        return timeslotsHoliday;
    }

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

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getDescriptionClient() {
        return descriptionClient;
    }

    public void setDescriptionClient(String descriptionClient) {
        this.descriptionClient = descriptionClient;
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

    public BigDecimal getPrice() {
        return price;
    }

    public void setPrice(BigDecimal price) {
        this.price = price;
    }

    public Set<ReservReference> getReservReferences() {
        return reservReferences;
    }

    public void setReservReferences(Set<ReservReference> reservReferences) {
        this.reservReferences = reservReferences;
    }

    public Short getDuration() {
        return duration;
    }

    public void setDuration(Short duration) {
        this.duration = duration;
    }

    public Short getDurationClient() {
        return durationClient;
    }

    public void setDurationClient(Short durationClient) {
        this.durationClient = durationClient;
    }

    public String getTimeEnd() {
        return timeEnd;
    }

    public void setTimeEnd(String timeEnd) {
        this.timeEnd = timeEnd;
    }

    public String getTimeStart() {
        return timeStart;
    }

    public void setTimeStart(String timeStart) {
        this.timeStart = timeStart;
    }

    public String getTimeEndHoliday() {
        return timeEndHoliday;
    }

    public void setTimeEndHoliday(String timeEndHoliday) {
        this.timeEndHoliday = timeEndHoliday;
    }

    public String getTimeStartHoliday() {
        return timeStartHoliday;
    }

    public void setTimeStartHoliday(String timeStartHoliday) {
        this.timeStartHoliday = timeStartHoliday;
    }

    public Short getReservDuration() {
        return reservDuration;
    }

    public void setReservDuration(Short reservDuration) {
        this.reservDuration = reservDuration;
    }

    public Date getUpdated() {
        return updated;
    }

    public void setUpdated(Date updated) {
        this.updated = updated;
    }
}