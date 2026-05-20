package com.example.Final.project.dto;

import java.math.BigDecimal;

public record ProductRequest(
        String name,
        String description,
        BigDecimal price,
        int stockQuantity,
        Long categoryId
) {
}