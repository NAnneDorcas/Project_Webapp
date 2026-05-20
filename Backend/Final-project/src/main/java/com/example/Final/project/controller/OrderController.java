package com.example.Final.project.controller;

import com.example.Final.project.dto.OrderResponse;
import com.example.Final.project.service.OrderService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/orders")
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    private static final String DEFAULT_EMAIL = "student@example.com";

    public OrderController(OrderService orderService) {
        this.orderService = orderService;
    }

    @PostMapping("/checkout")
    public OrderResponse checkout() {
        return orderService.checkout(DEFAULT_EMAIL);
    }
}