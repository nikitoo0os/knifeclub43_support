package com.zar.JavaServer.Entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.LinkedHashSet;
import java.util.Set;

@Entity
@NoArgsConstructor
@Table(name = "person")
public class Person {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", columnDefinition = "serial", insertable = false, updatable = false)
    private Short id;

    @Column(name = "login", nullable = false, length = 20)
    private String login;

    @Column(name = "password")
    private String password;

    @Column(name = "token")
    private String token;

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "id_role")
    private Role idRole;

    public Short getId() {
        return id;
    }

    public void setId(Short id) {
        this.id = id;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Role getIdRole() {
        return idRole;
    }

    public void setIdRole(Role idRole) {
        this.idRole = idRole;
    }

    public String getToken() { return token; }

    public void setToken(String token) {
        this.token = token;
    }

    public Person (Person p) {
        setId(p.getId());
        setLogin(p.getLogin());
        setIdRole(p.getIdRole());
    }
}
