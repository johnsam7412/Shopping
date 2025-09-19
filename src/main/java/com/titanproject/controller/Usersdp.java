package com.titanproject.controller;


import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

import org.aspectj.weaver.ast.Or;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


import com.titanproject.entity.Users;
import com.titanproject.respository.OrderRepository;
import com.titanproject.service.AuthService;



@RestController
@RequestMapping("api")
@CrossOrigin( originPatterns = "http://localhost:3000")

   // Frontend Connect

public class Usersdp {

    @Autowired
    private AuthService authService;

    @Autowired 
    
    private OrderRepository orderRepository;
    
    
    @PostMapping("/signup")
    public ResponseEntity<String> signup(@RequestBody Users user) {
        String result = authService.registerUser(user);
        if (result.equals("User registered successfully!")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody Users user) {
        String result = authService.loginUser(user.getUsername(), user.getPassword());
        if (result.equals("Login successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    //  Google Login
    
    @PostMapping("/google-login")
    public ResponseEntity<String> googleLogin(@RequestBody Map<String, String> payload) {
        String email = payload.get("email");
        String username = payload.get("username");

        String result = authService.loginWithGoogle(email, username);

        if (result.contains("successful")) {
            return ResponseEntity.ok(result);
        } else {
            return ResponseEntity.badRequest().body(result);
        }
    }
    
    
    
    @DeleteMapping("/delete/{identifier}")
    public ResponseEntity<Map<String, String>> deleteAccount(@PathVariable String identifier) {
        String result = authService.deleteUserByUsernameOrEmail(identifier);
        
        Map<String, String> response = new HashMap<>();
        response.put("message", result);
        
        if (result.contains("successfully")) {
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.badRequest().body(response);
        }

   
}
    }
	




