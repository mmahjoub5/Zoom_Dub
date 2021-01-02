package com.dubzoom.dubzoom.controller;

import com.dubzoom.dubzoom.model.User;
import com.dubzoom.dubzoom.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.*;

@RestController
@Repository
@RequestMapping("api/user/")
@CrossOrigin(origins = "http://localhost:3000", allowedHeaders = "*")
public class UserController {
    private final UserService uservice;

    @Autowired
    public UserController(UserService uservice) {
        this.uservice = uservice;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> signupUser(@RequestBody User user) {
        User u = uservice.signupUser(user);
        if(u != null) return ResponseEntity.status(HttpStatus.OK).body(u);
        return ResponseEntity.status(HttpStatus.OK).body("Can't sign up");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        User u = uservice.loginUser(user);
        if(u != null) return ResponseEntity.status(HttpStatus.OK).body(u);
        return ResponseEntity.status(HttpStatus.OK).body("Can't login");
    }
}
