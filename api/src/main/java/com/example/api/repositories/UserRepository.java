package com.example.api.repositories;

import com.example.api.entities.User;
import org.springframework.data.repository.CrudRepository;

public interface  UserRepository  extends CrudRepository<User, Long>{
    User findByUsername(String username);
}
