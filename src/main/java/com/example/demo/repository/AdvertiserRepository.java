package com.example.demo.repository;

import com.example.demo.model.Advertiser;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AdvertiserRepository extends JpaRepository<Advertiser, Long> {
    Advertiser getById(Long id);
}