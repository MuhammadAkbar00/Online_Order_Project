package com.example.demo.controller;

import com.example.demo.jwt.AuthenticationException;
import com.example.demo.jwt.JwtUser;
import com.example.demo.jwt.JwtUserRepository;
import com.example.demo.model.*;
import com.example.demo.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
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
    private FaqRepository faqRepository;
    @Autowired
    private AdvertRepository advertRepository;
    @Autowired
    private AdvertiserRepository advertiserRepository;
    @Autowired
    private ExperienceRepository experienceRepository;

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

    @RequestMapping(path = "/menu/findByNameContaining/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> menuname(@PathVariable String name) { return ResponseEntity.ok(normalRepository.findByNameContaining(name)); }

    @RequestMapping(path = "/menu/findByTypeContaining/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> menutype(@PathVariable String name) { return ResponseEntity.ok(normalRepository.findByTypeContaining(name)); }

    @RequestMapping(path = "/faqs", method = {RequestMethod.GET})
    public ResponseEntity<?> faq() {
        return ResponseEntity.ok(faqRepository.findAll());
    }

    @RequestMapping(path = "/faqs/findByQuestionContaining/{name}", method = {RequestMethod.GET})
    public ResponseEntity<?> faq(@PathVariable String name) { return ResponseEntity.ok(faqRepository.findByQuestionContaining(name)); }

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

    @RequestMapping(path = "/advertisers", method = {RequestMethod.GET})
    public ResponseEntity<?> advertisersAll() {
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

    @RequestMapping(path = "/review/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> orderCheck(@PathVariable Long id) {
        return ResponseEntity.ok(experienceRepository.getById(id));
    }


}

