package com.example.demo.repository;

import com.example.demo.model.Course;
import com.example.demo.model.Normal;
import com.example.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface NormalRepository extends JpaRepository<Normal, Long> {
    Normal findById(int id);

}