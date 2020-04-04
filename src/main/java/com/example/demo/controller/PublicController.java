package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.model.Analytic;
import com.example.demo.model.User;
import com.example.demo.repository.AnalyticRepository;
import com.example.demo.repository.ProductRepository;
import com.example.demo.repository.BranchRepository;
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
    private AnalyticRepository analyticRepository;
    @Autowired
    private ProductRepository productRepository;

    @RequestMapping(path = "/menu", method = {RequestMethod.GET})
    public ResponseEntity<?> menus() {
        return ResponseEntity.ok(normalRepository.findAll());
    }

    @RequestMapping(path = "/menu/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> menu(@PathVariable Long id) {
        return ResponseEntity.ok(normalRepository.findById(id));
    }
    @RequestMapping(path = "/branches", method = {RequestMethod.GET})
        public ResponseEntity<?> getMap() {
        return ResponseEntity.ok(branchRepository.findAll());
    }

    @RequestMapping(path = "/analytic", method = {RequestMethod.POST})
    public ResponseEntity<?> save(@RequestBody Analytic data) {
        if (data.getPagename() == null)
            return null;
        if (!data.getUsername().equalsIgnoreCase("admin")){
            Analytic analytic = new Analytic();
            analytic.setUsername(data.getUsername());
            analytic.setDate(data.getDate());
            analytic.setTime(data.getTime());
            analytic.setPagename(data.getPagename());
            if (data.getProductId() == null)
                analytic.setProductId(null);
            else
                analytic.setProductId(data.getProductId());
            System.out.println(data);
            analyticRepository.save(analytic);
            System.out.println("Recorded page visit");
            return ResponseEntity.ok(1);
        }else
            return null;
    }
}

