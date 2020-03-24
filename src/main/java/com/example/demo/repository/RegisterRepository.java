package com.example.demo.repository;

import com.example.demo.model.Register;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RegisterRepository extends JpaRepository<Register, Long> {

    List<Register> findByStudentId(Long id);
    List<Register> findByCourseId(Long id);

}