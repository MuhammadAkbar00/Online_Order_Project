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
    @Autowired
    private ProductRepository productRepository ;
    @Autowired
    private NormalRepository normalRepository ;

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
    @RequestMapping(path = "/orders/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> order(@PathVariable long id) {
        Order order = orderRepository.findFirstByUserId(id);
        return ResponseEntity.ok(order);
    }

    @RequestMapping(path = "/orders/{id}", method = { RequestMethod.POST })
    public ResponseEntity<?> save(@RequestBody Order data) throws AuthenticationException {
//        Order order = orderRepository.findFirstByUserId(data.getUser().getId());
        Order order = new Order();
        order.setUserId(data.getUserId());
        order.setBranchId(data.getBranchId());
        order.setDate(data.getDate());
        order.setTotal(data.getTotal());
        order.setPaymentMethod(data.getPaymentMethod());
        order.setPaid(data.getPaid());
        order.setLastAccess(data.getLastAccess());
        order.setDinein(data.getDinein());
        orderRepository.save(order);
        System.out.println("saved order: " + order.getUserId());
        return ResponseEntity.ok(order);
    }

    @RequestMapping(path = "/order_item/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> order_item(@PathVariable long id) {
        return ResponseEntity.ok(orderitemRepository.findAllByOrderId(id));
    }
    @RequestMapping(path = "/products/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> product(@PathVariable long id) {
        return ResponseEntity.ok(productRepository.findAllById(id));
    }
    @RequestMapping(path = "/normal/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> normal(@PathVariable long id) {
        return ResponseEntity.ok(normalRepository.findAllById(id));
    }
}

