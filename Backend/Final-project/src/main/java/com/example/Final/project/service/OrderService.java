package com.example.Final.project.service;

import com.example.Final.project.dto.OrderResponse;
import com.example.Final.project.model.Cart;
import com.example.Final.project.model.CartItem;
import com.example.Final.project.model.CustomerOrder;
import com.example.Final.project.model.OrderItem;
import com.example.Final.project.model.Product;
import com.example.Final.project.repository.CartRepository;
import com.example.Final.project.repository.OrderRepository;
import com.example.Final.project.repository.ProductRepository;
import org.springframework.stereotype.Service;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Service
public class OrderService {

    private final CartRepository cartRepository;
    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    public OrderService(
            CartRepository cartRepository,
            OrderRepository orderRepository,
            ProductRepository productRepository
    ) {
        this.cartRepository = cartRepository;
        this.orderRepository = orderRepository;
        this.productRepository = productRepository;
    }

    public OrderResponse checkout(String email) {
        Cart cart = cartRepository.findByCustomerEmail(email)
                .orElseThrow(() -> new RuntimeException("Cart not found"));

        if (cart.getItems().isEmpty()) {
            throw new RuntimeException("Cart is empty");
        }

        CustomerOrder order = new CustomerOrder(
                email,
                BigDecimal.ZERO,
                LocalDateTime.now()
        );

        BigDecimal total = BigDecimal.ZERO;

        for (CartItem cartItem : cart.getItems()) {
            Product product = cartItem.getProduct();

            if (cartItem.getQuantity() > product.getStockQuantity()) {
                throw new RuntimeException("Not enough stock for " + product.getName());
            }

            product.setStockQuantity(product.getStockQuantity() - cartItem.getQuantity());
            productRepository.save(product);

            BigDecimal itemTotal = product.getPrice()
                    .multiply(BigDecimal.valueOf(cartItem.getQuantity()));

            OrderItem orderItem = new OrderItem(
                    product.getName(),
                    cartItem.getQuantity(),
                    product.getPrice(),
                    order
            );

            order.getItems().add(orderItem);
            total = total.add(itemTotal);
        }

        order.setTotalPrice(total);

        CustomerOrder savedOrder = orderRepository.save(order);

        cart.getItems().clear();
        cartRepository.save(cart);

        return new OrderResponse(
                savedOrder.getId(),
                "Order placed successfully",
                savedOrder.getTotalPrice()
        );
    }
}