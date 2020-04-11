package com.example.demo.repository;

import com.example.demo.model.CustomPart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CustomPartRepository extends JpaRepository<CustomPart, Long> {

    List<CustomPart> findAll();
    CustomPart getById(Long id);
    CustomPart getByCustomIdAndAndPartId(Long customId, Long partId);
}