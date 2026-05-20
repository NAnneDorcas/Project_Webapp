package com.example.Final.project.model;

import jakarta.persistence.*;


import java.math.BigDecimal;

@Entity

public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String productName;

    private int quantity;

    private BigDecimal price;

    @ManyToOne
    private CustomerOrder order;

    public OrderItem() {
    }

    public OrderItem(String productName, int quantity, BigDecimal price, CustomerOrder order) {
        this.productName = productName;
        this.quantity = quantity;
        this.price = price;
        this.order = order;
    }
    public Long getId() {
        return id;
    }

    public String getProductName() {
        return productName;
    }

    public int getQuantity() {
        return quantity;
    }

    public BigDecimal getPrice() {
        return price;
    }

    public CustomerOrder getOrder() {
        return order;
    }
}