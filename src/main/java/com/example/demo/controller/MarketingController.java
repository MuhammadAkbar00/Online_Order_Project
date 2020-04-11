package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUser;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.model.Advert;
import com.example.demo.model.Analytic;
import com.example.demo.model.Coupon;
import com.example.demo.model.User;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/marketing")
public class MarketingController {

    @Autowired
    private JwtUserRepository jwtUserRepository;
    @Autowired
    private RegisterRepository registerRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private AdvertRepository advertRepository;
    @Autowired
    private AdvertiserRepository advertiserRepository;
    @Autowired
    private CouponRepository couponRepository;
    @Autowired
    private AnalyticRepository analyticRepository;
    @Autowired
    private ProductRepository productRepository;
    @Autowired
    private NormalRepository normalRepository;
    @Autowired
    private CustomRepository customRepository;

    @RequestMapping(path = "/users", method = { RequestMethod.GET })
    public ResponseEntity<?> profile(Authentication authentication) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        System.out.println("data: " + user);
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/normal/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> normal(@PathVariable Long id) {
        return ResponseEntity.ok(normalRepository.findById(id));
    }

    @RequestMapping(path = "/products/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> product(@PathVariable Long id) {
        return ResponseEntity.ok(productRepository.findAllById(id));
    }

    @RequestMapping(path = "/advertisers", method = {RequestMethod.GET})
    public ResponseEntity<?> advertiserzAll() {
        return ResponseEntity.ok(advertiserRepository.findAll());
    }

    @RequestMapping(path = "/advertisers/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> advertisers(@PathVariable Long id) { return ResponseEntity.ok(advertiserRepository.findById(id)); }

    @RequestMapping(path = "/adverts/{id}", method = { RequestMethod.DELETE })
    public ResponseEntity<?> deleteAdvertsById(@PathVariable(value = "id") long id,Authentication authentication) throws AuthenticationException {
        System.out.println("Received id for adverts deletion: "+id);
        Advert adz = advertRepository.getById(id);
        if (adz != null){
            advertRepository.deleteById(adz.getId());
            System.out.println("Ads deleted for id: "+id);
            return ResponseEntity.ok(1);
        }
        return null;
    }

    @RequestMapping(path = "/adverts", method = {RequestMethod.GET})
    public ResponseEntity<?> ads() {
        return ResponseEntity.ok(advertRepository.findAll());
    }

    @RequestMapping(path = "/adverts/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> adsEdit(@PathVariable Long id) { return ResponseEntity.ok(advertRepository.findById(id)); }

    @RequestMapping(path = "/adverts", method = {RequestMethod.POST})
    public ResponseEntity<?> save(Authentication authentication, @RequestBody Advert data) throws AuthenticationException {
        if(data.getId() != null){
            Advert advert = advertRepository.getById(data.getId());
            advert.setDesc(data.getDesc());
            advert.setAdvertiserId(data.getAdvertiserId());
            advert.setImage(data.getImage());
            advert.setSlot(data.getSlot());
            advert.setDisplay(data.getDisplay());
            advertRepository.save(advert);
            return ResponseEntity.ok(advert);
        }else{
            Advert adNew = new Advert();
            adNew.setDesc(data.getDesc());
            adNew.setAdvertiserId(data.getAdvertiserId());
            adNew.setImage(data.getImage());
            adNew.setSlot(data.getSlot());
            adNew.setDisplay(data.getDisplay());
            advertRepository.save(adNew);
            return ResponseEntity.ok(adNew);
        }
    }

    @RequestMapping(path = "/coupons", method = {RequestMethod.GET})
    public ResponseEntity<?> couponsUser(Authentication authentication) throws AuthenticationException {
        return ResponseEntity.ok(couponRepository.findAll());
    }

    @RequestMapping(path = "/coupons/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> getCoupon(@PathVariable Long id) {
        return ResponseEntity.ok(couponRepository.getById(id));
    }

    @RequestMapping(path = "/coupons/code/{code}", method = {RequestMethod.GET})
    public ResponseEntity<?> getCoupon(@PathVariable String code) {
        return ResponseEntity.ok(couponRepository.getFirstByCode(code));
    }

    @RequestMapping(path = "/coupons", method = {RequestMethod.POST})
    public ResponseEntity<?> save(Authentication authentication, @RequestBody Coupon data) throws AuthenticationException {
        Coupon coups = couponRepository.getById(data.getId());
        if(coups != null) {
            System.out.println(data.getUser());
            coups.setUser(data.getUser());
            coups.setDiscount(data.getDiscount());
            coups.setCode(data.getCode());
            coups.setExpire(data.getExpire());
            coups.setDesc(data.getDesc());
            couponRepository.save(coups);
            return ResponseEntity.ok(coups);
        }else{
            Coupon coupNew = new Coupon();
            System.out.println(data.getUser() + "The user we are setting");
            coupNew.setUser(data.getUser());
            coupNew.setDiscount(data.getDiscount());
            coupNew.setCode(data.getCode());
            coupNew.setExpire(data.getExpire());
            coupNew.setDesc(data.getDesc());
            userRepository.save(data.getUser());
            couponRepository.save(coupNew);
            return ResponseEntity.ok(coupNew);
        }
    }

    @RequestMapping(path = "/users/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> usergettt(@PathVariable Long id) {
        return ResponseEntity.ok(userRepository.findById(id));
    }

    @RequestMapping(path = "/coupons/{id}", method = { RequestMethod.DELETE })
    public ResponseEntity<?> deleteCouponsById(@PathVariable(value = "id") long id,Authentication authentication) throws AuthenticationException {
        Coupon cp = couponRepository.getById(id);
        if (cp != null){
            couponRepository.deleteById(cp.getId());
            return ResponseEntity.ok(cp);
        }
        return null;
    }
    @RequestMapping(path = "/customs/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> custom(@PathVariable Long id) {
        return ResponseEntity.ok(customRepository.findById(id));
    }
    @RequestMapping(path = "/analytic", method = {RequestMethod.GET})
    public ResponseEntity<?> getAllAnalytics(Authentication authentication) throws AuthenticationException {
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
        }


}

