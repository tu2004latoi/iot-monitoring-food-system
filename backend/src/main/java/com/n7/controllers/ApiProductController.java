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
import java.time.format.DateTimeFormatter;
import java.util.*;

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
    public ResponseEntity<?> getAllProducts(){
        DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy");
        DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern("dd/MM/yyyy HH:mm:ss");
        List<Product> products = this.productSer.getAllProducts();
        List<Map<String, Object>> listData = new ArrayList<>();
        for (Product p:products){
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("productId", p.getProductId());
            data.put("userId", p.getUser().getUserId());
            data.put("productName", p.getProductName());
            data.put("categoryId", p.getCategory().getCategoryId());
            data.put("expiryDate", dateFormatter.format(p.getExpiryDate()));
            data.put("detectedAt", dateTimeFormatter.format(p.getDetectedAt()));
            data.put("unitId", p.getUnit().getUnitId());
            data.put("quantity", p.getQuantity());
            data.put("notes", p.getNotes());
            data.put("status", p.getStatus());
            data.put("image", p.getImage());
            data.put("isActive", p.getActive());

            listData.add(data);
        }

        return ResponseEntity.ok(listData);
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

    @PatchMapping("/products/{id}/update")
    public ResponseEntity<Product> updateProduct(
            @PathVariable int id,
            @RequestParam(value = "productName", required = false) String productName,
            @RequestParam(value = "userId", required = false) Integer userId,
            @RequestParam(value = "categoryId", required = false) Integer categoryId,
            @RequestParam(value = "expiryDate", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate expiryDate,
            @RequestParam(value = "detectedAt", required = false) @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime detectedAt,
            @RequestParam(value = "unitId", required = false) Integer unitId,
            @RequestParam(value = "quantity", required = false) Float quantity,
            @RequestParam(value = "notes", required = false) String notes,
            @RequestParam(value = "status", required = false) Product.Status status,
            @RequestParam(value = "file", required = false) MultipartFile file) {

        Product existingProduct = productSer.getProductById(id);
        if (existingProduct == null) {
            return ResponseEntity.notFound().build();
        }

        if (productName != null && !productName.equals(existingProduct.getProductName())) {
            existingProduct.setProductName(productName);
        }

        if (expiryDate != null && !expiryDate.equals(existingProduct.getExpiryDate())) {
            existingProduct.setExpiryDate(expiryDate);
        }

        if (detectedAt != null && !detectedAt.equals(existingProduct.getDetectedAt())) {
            existingProduct.setDetectedAt(detectedAt);
        }

        if (quantity != null && !quantity.equals(existingProduct.getQuantity())) {
            existingProduct.setQuantity(quantity);
        }

        if (notes != null && !notes.equals(existingProduct.getNotes())) {
            existingProduct.setNotes(notes);
        }

        if (status != null && !status.equals(existingProduct.getStatus())) {
            existingProduct.setStatus(status);
        }

        if (userId != null && !userId.equals(existingProduct.getUser().getUserId())) {
            User u = userSer.getUserByUserId(userId);
            existingProduct.setUser(u);
        }

        if (categoryId != null && !categoryId.equals(existingProduct.getCategory().getCategoryId())) {
            Category cate = categorySer.getCategoryById(categoryId);
            existingProduct.setCategory(cate);
        }

        if (unitId != null && !unitId.equals(existingProduct.getUnit().getUnitId())) {
            Unit unit = unitSer.getUnitById(unitId);
            existingProduct.setUnit(unit);
        }

        if (file != null && !file.isEmpty()) {
            existingProduct.setFile(file); // xử lý upload trong service
        }

        if (!Boolean.TRUE.equals(existingProduct.getActive())) {
            existingProduct.setActive(true);
        }

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
