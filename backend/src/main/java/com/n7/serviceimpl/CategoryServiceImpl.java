package com.n7.serviceimpl;

import com.n7.pojo.Category;
import com.n7.repositories.CategoryRepository;
import com.n7.services.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
}
