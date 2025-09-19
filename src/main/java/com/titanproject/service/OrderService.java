package com.titanproject.service;

import com.titanproject.dto.OrderRequest;
import com.titanproject.entity.Order;
import com.titanproject.entity.OrderItem;
import com.titanproject.entity.Users;
import com.titanproject.respository.OrderRepository;
import com.titanproject.respository.UsersRepository;

import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.format.DateTimeFormatter;

@Service
public class OrderService {

    private final OrderRepository orderRepository;
    private final UsersRepository usersRepository;
    private final EmailService emailService;
    private final SmsService smsService;

    public OrderService(OrderRepository orderRepository,
                        UsersRepository usersRepository,
                        EmailService emailService,
                        SmsService smsService) {
        this.orderRepository = orderRepository;
        this.usersRepository = usersRepository;
        this.emailService = emailService;
        this.smsService = smsService;
    }
    
    // Inject admin email from application.properties
    @Value("${admin.email}")
    private String adminEmail;
    
    public Order createOrder(OrderRequest dto) {
        // First try by username, if not found then by email
        Users user = usersRepository.findByUsername(dto.getUsername())
                .or(() -> usersRepository.findByEmail(dto.getUsername()))
                .orElseThrow(() -> new RuntimeException("User not found: " + dto.getUsername()));

        // ... (rest of your order creation logic unchanged)
    
   
        Order order = new Order();
        order.setTotal(dto.getTotal());
        order.setShippingName(dto.getShipping().getName());
        order.setShippingEmail(dto.getShipping().getEmail());
        order.setShippingMobile(dto.getShipping().getMobile());
        order.setShippingAddress(dto.getShipping().getAddress());
        order.setUser(user);
        
        var items = dto.getItems().stream().map(i -> {
            OrderItem item = new OrderItem();
            item.setProductId(i.getProductId());
            item.setName(i.getName());
            item.setPrice(i.getPrice());
            item.setQty(i.getQty());

            String imgUrl = i.getImg();
            if (imgUrl != null && imgUrl.length() > 255) {
                imgUrl = imgUrl.substring(0, 255);
            }
            item.setImg(imgUrl);

            item.setOrder(order);
            return item;
        }).collect(Collectors.toList());
        
        Order savedOrder = orderRepository.save(order);
        
        
        // ✅ Try sending notifications separately (don’t rollback order if fail)
   


        try {
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd MMM yyyy, hh:mm a");

            String emailBody = "Dear " + dto.getShipping().getName() + ",\n\n"
                    + "Thank you for your recent purchase from Evolve Shopping Website!\n"
                    + "We're happy to confirm that we've received your order.\n\n"
                    + "📦 Order Details:\n"
                    + "Order #: " + savedOrder.getId() + "\n"
                    + "Order Date: " + savedOrder.getCreatedAt().format(formatter) + "\n"
                    + "Total: ₹" + savedOrder.getTotal() + "\n"
                    + "Shipping Address: " + dto.getShipping().getAddress() + "\n\n"
                    + "We’ll notify you once your items are on the way.\n\n"
                    + "Thank you for shopping with us!\n"
                    + "— Evolve Shopping Website Team";
            
            emailService.sendOrderConfirmation(
                    dto.getShipping().getEmail(),
                    "Evolve Shopping Website - #" + savedOrder.getId(),
                    emailBody
            );
        } catch (Exception e) {
            System.err.println("❌ Failed to send Email: " + e.getMessage());
        }

        
        // ✅ Send Admin Email
        try {
            StringBuilder adminBody = new StringBuilder();
            adminBody.append("📦 New Order Received\n\n")
                     .append("Order ID: ").append(savedOrder.getId()).append("\n")
                     .append("Customer: ").append(dto.getShipping().getName()).append("\n")
                     .append("Email: ").append(dto.getShipping().getEmail()).append("\n")
                     .append("Mobile: ").append(dto.getShipping().getMobile()).append("\n")
                     .append("Address: ").append(dto.getShipping().getAddress()).append("\n")
                     .append("Total: ₹").append(savedOrder.getTotal()).append("\n\n")
                     .append("Items:\n");

            for (OrderItem item : savedOrder.getItems()) {
                adminBody.append("- ").append(item.getName())
                         .append(" × ").append(item.getQty())
                         .append(" (₹").append(item.getPrice()).append(")\n");
            }

            emailService.sendOrderConfirmation(
                    adminEmail,
                    "New Order Received - #" + savedOrder.getId(),
                    adminBody.toString()
            );
        } catch (Exception e) {
            System.err.println("❌ Failed to send Admin Email: " + e.getMessage());
        }	
        
//        sms users

        try {
            String smsText = "Hi " + dto.getShipping().getName()
                    + ", your order #" + savedOrder.getId()
                    + " of ₹" + savedOrder.getTotal()
                    + " has been placed successfully.";
            smsService.sendSms(dto.getShipping().getMobile(), smsText);
        } catch (Exception e) {
            System.err.println("❌ Failed to send SMS: " + e.getMessage());
        }

        return savedOrder;
    }

    // Fetch order by id
    public Order getOrderById(Long id) {
        return orderRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Order not found with id: " + id));
    }
}
