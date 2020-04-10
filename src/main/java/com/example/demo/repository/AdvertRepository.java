package com.example.demo.repository;

import com.example.demo.model.Advert;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdvertRepository extends JpaRepository<Advert, Long> {

    List<Advert> findAll();
    Advert getById(Long id);
    void deleteById(Long id);
}