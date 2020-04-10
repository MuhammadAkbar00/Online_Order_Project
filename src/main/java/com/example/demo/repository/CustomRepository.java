package com.example.demo.repository;

import com.example.demo.model.Custom;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomRepository extends JpaRepository<Custom, Long> {
    List<Custom> findAll();
    Custom getById(Long id);
}