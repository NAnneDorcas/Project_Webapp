package com.example.Final.project.controller;

import com.example.Final.project.dto.CartItemRequest;
import com.example.Final.project.model.Cart;
import com.example.Final.project.service.CartService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/cart")
@CrossOrigin(origins = "http://localhost:5173")
public class CartController {

    private final CartService cartService;

    private static final String DEFAULT_EMAIL = "student@example.com";

    public CartController(CartService cartService) {
        this.cartService = cartService;
    }

    @GetMapping
    public Cart getCart() {
        return cartService.getCart(DEFAULT_EMAIL);
    }

    @PostMapping("/items")
    public Cart addItem(@RequestBody CartItemRequest request) {
        return cartService.addItem(DEFAULT_EMAIL, request);
    }

    @PutMapping("/items/{itemId}")
    public Cart updateItem(
            @PathVariable Long itemId,
            @RequestParam int quantity
    ) {
        return cartService.updateItem(itemId, quantity);
    }

    @DeleteMapping("/items/{itemId}")
    public void removeItem(@PathVariable Long itemId) {
        cartService.removeItem(itemId);
    }
}