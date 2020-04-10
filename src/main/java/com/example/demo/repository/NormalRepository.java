package com.example.demo.repository;

import com.example.demo.model.Normal;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NormalRepository extends JpaRepository<Normal, Long> {
    Normal findById(Integer id);
    Normal findAllById(Long id);
    List<Normal> findAll();
}