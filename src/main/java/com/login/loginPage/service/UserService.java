package com.login.loginPage.service;

import com.login.loginPage.model.User;
import com.login.loginPage.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    // Logic to register a new user
    public String registerUser(User user) {
        // 1. Check if username exists
        if (userRepository.existsByUsername(user.getUsername())) {
            return "Error: Username is already taken!";
        }

        // 2. Check if email exists
        if (userRepository.existsByEmail(user.getEmail())) {
            return "Error: Email is already in use!";
        }

        // 3. Save the user
        userRepository.save(user);
        return "User registered successfully!";
    }

    // Logic to login a user
    public String loginUser(String username, String password) {
        Optional<User> userOptional = userRepository.findByUsername(username);

        if (userOptional.isPresent()) {
            User user = userOptional.get();
            // Compare the password sent by the user with the one in the database
            if (user.getPassword().equals(password)) {
                return "Login Successful!";
            } else {
                return "Error: Invalid password!";
            }
        } else {
            return "Error: User not found!";
        }
    }
}