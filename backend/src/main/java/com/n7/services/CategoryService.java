package com.n7.services;

import com.n7.pojo.Category;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public interface CategoryService {
    Category getCategoryById(int id);
}
