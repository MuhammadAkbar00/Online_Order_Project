package com.example.demo.repository;

import com.example.demo.model.Experience;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ExperienceRepository extends JpaRepository<Experience, Long> {
    Experience getById(Long id);
}