package com.titanproject.service;


import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.titanproject.entity.Users;
import com.titanproject.respository.OrderRepository;
import com.titanproject.respository.UsersRepository;

import jakarta.transaction.Transactional;

@Service
public class AuthService {

	
	  @Autowired
	   private UsersRepository usersRepository;
	  @Autowired
	  private OrderRepository orderRepository;
	  
	  public String registerUser(Users user) {
	        // check if username already exists
	        if (usersRepository.existsByUsername(user.getUsername())) {
	            return "Username already taken!";
	        }
	        // check if email already exists
	        if (usersRepository.existsByEmail(user.getEmail())) {
	            return "Email already registered!";
	        }
	        // save new user
	        usersRepository.save(user);
	        return "User registered successfully!";
	        
	    }
	  
	   public String loginUser(String username, String password) {
	        return usersRepository.findByUsernameAndPassword(username, password)
	                .map(u -> "Login successful")
	                .orElse("Invalid username or password!");
	    }
	   
	   
	    //  Google Login
	    public String loginWithGoogle(String email, String name) {
	        Optional<Users> existingUser = usersRepository.findByEmail(email);

	        if (existingUser.isPresent()) {
	            return "Login successful with Google!";
	        } else {
	            Users newUser = new Users();
	            newUser.setUsername(name); 
	            newUser.setEmail(email);
	            newUser.setPassword("GOOGLE_USER"); // dummy password
	            usersRepository.save(newUser);
	            return "New Google user registered and logged in!";
	        }
	    }
	   
	   
	   @Transactional
	   public String deleteUserByUsernameOrEmail(String identifier) {
	       Users user = usersRepository.findByUsername(identifier)
	               .or(() -> usersRepository.findByEmail(identifier))
	               .orElse(null);

	       if (user != null) {
	           // detach orders
	           orderRepository.findAllByUser(user).forEach(order -> order.setUser(null));

	           usersRepository.delete(user);
	           return "Account deleted successfully";
	       }
	       return "User not found";
	   }
}
	
	
