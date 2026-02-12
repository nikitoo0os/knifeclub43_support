package com.zar.JavaServer.Controller;

import com.zar.JavaServer.Entity.Person;
import com.zar.JavaServer.Entity.Role;
import com.zar.JavaServer.Service.AuthorizationService;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.security.NoSuchAlgorithmException;
import java.util.List;
import java.util.Map;

@RestController
@AllArgsConstructor
public class AuthorizationController {
    private final AuthorizationService authorizationService;

    @GetMapping("/gettoken")
    public ResponseEntity<Map<String,Object>> getToken(@RequestParam String token){
        return new ResponseEntity<>(authorizationService.findToken(token), HttpStatus.OK);
    }
    @GetMapping("/roles")
    public ResponseEntity<List<Role>> getAllRoles(){
        return new ResponseEntity<>(authorizationService.getAllRoles(), HttpStatus.OK);
    }

    @GetMapping("/persons")
    public ResponseEntity<List<Person>> getAllPersons(){
        return new ResponseEntity<>(authorizationService.getAllPersons(), HttpStatus.OK);
    }

    @GetMapping("/loginuser")
    public ResponseEntity<Map<String,Object>> getAuth(@RequestParam String login, @RequestParam String password) throws NoSuchAlgorithmException {
        return new ResponseEntity<>(authorizationService.login(login, password), HttpStatus.OK);
    }

    @PostMapping("/registration")
    public void registration(@RequestBody Person person, @RequestParam String token) throws NoSuchAlgorithmException {
        authorizationService.registration(person, token);
    }

    @PostMapping("/delperson")
    public ResponseEntity<Boolean> delPerson(@RequestBody Person person, @RequestParam String token){
        return new ResponseEntity<>(authorizationService.DelPerson(person, token), HttpStatus.OK);
    }
}
