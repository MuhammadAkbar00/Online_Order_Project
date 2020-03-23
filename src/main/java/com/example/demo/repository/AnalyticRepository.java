package com.example.demo.repository;

import com.example.demo.model.Analytic;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnalyticRepository extends JpaRepository<Analytic, Long> {
}