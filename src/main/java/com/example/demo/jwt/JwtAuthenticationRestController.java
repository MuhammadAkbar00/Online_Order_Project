package com.example.demo.jwt;

import java.sql.Date;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.*;

import com.example.demo.model.Order;
import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
import com.example.demo.repository.OrderRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;
import java.util.Objects;

@RestController
public class JwtAuthenticationRestController {

    @Value("Authorization")
    private String tokenHeader;

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private JwtTokenUtil jwtTokenUtil;

    @Autowired
    private OrderRepository orderRepository;

    @Autowired
    private UserDetailsService jwtTableUserDetailsService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtUserRepository jwtUserRepository;

    @Autowired
    private UserRepository userRepository;


    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public ResponseEntity<?> createAuthenticationToken(@RequestBody JwtTokenRequest authenticationRequest)
            throws AuthenticationException {
        System.out.println("Logging in:" + authenticationRequest.getUsername());
        authenticate(authenticationRequest.getUsername(), authenticationRequest.getPassword());

        final UserDetails userDetails = jwtTableUserDetailsService.loadUserByUsername(authenticationRequest.getUsername());

        final String token = jwtTokenUtil.generateToken(userDetails);

        return ResponseEntity.ok(new JwtTokenResponse(
                token,
                userDetails.getUsername(),
                userDetails.getAuthorities().toArray(new GrantedAuthority[0])[0].getAuthority())
        );
    }

    @RequestMapping(value = "/register", method = RequestMethod.POST)
    public ResponseEntity<?> registerUser(@RequestBody JwtTokenRequest authenticationRequest)
            throws AuthenticationException {

        if (jwtUserRepository.findByUsername(authenticationRequest.getUsername()) == null) {
            JwtUser jwtUser = new JwtUser();
            jwtUser.setUsername(authenticationRequest.getUsername());
            jwtUser.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
            jwtUser.setRole("ROLE_USER");
            jwtUserRepository.save(jwtUser);
            System.out.println("Registered: " + jwtUser);

            //Create user in User table
            String username = authenticationRequest.getUsername();
            User user = new User();
            if (userRepository.findFirstByUsername(username) == null) {
                user.setFirstName(username.substring(0, 1).toUpperCase() + username.substring(1));
                user.setUsername(username);
                user.setLanguage("EN");
                user.setMailing("N");
                user.setPoints(0);
                user.setPhone(0);
                userRepository.save(user);
                System.out.println(user);
                System.out.println("Registered user in User table");
            } else {
                System.out.println("User exists, attempting login instead: " + authenticationRequest.getUsername());
            }

            LocalDate myDate = LocalDate.now();
//            System.out.println("LocalDate myDate " + myDate);
            Date finalDate = java.sql.Date.valueOf(myDate);
//            System.out.println("finalDate myDate " + myDate);

            Order order = new Order();
            if (orderRepository.findFirstByUserId(user.getId()) == null) {
                order.setUserId(user.getId());
                order.setBranchId((long) 1);
                order.setDate(finalDate);
                order.setTotal(0);
                order.setPaymentMethod("C");
                order.setPaid("N");
                order.setLastAccess(finalDate);
                order.setDinein("N");
                orderRepository.save(order);
                System.out.println(order);
                System.out.println("order created in order table");
            }
            System.out.println("user cart created");
        }
        return
                createAuthenticationToken(authenticationRequest);
    }

//    @RequestMapping(value = "/refresh", method = RequestMethod.GET)
//    public ResponseEntity<?> refreshAndGetAuthenticationToken(HttpServletRequest request) {
//        String authToken = request.getHeader(tokenHeader);
//        final String token = authToken.substring(7);
//        String username = jwtTokenUtil.getUsernameFromToken(token);
//        JwtUserDetails user = (JwtUserDetails) jwtTableUserDetailsService.loadUserByUsername(username);
//
//        if (jwtTokenUtil.canTokenBeRefreshed(token)) {
//            String refreshedToken = jwtTokenUtil.refreshToken(token);
//            return ResponseEntity.ok(new JwtTokenResponse(refreshedToken));
//        } else {
//            return ResponseEntity.badRequest().body(null);
//        }
//    }

    @ExceptionHandler({AuthenticationException.class})
    public ResponseEntity<String> handleAuthenticationException(AuthenticationException e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    private void authenticate(String username, String password) {
        Objects.requireNonNull(username);
        Objects.requireNonNull(password);

        try {
            authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(username, password));
        } catch (DisabledException e) {
            throw new AuthenticationException("USER_DISABLED", e);
        } catch (BadCredentialsException e) {
            System.out.println("Login failed: '" + username + "', '" + password + "'");
            throw new AuthenticationException("INVALID_CREDENTIALS", e);
        }
    }
}

