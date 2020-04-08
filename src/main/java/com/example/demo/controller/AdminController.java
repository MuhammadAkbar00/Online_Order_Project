package com.example.demo.controller;

import com.example.demo.jwt.*;

import com.example.demo.model.Analytic;
import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import com.example.demo.repository.AnalyticRepository;
import com.example.demo.repository.CouponRepository;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.lang.reflect.Array;
import java.sql.PreparedStatement;
import java.util.ArrayList;
import java.util.List;

@RestController
public class AdminController {

    @Autowired
    private JwtUserRepository jwtUserRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private AnalyticRepository analyticRepository;

    @RequestMapping(path = "/loggeduser", method = {RequestMethod.GET})
    public ResponseEntity<?> profileLoggedUser(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users", method = {RequestMethod.GET})
    public ResponseEntity<?> getAllUsers() throws AuthenticationException {
        System.out.println("Fetching all users");
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> getOneUser(@PathVariable(value = "id") long id) throws AuthenticationException {
        User user = userRepository.getById(id);
        System.out.println("Fetching user " + user);
        return ResponseEntity.ok(user);
    }

    //Edit
    @RequestMapping(path = "/users", method = {RequestMethod.POST})
    public ResponseEntity<?> save(Authentication authentication, @RequestBody User data) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            System.out.println("Saving");
            User user = userRepository.findFirstByUsername(data.getUsername());
            if (user != null) {
                user.setFirstName(data.getFirstName());
                user.setLastName(data.getLastName());
                user.setAddress(data.getAddress());
                user.setEmail(data.getEmail());
                user.setMailing(data.getMailing());
                user.setPoints(data.getPoints());
                user.setLanguage(data.getLanguage());
                user.setPhone(data.getPhone());
            }
            System.out.println("Saved " + user);
            userRepository.save(user);
            return ResponseEntity.ok(1);
        }
        return null;
    }

    @RequestMapping(path = "/users/{id}", method = {RequestMethod.DELETE})
    public ResponseEntity<?> deleteUserById(@PathVariable(value = "id") long id, Authentication authentication) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            System.out.println("Received id for deletion: " + id);

            List<Coupon> coupons = couponRepository.getAllByUser(userRepository.getById(id));
            if (coupons.size() != 0) {
                for (Coupon c : coupons)
                    couponRepository.deleteById(c.getId());
                userRepository.deleteById(id);
                return ResponseEntity.ok(1);
            }
            return null;
        }
        return null;
    }

    @RequestMapping(path = "/analytic", method = {RequestMethod.GET})
    public ResponseEntity<?> getAllAnalytics(Authentication authentication) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            List<Analytic> analytics = analyticRepository.findAll();
            String popularPage = "";
            long popularProduct = 0;

            ArrayList<Long> productId = new ArrayList<>();
            ArrayList<Integer> productCount = new ArrayList<>();

            int menu = 0;
            int map = 0;
            int chat = 0;
            int quiz = 0;

            for (Analytic a : analytics) {
                if (a.getPagename().equalsIgnoreCase("menu"))
                    menu++;
                else if (a.getPagename().equalsIgnoreCase("map"))
                    map++;
                else if (a.getPagename().equalsIgnoreCase("chat"))
                    chat++;
                else if (a.getPagename().equalsIgnoreCase("quiz"))
                    quiz++;
                else if (a.getPagename().equalsIgnoreCase("product")) {
                    int index = productId.size();

                    if (productId.contains(a.getProductId())) {
                        index = productId.indexOf(a.getProductId());
                        productId.set(index, a.getProductId());
                        productCount.set(index, productCount.get(index) + 1);
                    } else {
                        productId.add(a.getProductId());
                        productCount.add(1);
                    }
                }
            }

            int[] pages = new int[4];
            pages[0] = menu;
            pages[1] = map;
            pages[2] = chat;
            pages[3] = quiz;
            int popular = 0;
            for (int i = 0; i < pages.length; i++)
                if (pages[i] > pages[popular])
                    popular = i;
            if (popular == 0)
                popularPage = "menu";
            else if (popular == 1)
                popularPage = "map";
            else if (popular == 2)
                popularPage = "chat";
            else
                popularPage = "quiz";
            if (productCount.size() == 0) {
                return ResponseEntity.ok("" + popularPage + " none");
            } else {
                int highestCount = 0;

                for (int num : productCount) {
                    if (num > highestCount)
                        highestCount = num;
                }
                popularProduct = productId.get(productCount.indexOf(highestCount));

                return ResponseEntity.ok("" + popularPage + " " + popularProduct);
            }
        } else
            return null;
    }

    @RequestMapping(path = "/coupons", method = {RequestMethod.GET})
    public ResponseEntity<?> getCoupons(Authentication authentication) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            List<Coupon> coupons = couponRepository.findAll();
            return ResponseEntity.ok(coupons);
        } else
            return null;
    }

    @RequestMapping(path = "/coupons", method = {RequestMethod.POST})
    public ResponseEntity<?> save(Authentication authentication, @RequestBody Coupon data) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            Coupon coupon = couponRepository.getById(data.getId());
            if (coupon != null) {
                User user = userRepository.findFirstByUsername(data.getUser().getUsername());
                coupon.setCode(data.getCode());
                coupon.setDesc(data.getDesc());
                coupon.setDiscount(data.getDiscount());
                coupon.setExpire(data.getExpire());
                coupon.setUser(user);

                couponRepository.save(coupon);
                System.out.println("Saved " + coupon);
                return ResponseEntity.ok(1);
            }
            return null;
        }
        return null;
    }


    @RequestMapping(path = "/coupons/{id}", method = {RequestMethod.DELETE})
    public ResponseEntity<?> deleteCouponById(@PathVariable(value = "id") long id, Authentication authentication) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            System.out.println("Received id for coupon deletion: " + id);
            Coupon coupon = couponRepository.getById(id);
            if (coupon != null) {
                couponRepository.deleteById(coupon.getId());
                System.out.println("Coupon deleted for id: " + id);
                return ResponseEntity.ok(1);
            }
            return null;
        }
        return null;
    }


}

