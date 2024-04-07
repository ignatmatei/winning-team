package com.example.api.entities;
import jakarta.persistence.*;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.Getter;

import java.util.List;
@Data
@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "username")
    private String username;
    @Column
    private String password;
    @Column
    private String email;
    public User() {
    }
    public User(String username, String email, String password) {
        this.username = username;
        this.email = email;

        this.password = password;
    }
    public User(User user) {
        this.username = user.getUsername();
        this.email = user.getEmail();

        this.password = user.getPassword();
    }

}
