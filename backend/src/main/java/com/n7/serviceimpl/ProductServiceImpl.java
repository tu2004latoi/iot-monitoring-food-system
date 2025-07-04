package com.n7.serviceimpl;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.n7.pojo.Product;
import com.n7.repositories.ProductRepository;
import com.n7.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepo;

    @Autowired
    private Cloudinary cloudinary;

    @Override
    public Product addOrUpdateProduct(Product p) {
        if (p.getFile() != null && !p.getFile().isEmpty()) {
            try {
                Map res = cloudinary.uploader().upload(p.getFile().getBytes(), ObjectUtils.asMap("resource_type", "auto"));
                p.setImage(res.get("secure_url").toString());
            } catch (IOException ex) {
                Logger.getLogger(ProductServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
        return this.productRepo.save(p);
    }

    @Override
    public List<Product> getAllProducts() {
        return this.productRepo.findAll();
    }
}
