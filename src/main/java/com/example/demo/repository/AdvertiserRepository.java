package com.example.demo.repository;

import com.example.demo.model.Advertiser;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AdvertiserRepository extends JpaRepository<Advertiser, Long> {
    List<Advertiser> findAll();
}