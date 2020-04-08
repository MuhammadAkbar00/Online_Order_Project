package com.example.demo.controller;

import com.example.demo.jwt.*;
import com.example.demo.model.*;
import com.example.demo.repository.*;

import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import com.example.demo.repository.CouponRepository;
import com.example.demo.repository.UserRepository;
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
    private RegisterRepository registerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private OrderRepository orderRepository;
    @Autowired
    private OrderItemRepository orderitemRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NormalRepository normalRepository;
    @Autowired
    private CouponRepository couponRepository;

//    @RequestMapping(path = "/students", method = { RequestMethod.GET })
//    public ResponseEntity<?> profiles(Authentication authentication) throws AuthenticationException {
//        System.out.println("profile for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        System.out.println("data: " + student);
//        return ResponseEntity.ok(student);
//    }
//
//    @RequestMapping(path = "/registrations", method = { RequestMethod.GET })
//    public ResponseEntity<?> registrations(Authentication authentication) throws AuthenticationException {
//        System.out.println("registrations for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        List<Register> registrations = registerRepository.findByStudentId(student.getId());
//        System.out.println("registrations: " + registrations);
//        return ResponseEntity.ok(registrations);
//    }

    @RequestMapping(path = "/users/loggeduser", method = {RequestMethod.GET})
    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/orders/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> order(@PathVariable long id) {
        Order order = orderRepository.findByUserId(id);
        if (order == null) {
            System.out.println("cannot find order buddy!");
            return ResponseEntity.ok(null);
        }
        return ResponseEntity.ok(order);
    }

    @RequestMapping(path = "/orders", method = {RequestMethod.PATCH})
    public ResponseEntity<?> save(@RequestBody Order data) {
        Order order = new Order();
        order.setUserId(data.getUserId());
        order.setBranchId(data.getBranchId());
        order.setDate(data.getDate());
        order.setTotal(data.getTotal());
        order.setPaymentMethod(data.getPaymentMethod());
        order.setPaid(data.getPaid());
        order.setLastAccess(data.getLastAccess());
        order.setDinein(data.getDinein());
        //check if user exists in order db
        orderRepository.save(order);
        System.out.println("saved order: " + order.getUserId());
        return ResponseEntity.ok(order);
    }

    @RequestMapping(path = "/order_item/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> order_item(@PathVariable Long id) {
        return ResponseEntity.ok(orderitemRepository.findAllByOrderId(id));
    }

    @RequestMapping(path = "/order_item", method = {RequestMethod.POST})
    public ResponseEntity<?> save(@RequestBody OrderItem data) {
        OrderItem order_Item = new OrderItem();
        order_Item.setOrderId(data.getOrderId());
        order_Item.setProductId(data.getProductId());
        orderitemRepository.save(order_Item);
        System.out.println("data: " + order_Item);
        return ResponseEntity.ok(order_Item);
    }

    @RequestMapping(path = "/order_item/{id}", method = {RequestMethod.DELETE})
    public void delete(@PathVariable Long id) {
        System.out.println("orderItem deletion for id: " + id);
        orderitemRepository.deleteById(id);
        System.out.println("orderItem deleted for id: " + id);
    }



    @RequestMapping(path = "/products/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> product(@PathVariable Long id) {
        return ResponseEntity.ok(productRepository.findAllById(id));
    }

//     fix this to suit custom orders
//    @RequestMapping(path = "/products", method = {RequestMethod.POST})
//    public ResponseEntity<?> save(@RequestBody Product data) {
//        Product product = new Product();
//        product.setNormal(data.getNormal());
//        product.setCustom(data.getCustom());
//        productRepository.save(product);
//        System.out.println("data: " + product);
//        return ResponseEntity.ok(product);
//    }

    @RequestMapping(path = "/normal/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> normal(@PathVariable Long id) {
        return ResponseEntity.ok(normalRepository.findById(id));
    }

    @RequestMapping(path = "/users", method = {RequestMethod.GET})
    public ResponseEntity<?> getAll() throws AuthenticationException {
        System.out.println("Fetching all users");
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> deleteById(@PathVariable(value = "id") int id) throws AuthenticationException {
        System.out.println("Received id for deletion: " + id);
        System.out.println("Checking for constraints");
        return ResponseEntity.ok("test");
    }

}