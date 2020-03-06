package com.example.demo.controller;

import com.example.demo.jwt.*;
import com.example.demo.model.Register;
import com.example.demo.model.Student;
import com.example.demo.repository.RegisterRepository;
import com.example.demo.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    @Autowired
    private JwtUserRepository jwtUserRepository;
    @Autowired
    private StudentRepository studentRepository;
    @Autowired
    private RegisterRepository registerRepository;

    @RequestMapping(path = "/students", method = { RequestMethod.GET })
    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        Student student = studentRepository.findFirstByName(authentication.getName());
        System.out.println("data: " + student);
        return ResponseEntity.ok(student);
    }

    @RequestMapping(path = "/registrations", method = { RequestMethod.GET })
    public ResponseEntity<?> registrations(Authentication authentication) throws AuthenticationException {
        System.out.println("registrations for " + authentication.getName());
        Student student = studentRepository.findFirstByName(authentication.getName());
        List<Register> registrations = registerRepository.findByStudentId(student.getId());
        System.out.println("registrations: " + registrations);
        return ResponseEntity.ok(registrations);
    }

}
