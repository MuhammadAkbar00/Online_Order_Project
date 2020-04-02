package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.repository.BranchRepository;
import com.example.demo.repository.FaqRepository;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.NormalRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/public")
public class PublicController {

    @Autowired
    private UserRepository userRepository;
    @Autowired
    private BranchRepository branchRepository;
    @Autowired
    private NormalRepository normalRepository;
    @Autowired
    private FaqRepository faqRepository;

//    @RequestMapping(path = "/courses/{id}", method = {RequestMethod.GET})
//    public ResponseEntity<?> course(@PathVariable Long id) {
//        return ResponseEntity.ok(courseRepository.findById(id));
//    }

    @RequestMapping(path = "/menu", method = {RequestMethod.GET})
    public ResponseEntity<?> menus() {
        return ResponseEntity.ok(normalRepository.findAll());
    }

    @RequestMapping(path = "/menu/edit", method = {RequestMethod.GET})
    public ResponseEntity<?> menusedit() {
        return ResponseEntity.ok(normalRepository.findAll());
    }

    @RequestMapping(path = "/menu/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> menu(@PathVariable Long id) {
        return ResponseEntity.ok(normalRepository.findById(id));
    }

    @RequestMapping(path = "/menu/findByNameContaining/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> menuname(@PathVariable String name) { return ResponseEntity.ok(normalRepository.findByNameContaining(name)); }

    @RequestMapping(path = "/menu/findByTypeContaining/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> menutype(@PathVariable String name) { return ResponseEntity.ok(normalRepository.findByTypeContaining(name)); }

    @RequestMapping(path = "/faq", method = {RequestMethod.GET})
    public ResponseEntity<?> faq() {
        return ResponseEntity.ok(faqRepository.findAll());
    }

//    @RequestMapping(value = "/containing/{name}", method = RequestMethod.GET)
//    @ResponseBody
//    public List<?> findByNameContaining(@PathVariable String name) {
//
//        List<?> menuResponse = (List<?>) normalRepository.findByNameContaining(name);
//
//        return menuResponse;
//    }

    @RequestMapping(path = "/branches", method = {RequestMethod.GET})
    public ResponseEntity<?> getMap() {
        return ResponseEntity.ok(branchRepository.findAll());
    }


}

