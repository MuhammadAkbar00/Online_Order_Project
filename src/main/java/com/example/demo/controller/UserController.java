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
import java.util.Date;
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
    @Autowired
    private FaqRepository faqRepository;
    @Autowired
    private AdvertRepository advertRepository;
    @Autowired
    private PartRepository partRepository;
    @Autowired
    private CustomRepository customRepository;
    @Autowired
    private CustomPartRepository customPartRepository;
    @Autowired
    private ExperienceRepository experienceRepository;
    @Autowired
    private BranchRepository branchRepository;

        @RequestMapping(path = "/users", method = { RequestMethod.POST })
        public ResponseEntity<?> save(Authentication authentication, @RequestBody User data) throws AuthenticationException {
        System.out.println("profile for " + authentication.getName());
        User user = userRepository.findFirstByUsername(authentication.getName());
        if(user != null) {
            user.setFirstName(data.getFirstName());
            user.setLastName(data.getLastName());
            user.setAddress(data.getAddress());
            user.setEmail(data.getEmail());
            user.setMailing(data.getMailing());
            user.setPoints(data.getPoints());
            user.setLanguage(data.getLanguage());
            user.setPhone(data.getPhone());
        } else {
            user = new User();
            user.setUsername(authentication.getName());
            user.setFirstName(data.getFirstName());
        }
        userRepository.save(user);
        System.out.println("saved student: " + user.getFirstName());
        return ResponseEntity.ok(user);
    }

    @RequestMapping(path = "/users/loggeduser", method = {RequestMethod.GET})
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

    @RequestMapping(path = "/users/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> usergettt(@PathVariable Long id) {
        return ResponseEntity.ok(userRepository.findById(id));
    }

    @RequestMapping(path = "/orders", method = {RequestMethod.GET})
    public ResponseEntity<?> order(Authentication authentication) {
        User user = userRepository.findFirstByUsername(authentication.getName());
        Order order = orderRepository.findFirstByUserIdAndPaidEquals(user.getId(),"N");
        if (order == null) {
            System.out.println("cannot find order buddy!");

            System.out.println("Creating new order");
            order = new Order();
            order.setUserId(user.getId());

            Date date = new Date();
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            order.setDate(sqlDate);

            order.setDinein("N");
            order.setTotal(0);
            order.setBranchId((long) 1);
            order.setPaymentMethod("C");
            order.setPaid("N");
            order.setLastAccess(sqlDate);
            orderRepository.save(order);
            System.out.println("Created new order: "+order);

            return ResponseEntity.ok(order);
        }
        return ResponseEntity.ok(order);
    }

    @RequestMapping(path = "/orders/getuser", method = {RequestMethod.GET})
    public ResponseEntity<?> ordersUser(Authentication authentication) {
        User user = userRepository.findFirstByUsername(authentication.getName());
        return ResponseEntity.ok(orderRepository.findAllByUserId(user.getId()));
    }

    @RequestMapping(path = "/orders", method = {RequestMethod.POST})
    public ResponseEntity<?> save(@RequestBody Order data, Authentication authentication) throws AuthenticationException {

        User user = userRepository.findFirstByUsername(authentication.getName());
        Order order = orderRepository.findFirstByUserIdAndPaidEquals(user.getId(),"N");

        order.setUserId(user.getId());
        order.setBranchId(data.getBranchId());
        order.setDate(data.getDate());
        order.setTotal(data.getTotal());
        order.setPaymentMethod(data.getPaymentMethod());
        order.setPaid(data.getPaid());
        order.setLastAccess(data.getLastAccess());
        order.setDinein(data.getDinein());
        //check if user exists in order db
        orderRepository.save(order);
        System.out.println("saved order: " + order);
        return ResponseEntity.ok(order);
    }

    @RequestMapping(path = "/order_item/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> order_item(@PathVariable Long id) {
        return ResponseEntity.ok(orderitemRepository.findAllByOrderId(id));
    }

    @RequestMapping(path = "/order_item/getone/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> getOneOrder_item(@PathVariable Long id) {
        return ResponseEntity.ok(orderitemRepository.findById(id));
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
    public ResponseEntity<?> deleteOrderItem(@PathVariable Long id) {
        System.out.println("orderItem deletion for id: " + id);
        OrderItem orderItem = orderitemRepository.findFirstById(id);
        orderitemRepository.deleteById(id);
        System.out.println("orderItem deleted for id: " + id);
        System.out.println("Returning : "+orderItem);
        return ResponseEntity.ok(orderItem);

    }

    @RequestMapping(path = "/products/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> product(@PathVariable Long id) {
        return ResponseEntity.ok(productRepository.findAllById(id));
    }

    @RequestMapping(path = "/products", method = {RequestMethod.POST})
    public ResponseEntity<?> save(@RequestBody Product data) {
        Product product = new Product();
        if (data.getNormalId() == null){
            product.setCustomId(data.getCustomId());
            productRepository.save(product);
            System.out.println("data: " + product);
            return ResponseEntity.ok(product);
        }
        product.setNormalId(data.getNormalId());
        productRepository.save(product);
        System.out.println("data: " + product);
        return ResponseEntity.ok(product);
    }

    @RequestMapping(path = "/normal/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> normal(@PathVariable Long id) {
        return ResponseEntity.ok(normalRepository.findById(id));
    }

    @RequestMapping(path = "/customs/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> custom(@PathVariable Long id) {
        return ResponseEntity.ok(customRepository.findById(id));
    }

    @RequestMapping(path = "/users", method = {RequestMethod.GET})
    public ResponseEntity<?> getAll() throws AuthenticationException {
        System.out.println("Fetching all users");
        List<User> user = userRepository.findAll();
        return ResponseEntity.ok(user);
    }
    @RequestMapping(path = "/coupons", method = {RequestMethod.POST})
    public ResponseEntity<?> newCoupon(@RequestBody Coupon data) throws AuthenticationException {
        System.out.println("creating new coupon:");
        Coupon exCoupon = couponRepository.findByUser(data.getUser());
        if (exCoupon == null) {
            System.out.println("data "+data);
            User user = userRepository.findById(data.getUser().getId());
            Coupon coupon = new Coupon();
            coupon.setUser(user);
            coupon.setDiscount(data.getDiscount());
            coupon.setCode(data.getCode());
            coupon.setExpire(data.getExpire());
            coupon.setDesc(data.getDesc());
            couponRepository.save(coupon);
            System.out.println("New Coupon added: " + coupon);
            return ResponseEntity.ok(coupon);
        }
        return ResponseEntity.ok(1);
    }

    @RequestMapping(path = "/parts", method = {RequestMethod.GET})
    public ResponseEntity<?> findAll() {
        return ResponseEntity.ok(partRepository.findAll());
    }
    @RequestMapping(path = "/faqs", method = { RequestMethod.POST })
    public ResponseEntity<?> save(Authentication authentication, @RequestBody Faq data) throws AuthenticationException {
        JwtUser jwtuser = jwtUserRepository.findByUsername(authentication.getName());
        if (jwtuser.getRole().equals("ROLE_ADMIN")) {
            Faq fq = new Faq();
            fq.setQuestion(data.getQuestion());
            fq.setAnswer(data.getAnswer());
            fq.setHidden(data.getHidden());
            faqRepository.save(fq);
            System.out.println("Added FAQ: " + data.getId());
            return ResponseEntity.ok(fq);
        }
        return null;
    }

    @RequestMapping(path = "/customs", method = {RequestMethod.POST})
    public ResponseEntity<?> save(@RequestBody Custom data, Authentication authentication) throws AuthenticationException {
        Custom custom = customRepository.getById(data.getId());
        if (custom == null){
            custom = new Custom();

            Date date = new Date();
            java.sql.Date sqlDate = new java.sql.Date(date.getTime());
            custom.setDate(sqlDate);

            custom.setOccasion(null);
            custom.setTotal(data.getTotal());
            custom.setDesc(data.getDesc());
            custom.setName("");
            custom.setType("salad");

            customRepository.save(custom);
            return ResponseEntity.ok(custom);
        }
        return ResponseEntity.ok(custom);
    }

    @RequestMapping(path = "/customparts", method = {RequestMethod.GET})
    public ResponseEntity<?> getAll(Authentication authentication) throws AuthenticationException {
        System.out.println("fetching all custom parts");
        return ResponseEntity.ok(customPartRepository.findAll());
    }

    @RequestMapping(path = "/customparts", method = {RequestMethod.POST})
    public ResponseEntity<?> save(@RequestBody CustomPart data,Authentication authentication) throws AuthenticationException {
        if (data.getId() == null){
            CustomPart customPart = new CustomPart();
            customPart.setCustomId(data.getCustomId());
            customPart.setPartId(data.getPartId());
            customPartRepository.save(customPart);
            return ResponseEntity.ok(customPart);
        }
        CustomPart customPart = customPartRepository.getById(data.getId());
        customPart.setCustomId(data.getCustomId());
        customPart.setPartId(data.getPartId());
        customPartRepository.save(customPart);
        return ResponseEntity.ok(customPart);
    }
    @RequestMapping(path = "/review", method = {RequestMethod.POST})
    public ResponseEntity<?> saveReview(@RequestBody Experience data) {
        Experience rev = new Experience();
        rev.setOrderId(data.getOrderId());
        rev.setStars(data.getStars());
        experienceRepository.save(rev);
        return ResponseEntity.ok(rev);
    }

    @RequestMapping(path = "/review/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> orderCheck(@PathVariable Long id) {
        return ResponseEntity.ok(experienceRepository.getById(id));
    }

    @RequestMapping(path = "/review", method = {RequestMethod.GET})
    public ResponseEntity<?> reviewss() {
        return ResponseEntity.ok(experienceRepository.findAll());
    }

    @RequestMapping(path = "/coupons", method = {RequestMethod.GET})
    public ResponseEntity<?> couponsUser(Authentication authentication) throws AuthenticationException {
        User user = userRepository.findFirstByUsername(authentication.getName());
        return ResponseEntity.ok(couponRepository.getAllByUser(user));
    }

    @RequestMapping(path = "/coupons/{id}", method = {RequestMethod.GET})
    public ResponseEntity<?> getCoupon(@PathVariable Long id) {
        return ResponseEntity.ok(couponRepository.getById(id));
    }

    @RequestMapping(path = "/coupons/{id}", method = {RequestMethod.DELETE})
    public ResponseEntity<?> deleteCoupon(@PathVariable Long id) {
        System.out.println("delete coupon id: " + id);
        couponRepository.deleteById(id);
        System.out.println("done deleting coupon id: " + id);
        return ResponseEntity.ok(1);
    }

    @RequestMapping(path = "/coupons/code/{code}", method = {RequestMethod.GET})
    public ResponseEntity<?> getCoupon(@PathVariable String code) {
        return ResponseEntity.ok(couponRepository.getFirstByCode(code));
    }

    @RequestMapping(path = "/branches", method = {RequestMethod.GET})
    public ResponseEntity<?> getBranches(){
        List<Branch> branches = branchRepository.findAll();
        return ResponseEntity.ok(branches);
    }

    @RequestMapping(path = "/users/addpoints", method = {RequestMethod.POST})
    public ResponseEntity<?> addPoints(@RequestBody User data) {
        System.out.println("Received id for adding points: " + data.getId());
        User user = userRepository.getById(data.getId());
        System.out.println("before adding points: " + data);
        user.setPoints(data.getPoints());
        System.out.println("after adding points: " + data);
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }



}