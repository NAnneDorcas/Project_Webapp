package com.example.Final.project.dto;

import java.math.BigDecimal;

public record OrderResponse(
        Long orderId,
        String message,
        BigDecimal totalPrice
) {
}