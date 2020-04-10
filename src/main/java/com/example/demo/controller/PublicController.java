package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.model.Advert;
import com.example.demo.model.Analytic;
import com.example.demo.model.Normal;
import com.example.demo.model.User;
import com.example.demo.model.Advert;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
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
    @Autowired
    private AdvertRepository advertRepository;


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

    @RequestMapping(path = "normal/images", method = {RequestMethod.GET})
    public ResponseEntity<?> getAllImages() {
        List<Normal> normals = normalRepository.findAll();
        ArrayList<String> imagesArr = new ArrayList<>();
        for(Normal n : normals)
            imagesArr.add(n.getImage());
        String[] images = new String[normals.size()];
        imagesArr.toArray(images);
        return ResponseEntity.ok(images);
    }


//    @RequestMapping(path = "/adverts", method = {RequestMethod.POST})
//    public ResponseEntity<?> save(@RequestBody Advert data) throws AuthenticationException {
//
//        Advert advert = advertRepository.getById((long)data.getId());
//        advert.setDesc(data.getDesc());
//        advert.setAdvertiserId(data.getAdvertiserId());
//        advert.setSlot(data.getSlot());
//        advert.setImage(data.getImage());
//        advertRepository.save(advert);
//
//
//        return ResponseEntity.ok(advert);
//    }


}

