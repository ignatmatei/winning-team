package com.example.api.services;

import com.example.api.entities.User;
import com.example.api.repositories.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class UserService {
    private final UserRepository userRepository;
    public void deleteUser(Long id) throws Exception {
        if (!userRepository.existsById(id)) {
            throw new Exception("User not found");
        }
        userRepository.deleteById(id);
    }
    public void deleteAllUsers() {
        userRepository.deleteAll();
    }
    public void addUser(User user) throws Exception {
        if (userRepository.existsById(user.getId())) {
            throw new Exception("User already exists");
        }
        userRepository.save(user);
    }
    public List<User> getAllUsers() {
        return (List<User>) userRepository.findAll();
    }
    public User getUser(Long id) throws Exception {
        if (!userRepository.existsById(id)) {
            throw new Exception("User not found");
        }
        return userRepository.findById(id).orElse(null);
    }
    public User loginUser(String username, String password) throws Exception {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new Exception("User not found");
        }
        if (!user.getPassword().equals(password)) {
            throw new Exception("Invalid password");
        }
        return user;
    }
}
