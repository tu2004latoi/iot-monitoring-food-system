package com.n7.controllers;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class ApiTestController {
    @GetMapping("/test")
    public String test(){
        return "Hello API";
    }
}
