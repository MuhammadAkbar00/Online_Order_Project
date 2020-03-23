package com.example.demo.jwt;

import com.example.demo.model.User;
import com.example.demo.repository.UserRepository;
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

        if(jwtUserRepository.findByUsername(authenticationRequest.getUsername()) == null) {
            JwtUser jwtUser = new JwtUser();
            jwtUser.setUsername(authenticationRequest.getUsername());
            jwtUser.setPassword(passwordEncoder.encode(authenticationRequest.getPassword()));
            jwtUser.setRole("ROLE_USER");
            jwtUserRepository.save(jwtUser);
            System.out.println("Registered: " + jwtUser);

            //Create user in User table
            String username = authenticationRequest.getUsername();
            User user = new User();
            if(userRepository.findFirstByUsernameOrderByFirstNameDesc(username) == null){
                user.setId(1);
            }else{
                User lastUser = userRepository.findFirstByUsernameOrderByFirstNameDesc(username);
                user.setId(lastUser.getId()+1);
            }

            user.setFirstName(username.substring(0,1).toUpperCase()+username.substring(1));
            user.setUsername(username);
            user.setLanguage("EN");
            user.setMailing("N");
            user.setPoints(0);
            user.setPhone(10);
            userRepository.save(user);
            System.out.println(user);
            System.out.println("Registered user in User table");

        } else {
            System.out.println("User exists, attempting login instead: " + authenticationRequest.getUsername());
        }

        return createAuthenticationToken(authenticationRequest);
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

