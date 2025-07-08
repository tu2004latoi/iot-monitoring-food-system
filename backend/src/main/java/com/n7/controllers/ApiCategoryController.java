package com.n7.controllers;

import com.n7.pojo.Category;
import com.n7.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiCategoryController {

    @Autowired
    private CategoryService cateSer;

    @GetMapping("/categories")
    public ResponseEntity<List<Category>> getAllCategories(){
        return ResponseEntity.ok(cateSer.getAllCategories());
    }

    @GetMapping("/categories/{id}")
    public ResponseEntity<Category> getCategory(@PathVariable int id){
        return ResponseEntity.ok(this.cateSer.getCategoryById(id));
    }

    @PostMapping("/categories/add")
    public ResponseEntity<Category> addCategory(@ModelAttribute Category cate){
        return ResponseEntity.ok(this.cateSer.addCategory(cate));
    }

    @DeleteMapping("/categories/{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable int id){
        Category cate = cateSer.getCategoryById(id);
        cateSer.deleteCategory(cate);
        return ResponseEntity.ok("deleted");
    }
}
