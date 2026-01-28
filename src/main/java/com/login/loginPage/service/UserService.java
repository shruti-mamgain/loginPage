package com.login.loginPage.service;

import com.login.loginPage.model.User;
import com.login.loginPage.dao.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    public String registerUser(User user) {

        if (userRepository.existsByUsername(user.getUsername())) {
            return "Error: Username is already taken!";
        }

        if (userRepository.existsByEmail(user.getEmail())) {
            return "Error: Email is already in use!";
        }

        // Logic to save the user
        userRepository.save(user);
        return "User registered successfully!";
    }
}