package com.example.Final.project.config;

import com.example.Final.project.model.Category;
import com.example.Final.project.model.Product;
import com.example.Final.project.repository.CategoryRepository;
import com.example.Final.project.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

@Component
public class DataSeeder implements CommandLineRunner {

    private final CategoryRepository categoryRepository;
    private final ProductRepository productRepository;

    public DataSeeder(
            CategoryRepository categoryRepository,
            ProductRepository productRepository
    ) {
        this.categoryRepository = categoryRepository;
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) {
        if (categoryRepository.count() == 0) {

            Category electronics = categoryRepository.save(
                    new Category("Electronics")
            );

            Category books = categoryRepository.save(
                    new Category("Books")
            );

            productRepository.save(new Product(
                    "Laptop",
                    "Powerful student laptop",
                    new BigDecimal("899.99"),
                    10,
                    electronics
            ));

            productRepository.save(new Product(
                    "Headphones",
                    "Wireless headphones",
                    new BigDecimal("79.99"),
                    25,
                    electronics
            ));

            productRepository.save(new Product(
                    "Java Book",
                    "Spring Boot beginner guide",
                    new BigDecimal("39.99"),
                    15,
                    books
            ));
        }
    }
}