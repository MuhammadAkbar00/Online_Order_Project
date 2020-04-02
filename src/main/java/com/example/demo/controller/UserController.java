package com.example.demo.controller;

import com.example.demo.jwt.*;

import com.example.demo.model.User;
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
//    @Autowired
//    private StudentRepository studentRepository;
//    @Autowired
//    private RegisterRepository registerRepository;
    @Autowired
    private UserRepository userRepository;

    // copy above method and modify for POST (create or update)
//    @RequestMapping(path = "/students", method = { RequestMethod.POST })
//    public ResponseEntity<?> save(Authentication authentication, @RequestBody Student data) throws AuthenticationException {
//        System.out.println("profile for " + authentication.getName());
//        Student student = studentRepository.findFirstByName(authentication.getName());
//        if(student != null) {
//            // existing student, so modify allowed fields
//            student.setAge(data.getAge());
//        } else {
//            // new student of same name as user
//            student = new Student();
//            student.setName(authentication.getName());
//            student.setAge(data.getAge());
//        }
//        studentRepository.save(student);
//        System.out.println("saved student: " + student.getAge());
//        return ResponseEntity.ok(student);
//    }

        @RequestMapping(path = "/users", method = { RequestMethod.POST })
    public ResponseEntity<?> save(Authentication authentication, @RequestBody User data) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        if(user != null) {
            // existing student, so modify allowed fields
            user.setFirstName(data.getFirstName());
        } else {
            // new student of same name as user
            user = new User();
            user.setUsername(authentication.getName());
            user.setFirstName(data.getFirstName());
        }
            userRepository.save(user);
        System.out.println("saved student: " + user.getFirstName());
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users", method = { RequestMethod.GET })
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

}

