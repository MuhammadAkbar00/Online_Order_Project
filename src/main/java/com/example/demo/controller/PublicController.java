package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.NormalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private CourseRepository courseRepository;
    @Autowired
    private NormalRepository normalRepository;

//    @RequestMapping(path = "/courses/{id}", method = {RequestMethod.GET})
//    public ResponseEntity<?> course(@PathVariable Long id) {
//        return ResponseEntity.ok(courseRepository.findById(id));
//    }

    @RequestMapping(path = "/menu", method = {RequestMethod.GET})
    public ResponseEntity<?> menus() {
        return ResponseEntity.ok(normalRepository.findAll());
    }

    @RequestMapping(path = "/menu/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> menu(@PathVariable Long id) {
        return ResponseEntity.ok(normalRepository.findById(id));
    }

    @RequestMapping(path = "/courses/findByNameContaining/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> courses(@PathVariable String name) {
        return ResponseEntity.ok(courseRepository.findByNameContaining(name));
    }
}

