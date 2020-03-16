package com.example.demo.repository;

import com.example.demo.model.Course;
import com.example.demo.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface OrderRepository extends JpaRepository<Order, Long> {
    Order findFirstByUserId(long user_id);
}