package com.example.api.controllers;

import com.example.api.entities.User;
import com.example.api.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class UserController {
    private final UserService userService;

    @GetMapping("/hello")
    public String hello() {
        return "Hello, World!";
    }

    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @PostMapping("/add")
    public ResponseEntity<Void> addUser(@RequestBody User user) throws Exception {
        userService.addUser(user);
        return ResponseEntity.ok().build();
    }

    @GetMapping("{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) throws Exception {
        if (userService.getUser(id) == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(userService.getUser(id));
    }

    @GetMapping("/login")
    public ResponseEntity<User> loginUser(@RequestBody Map<String, String> credentials) throws Exception {
        String username = credentials.get("username");
        String password = credentials.get("password");
        return ResponseEntity.ok(userService.loginUser(username, password));
    }

    @GetMapping("/getresponse")
    public ResponseEntity<String> getResponse(@RequestBody String prompt) throws IOException, InterruptedException {
        try {
            ProcessBuilder processBuilder = new ProcessBuilder("./hello.sh", prompt);
            StringBuilder output = new StringBuilder();
            Process process = processBuilder.start();
            BufferedReader reader = new BufferedReader(
                    new InputStreamReader(process.getInputStream()));
            String line;
            while ((line = reader.readLine()) != null) {
                output.append(line + "\n");
            }
            int exitCode = process.waitFor();
            if (exitCode == 0) {
                return ResponseEntity.ok(output.toString());
            } else {
                return ResponseEntity.ok("An error occurred!");
            }
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok("An error occurred!");
        } catch (InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.ok("An error occurred!");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("An error occurred!");
        }
    }
}