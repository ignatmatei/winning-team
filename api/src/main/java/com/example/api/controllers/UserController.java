package com.example.api.controllers;

import com.example.api.entities.User;
import com.example.api.services.UserService;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.util.JSONPObject;
import lombok.RequiredArgsConstructor;
import netscape.javascript.JSObject;
import org.springframework.boot.jackson.JsonObjectSerializer;
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
@CrossOrigin(origins = "http://localhost:8082")
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

    @PostMapping("/get_response")
    public ResponseEntity<String> getResponse(@RequestBody String jsonString) throws IOException, InterruptedException {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(jsonString, Map.class);
            String prompt1 = map.get("prompt");
            ProcessBuilder ls = new ProcessBuilder("ls", "-lh");
            Process process1 =  ls.start();
            BufferedReader reader1 = new BufferedReader(new InputStreamReader(process1.getInputStream()));
            String line1;
            StringBuilder output1 = new StringBuilder();
            while ((line1 = reader1.readLine()) != null) {
                output1.append(line1 + "\n");
            }
            int exitCode1 = process1.waitFor();
            if (exitCode1 == 0) {
                return ResponseEntity.ok(output1.toString());
            } else {
                return ResponseEntity.ok("exitCode " + exitCode1);
            }
          /*  ProcessBuilder processBuilder = new ProcessBuilder("./server_raresh.sh","\"" + prompt1 + "\"");
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
                return ResponseEntity.ok("exitCode " + exitCode);
            }
      */
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.ok("An error occurred! + " + e);
        } catch (InterruptedException e) {
            e.printStackTrace();
            return ResponseEntity.ok("An error occurred! " + e);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.ok("An error occurred! - " + e);
        }
    }
    @PostMapping("/get_langchain")
    public ResponseEntity<String> getResponses2(@RequestBody String jsonString)
    {
        try {
            ObjectMapper mapper = new ObjectMapper();
            Map<String, String> map = mapper.readValue(jsonString, Map.class);
            String prompt1 = map.get("prompt");
            ProcessBuilder processBuilder = new ProcessBuilder("./server_hello.sh","\"" + prompt1 + "\"");
            // ProcessBuilder processBuilder = new ProcessBuilder("./raresh.sh", prompt1);
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
