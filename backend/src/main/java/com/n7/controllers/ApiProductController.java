package com.n7.controllers;

import com.n7.pojo.Category;
import com.n7.pojo.Product;
import com.n7.pojo.Unit;
import com.n7.pojo.User;
import com.n7.services.CategoryService;
import com.n7.services.ProductService;
import com.n7.services.UnitService;
import com.n7.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiProductController {

    @Autowired
    private ProductService productSer;

    @Autowired
    private CategoryService categorySer;

    @Autowired
    private UserService userSer;

    @Autowired
    private UnitService unitSer;

    @GetMapping("/products")
    public ResponseEntity<List<Product>> getAllProducts(){
        return ResponseEntity.ok(this.productSer.getAllProducts());
    }

    @PostMapping("/products/add")
    public ResponseEntity<Product> addProduct(
            @RequestParam("productName") String productName,
            @RequestParam("userId") Integer userId,
            @RequestParam("categoryId") Integer categoryId,
            @RequestParam("expiryDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate expiryDate,
            @RequestParam("detectedAt") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime detectedAt,
            @RequestParam("unitId") Integer unitId,
            @RequestParam("quantity") Float quantity,
            @RequestParam("notes") String notes,
            @RequestParam("status") Product.Status status,
            @RequestParam("file") MultipartFile file) {

        User u = this.userSer.getUserByUserId(userId);
        Category cate = this.categorySer.getCategoryById(categoryId);
        Unit unit = this.unitSer.getUnitById(unitId);

        Product p = new Product();
        p.setUser(u);
        p.setCategory(cate);
        p.setUnit(unit);
        p.setProductName(productName);
        p.setExpiryDate(expiryDate);
        p.setDetectedAt(detectedAt);
        p.setQuantity(quantity);
        p.setNotes(notes);
        p.setStatus(status);
        p.setFile(file);
        p.setActive(true);

        return ResponseEntity.ok(this.productSer.addOrUpdateProduct(p));
    }

    @PutMapping("/products/{id}/update")
    public ResponseEntity<Product> updateProduct(@PathVariable int id,
             @RequestParam("productName") String productName,
             @RequestParam("userId") Integer userId,
             @RequestParam("categoryId") Integer categoryId,
             @RequestParam("expiryDate") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate expiryDate,
             @RequestParam("detectedAt") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime detectedAt,
             @RequestParam("unitId") Integer unitId,
             @RequestParam("quantity") Float quantity,
             @RequestParam("notes") String notes,
             @RequestParam("status") Product.Status status,
             @RequestParam("file") MultipartFile file){

        Product existingProduct = productSer.getProductById(id); // bạn cần có hàm này trong ProductService
        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        // Gán thông tin mới
        User u = userSer.getUserByUserId(userId);
        Category cate = categorySer.getCategoryById(categoryId);
        Unit unit = unitSer.getUnitById(unitId);

        existingProduct.setUser(u);
        existingProduct.setCategory(cate);
        existingProduct.setUnit(unit);
        existingProduct.setProductName(productName);
        existingProduct.setExpiryDate(expiryDate);
        existingProduct.setDetectedAt(detectedAt);
        existingProduct.setQuantity(quantity);
        existingProduct.setNotes(notes);
        existingProduct.setStatus(status);
        existingProduct.setActive(true);

        Product updated = productSer.addOrUpdateProduct(existingProduct);
        return ResponseEntity.ok(updated);
    }

    @GetMapping("/products/{id}")
    public ResponseEntity<Product> getProductDetails(@PathVariable int id){
        Product p = this.productSer.getProductById(id);
        return ResponseEntity.ok(p);
    }

    @DeleteMapping("/products/{id}")
    public ResponseEntity<String> deleteProduct(@PathVariable int id){
        Product p = this.productSer.getProductById(id);
        this.productSer.deleteProduct(p);
        return ResponseEntity.ok("ok");
    }

}
