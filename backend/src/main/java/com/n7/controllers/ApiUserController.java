package com.n7.controllers;

import com.n7.pojo.User;
import com.n7.services.UserService;
import com.n7.utils.JwtUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

@RestController
@RequestMapping("/api")
public class ApiUserController {
    @Autowired
    private UserService userSer;

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers(){
        return ResponseEntity.ok(userSer.getAllUsers());
    }

    @PostMapping("/users/add")
    public ResponseEntity<User> addUser(@ModelAttribute User u){
        return ResponseEntity.ok(this.userSer.addOrUpdateUser(u));
    }

    @PutMapping("/users/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Integer id, @ModelAttribute User u){
        u.setUserId(id);
        return ResponseEntity.ok(this.userSer.addOrUpdateUser(u));
    }

    @PostMapping("/auth/login")
    public ResponseEntity<?> login(@RequestBody User u) {
        if (u.getUsername() == null || u.getPassword() == null) {
            return ResponseEntity.badRequest().body("Username hoặc password không được để trống");
        }

        if (this.userSer.authenticate(u.getUsername(), u.getPassword())) {
            try {
                String token = JwtUtils.generateToken(u.getUsername());
                return ResponseEntity.ok().body(Collections.singletonMap("token", token));
            } catch (Exception e) {
                return ResponseEntity.status(500).body("Lỗi khi tạo JWT");
            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Sai thông tin đăng nhập");
    }

}
