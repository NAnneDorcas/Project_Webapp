package com.example.Final.project.dto;

public record CartItemRequest(
        Long productId,
        int quantity
) {
}