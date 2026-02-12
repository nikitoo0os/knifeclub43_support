package com.zar.JavaServer.Service;

import com.zar.JavaServer.Entity.Person;
import com.zar.JavaServer.Entity.Role;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

public interface AuthorizationService {
    Map<String,Object> findToken(String token);
    Map<String, Object> login (String login, String password) throws NoSuchAlgorithmException;
    Person getPersonByLogin(String login);
    void registration(Person person, String token) throws NoSuchAlgorithmException;
    List<Role> getAllRoles();
    List<Person> getAllPersons();
    boolean DelPerson(Person person, String token);
    boolean findTokenAdmin(String token);
    boolean findTokenTrenerAdmin(String token);
}
