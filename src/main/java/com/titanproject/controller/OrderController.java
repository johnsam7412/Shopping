package com.titanproject.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.titanproject.dto.OrderRequest;
import com.titanproject.entity.Order;
import com.titanproject.respository.OrderRepository;
import com.titanproject.service.OrderService;

@RestController
@RequestMapping("api/orders")
@CrossOrigin(originPatterns = "http://localhost:3000")
public class OrderController {

    private final OrderService orderService;
    private final OrderRepository orderRepository; // inject repository for GET

    public OrderController(OrderService orderService, OrderRepository orderRepository) {
        this.orderService = orderService;
        this.orderRepository = orderRepository;
    }

    @PostMapping
    public ResponseEntity<?> createOrder(@RequestBody OrderRequest req) {
        try {
            Order saved = orderService.createOrder(req);
            return ResponseEntity.ok(saved);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.badRequest().body("Could not create order: " + e.getMessage());
        }
    }
 
    @GetMapping("/{id}")
    public ResponseEntity<?> getOrder(@PathVariable Long id) {
        try {
            Order order = orderService.getOrderById(id);  // ✅ correct method
            return ResponseEntity.ok(order);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(e.getMessage());
        }
    }

    
}


