package com.example.demo.controller;

import com.example.demo.jwt.*;

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
    private UserRepository userRepository;
    @Autowired
    private CouponRepository couponRepository;

//    @RequestMapping(path = "/students", method = { RequestMethod.GET })
//    public ResponseEntity<?> profiles(Authentication authentication) throws AuthenticationException {
//        System.out.println("profile for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        System.out.println("data: " + student);
//        return ResponseEntity.ok(student);
//    }

//        @RequestMapping(path = "/users", method = { RequestMethod.POST })
//    public ResponseEntity<?> save(Authentication authentication, @RequestBody User data) throws AuthenticationException {
//        System.out.println("profile for " + authentication.getName());
//        User user = userRepository.findFirstByUsername(authentication.getName());
//        if(user != null) {
//            // existing student, so modify allowed fields
//            user.setFirstName(data.getFirstName());
//        } else {
//            // new student of same name as user
//            user = new User();
//            user.setUsername(authentication.getName());
//            user.setFirstName(data.getFirstName());
//        }
//            userRepository.save(user);
//        System.out.println("saved student: " + user.getFirstName());
//        return ResponseEntity.ok(user);
//    }

    @RequestMapping(path = "/users/loggeduser", method = { RequestMethod.GET })
    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users/edit", method = { RequestMethod.GET })
    public ResponseEntity<?> profileedit(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users", method = { RequestMethod.GET })
    public ResponseEntity<?> getAll() throws AuthenticationException {
        System.out.println("Fetching all users");
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users/{id}", method = { RequestMethod.GET })
    public ResponseEntity<?> deleteById(@PathVariable(value = "id") int id) throws AuthenticationException {
        System.out.println("Received id for deletion: "+id);
        System.out.println("Checking for constraints");
        return ResponseEntity.ok("test");
    }

}

