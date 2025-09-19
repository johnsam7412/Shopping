package com.titanproject.controller;

import java.util.HashMap;
import java.util.Map;

import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.titanproject.entity.Order;
import com.razorpay.RazorpayClient;

@RestController
@RequestMapping("/api/payment")
public class PaymentController {

    @Value("${razorpay.key_id}")
    private String razorpayKey;

    @Value("${razorpay.key_secret}")
    private String razorpaySecret;

    @PostMapping("/create-order")
    public ResponseEntity<Map<String, Object>> createOrder(@RequestBody Map<String, Object> data) {
        try {
            int amount = (int) data.get("amount");

            RazorpayClient client = new RazorpayClient(razorpayKey, razorpaySecret);

            JSONObject options = new JSONObject();
            options.put("amount", amount * 100); // amount in paise
            options.put("currency", "INR");
            options.put("receipt", "txn_" + System.currentTimeMillis());

            Order order = client.Orders.create(options);

            Map<String, Object> response = new HashMap<>();
            response.put("id", order.get("id"));
            response.put("amount", order.get("amount"));
            response.put("currency", order.get("currency"));
            response.put("status", order.get("status"));

            return ResponseEntity.ok(response); // ✅ send back to frontend
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(Map.of("error", "Payment order creation failed"));
        }
    }
}

