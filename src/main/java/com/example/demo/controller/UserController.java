package com.example.demo.controller;

import com.example.demo.jwt.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;
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
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderitemRepository;

//    @RequestMapping(path = "/students", method = { RequestMethod.GET })
//    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
//        System.out.println("profile for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        System.out.println("data: " + student);
//        return ResponseEntity.ok(student);
//    }

    @RequestMapping(path = "/registrations", method = { RequestMethod.GET })
    public ResponseEntity<?> registrations(Authentication authentication) throws AuthenticationException {
        System.out.println("registrations for " + authentication.getName());
        Student student = studentRepository.findFirstByName(authentication.getName());
        List<Register> registrations = registerRepository.findByStudentId(student.getId());
        System.out.println("registrations: " + registrations);
        return ResponseEntity.ok(registrations);
    }

    @RequestMapping(path = "/users", method = { RequestMethod.GET })
    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }
    @RequestMapping(path = "/orders/", method = {RequestMethod.GET})
    public ResponseEntity<?> order(@PathVariable long id) {
        return ResponseEntity.ok(orderRepository.findFirstByUserId(id));
    }
    @RequestMapping(path = "/order_item/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> order_item(@PathVariable long id) {
        return ResponseEntity.ok(orderitemRepository.findAllByOrderId(id));
    }
}

