package com.example.demo.repository;

import com.example.demo.model.Advert;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertRepository extends JpaRepository<Advert, Long> {

    Advert getById(Long id);

    void deleteById(Long id);
}