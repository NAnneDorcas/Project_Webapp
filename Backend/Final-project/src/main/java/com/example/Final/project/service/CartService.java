package com.example.Final.project.service;

import com.example.Final.project.dto.CartItemRequest;
import com.example.Final.project.model.Cart;
import com.example.Final.project.model.CartItem;
import com.example.Final.project.model.Product;
import com.example.Final.project.repository.CartItemRepository;
import com.example.Final.project.repository.CartRepository;
import com.example.Final.project.repository.ProductRepository;
import org.springframework.stereotype.Service;

@Service
public class CartService {

    private final CartRepository cartRepository;
    private final CartItemRepository cartItemRepository;
    private final ProductRepository productRepository;

    public CartService(
            CartRepository cartRepository,
            CartItemRepository cartItemRepository,
            ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.cartItemRepository = cartItemRepository;
        this.productRepository = productRepository;
    }

    public Cart getCart(String email) {
        return cartRepository.findByCustomerEmail(email)
                .orElseGet(() -> cartRepository.save(new Cart(email)));
    }

    public Cart addItem(String email, CartItemRequest request) {

        Cart cart = getCart(email);

        Product product = productRepository.findById(request.productId())
                .orElseThrow(() -> new RuntimeException("Product not found"));

        if (request.quantity() <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        if (request.quantity() > product.getStockQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        CartItem item = new CartItem(
                request.quantity(),
                product,
                cart
        );

        cart.getItems().add(item);

        cartItemRepository.save(item);

        return cart;
    }

    public Cart updateItem(Long itemId, int quantity) {

        CartItem item = cartItemRepository.findById(itemId)
                .orElseThrow(() -> new RuntimeException("Cart item not found"));

        if (quantity <= 0) {
            throw new RuntimeException("Quantity must be greater than zero");
        }

        if (quantity > item.getProduct().getStockQuantity()) {
            throw new RuntimeException("Not enough stock available");
        }

        item.setQuantity(quantity);

        cartItemRepository.save(item);

        return item.getCart();
    }

    public void removeItem(Long itemId) {
        cartItemRepository.deleteById(itemId);
    }
}