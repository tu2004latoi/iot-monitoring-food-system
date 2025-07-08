package com.n7.serviceimpl;

import com.n7.pojo.Category;
import com.n7.repositories.CategoryRepository;
import com.n7.services.CategoryService;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepository categoryRepo;

    @Override
    public Category getCategoryById(int id) {
        Optional<Category> cate = this.categoryRepo.findById(id);
        return cate.orElse(null);
    }

    @Override
    public List<Category> getAllCategories() {
        return this.categoryRepo.findAll();
    }

    @Override
    @Transactional
    public Category addCategory(Category cate) {
        return this.categoryRepo.save(cate);
    }

    @Override
    @Transactional
    public void deleteCategory(Category cate) {
        this.categoryRepo.delete(cate);
    }
}
