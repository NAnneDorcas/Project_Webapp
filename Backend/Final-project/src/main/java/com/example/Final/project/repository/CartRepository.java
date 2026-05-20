package com.example.Final.project.repository;

import com.example.Final.project.model.Cart;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CartRepository extends JpaRepository<Cart, Long> {
    Optional<Cart> findByCustomerEmail(String customerEmail);
}