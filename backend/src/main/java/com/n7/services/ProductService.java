package com.n7.services;

import com.n7.pojo.Product;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ProductService {
    Product addOrUpdateProduct(Product p);
    List<Product> getAllProducts();
    Product getProductById(int id);
    void deleteProduct(Product p);
}
