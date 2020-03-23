package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUserRepository;

import com.example.demo.model.User;

import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/marketing")
public class MarketingController {

    @Autowired
    private JwtUserRepository jwtUserRepository;
    @Autowired
    private UserRepository userRepository;

//    @RequestMapping(path = "/students", method = { RequestMethod.GET })
//    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
//        System.out.println("profile for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        System.out.println("data: " + student);
//        return ResponseEntity.ok(student);
//    }

//    @RequestMapping(path = "/registrations", method = { RequestMethod.GET })
//    public ResponseEntity<?> registrations(Authentication authentication) throws AuthenticationException {
//        System.out.println("registrations for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        List<Register> registrations = registerRepository.findByStudentId(student.getId());
//        System.out.println("registrations: " + registrations);
//        return ResponseEntity.ok(registrations);
//    }

    @RequestMapping(path = "/users", method = { RequestMethod.GET })
    public ResponseEntity<?> users(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }

}

