package com.login.loginPage.controller;

import com.login.loginPage.model.User;
import com.login.loginPage.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/api/auth")
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/signup")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String result = userService.registerUser(user);

        if (result.startsWith("Error")) {
            return ResponseEntity.badRequest().body(result);
        }
        return ResponseEntity.ok(result);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User user) {
        String result = userService.loginUser(user.getUsername(), user.getPassword());

        if (result.startsWith("Error")) {
            // Return 401 for unauthorized login attempts
            return ResponseEntity.status(401).body(result);
        }
        return ResponseEntity.ok(result);
    }
}