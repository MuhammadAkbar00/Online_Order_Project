package com.example.demo.repository;

import com.example.demo.model.Student;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StudentRepository extends JpaRepository<Student, Long> {

    List<Student> findByNameContaining(String name);
    List<Student> findByAgeBetween(int min, int max);
    List<Student> findByNameNotContaining(String name);

    Student findFirstByName(String name);
}