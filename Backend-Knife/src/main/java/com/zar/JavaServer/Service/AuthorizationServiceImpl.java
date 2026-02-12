package com.zar.JavaServer.Service;

import com.zar.JavaServer.Entity.Person;
import com.zar.JavaServer.Entity.Role;
import com.zar.JavaServer.Repository.PersonRepository;
import com.zar.JavaServer.Repository.RestroomRepository;
import com.zar.JavaServer.Repository.RoleRepository;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import javax.annotation.PostConstruct;
import javax.xml.bind.DatatypeConverter;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.security.SecureRandom;
import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class AuthorizationServiceImpl implements AuthorizationService {

    private static final String CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    private static SecureRandom random = new SecureRandom();
    private final PersonRepository personRepository;
    private final RoleRepository roleRepository;
    List<Person> persons;

    @Override
    public Map<String,Object> findToken(String token) {
        Person person = persons.stream().filter(p -> p.getToken().equals(token)).findFirst().orElse(null);
        if (person != null)
        {
            Map<String, Object> response = new HashMap<>()
            {{ put("role", person.getIdRole().getName()); }};
            return response;
        }
        else return null;
    }

    @Override
    public boolean findTokenAdmin(String token) {
        Person person = persons.stream().filter(p -> p.getToken().equals(token)).findFirst().orElse(null);
        if (person != null)
        {
            if (person.getIdRole().getName().equals("Админ"))
                return true;
            else return false;
        }
        else return false;
    }

    @Override
    public boolean findTokenTrenerAdmin(String token) {
        Person person = persons.stream().filter(p -> p.getToken().equals(token)).findFirst().orElse(null);
        if (person != null) {
            return true;
        }
        else return false;
    }

    @Override
    public Map<String, Object> login(String login, String password) throws NoSuchAlgorithmException {
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        byte[] passwordBytes = password.getBytes(StandardCharsets.UTF_8);
        byte[] hashBytes = md.digest(passwordBytes);
        String hashString = DatatypeConverter.printHexBinary(hashBytes).toLowerCase();
        Person person = getPersonByLogin(login);
        Map<String, Object> response = new HashMap<>();
        if (person != null) {
            if (person.getPassword() != null) {
                if (hashString.equals((person.getPassword()))) {
                    response.put("isLogin", true);
                    response.put("token", savePerson(person));
                    response.put("role", person.getIdRole().getName());
                    return response;
                }
                else return null;
            }
            else {
                response.put("isLogin", true);
                response.put("token", savePerson(person));
                response.put("role", person.getIdRole().getName());
                return response;
            }
        }
        else return null;
    }

    @Override
    public Person getPersonByLogin(String login) {
        return persons.stream().filter(p -> login.equals(p.getLogin())).findFirst().orElse(null);
    }

    @Override
    public void registration(Person person, String token) throws NoSuchAlgorithmException {
        if (findTokenAdmin(token)) {
            MessageDigest md = MessageDigest.getInstance("SHA-256");
            byte[] passwordBytes = person.getPassword().getBytes(StandardCharsets.UTF_8);
            byte[] hashBytes = md.digest(passwordBytes);
            String hashString = DatatypeConverter.printHexBinary(hashBytes).toLowerCase();
            person.setPassword(hashString);
            savePerson(person);
        }
    }

    @Override
    public List<Role> getAllRoles() {
        return roleRepository.findAll();
    }


    @Override
    public List<Person> getAllPersons() {
        return persons.stream().map(Person::new).collect(Collectors.toList());
    }
    @PostConstruct
    void getPersons() {
        persons = personRepository.findAll();
    }

    @Override
    public boolean DelPerson(Person person, String token) {
        if (findTokenAdmin(token)) {
            try {
                personRepository.delete(person);
                getPersons();
                return true;
            } catch (Exception e) {
                return false;
            }
        }
        else return false;
    }

    private static String generateRandomString() {
        StringBuilder sb = new StringBuilder(64);
        for (int i = 0; i < 64; i++) {
            int randomIndex = random.nextInt(CHARACTERS.length());
            sb.append(CHARACTERS.charAt(randomIndex));
        }
        return sb.toString();
    }

    private String savePerson(Person person) {
        person.setToken(generateRandomString());
        personRepository.save(person);
        getPersons();
        return person.getToken();
    }
}
