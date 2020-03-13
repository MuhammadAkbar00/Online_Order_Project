package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.model.Course;
import com.example.demo.repository.CourseRepository;
import com.example.demo.repository.UserRepository;
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

//    @Autowired
//    private CourseRepository courseRepository;
    @Autowired
    private UserRepository userRepository;

//    @RequestMapping(path = "/courses/{id}", method = {RequestMethod.GET})
//    public ResponseEntity<?> course(@PathVariable Long id) {
//        return ResponseEntity.ok(courseRepository.findById(id));
//    }
//
//    @RequestMapping(path = "/courses", method = {RequestMethod.GET})
//    public ResponseEntity<?> courses() {
//        return ResponseEntity.ok(courseRepository.findAll());
//    }
//
//    @RequestMapping(path = "/courses/findByNameContaining/{name}", method = {RequestMethod.GET})
//    public ResponseEntity<?> courses(@PathVariable String name) {
//        return ResponseEntity.ok(courseRepository.findByNameContaining(name));
//    }

    @RequestMapping(path = "/usr/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> usr(@PathVariable String name) {
        System.out.println("reached usr");
        return ResponseEntity.ok(userRepository.findFirstByUsername(name));
    }

}

