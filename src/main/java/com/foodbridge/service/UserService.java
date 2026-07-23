package com.foodbridge.service;

import java.util.Optional;

import com.foodbridge.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.foodbridge.dto.LoginRequest;
import com.foodbridge.entity.User;
import com.foodbridge.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public UserService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       JwtService jwtService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.jwtService = jwtService;
    }

    public User getUserByEmail(String email){
        Optional<User> user = userRepository.findByEmail(email);
        if(user.isEmpty()){
            throw new IllegalArgumentException("User not found.");
        }
        return user.get();
    }

    // Register User
    public User registerUser(User user) {
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new IllegalArgumentException("Email is already registered.");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    // Login User
    public String loginUser(LoginRequest loginRequest) {

        Optional<User> user = userRepository.findByEmail(loginRequest.getEmail());

        if (user.isEmpty()) {
            throw new IllegalArgumentException("Invalid email or password.");
        }

        User existingUser = user.get();

        if (!passwordEncoder.matches(
                loginRequest.getPassword(),
                existingUser.getPassword())) {

            throw new IllegalArgumentException("Invalid email or password.");
        }

        // After successful authentication, generate a JWT and return it to the client.
        // The client will send this JWT with every protected request.
        return jwtService.generateToken(existingUser);
    }
}