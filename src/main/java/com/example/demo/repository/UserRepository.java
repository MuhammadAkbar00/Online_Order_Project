package com.example.demo.repository;

import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface UserRepository extends JpaRepository<User, Long> {
    User findFirstByUsername (String name);
    User getById(long id);
    User findFirstByUsernameOrderByIdDesc (String name);

    List<User> findAll();
}