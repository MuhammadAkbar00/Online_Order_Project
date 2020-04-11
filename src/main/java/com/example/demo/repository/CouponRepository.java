package com.example.demo.repository;

import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CouponRepository extends JpaRepository<Coupon, Long> {

    void deleteByUser(User user);
    Coupon getFirstByUser(User user);
    Coupon getById(Long id);
    Coupon findByUser(User user);
    List<Coupon> getAllByUser(User user);
}