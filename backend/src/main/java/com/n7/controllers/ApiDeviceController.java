package com.n7.controllers;

import com.n7.pojo.Device;
import com.n7.pojo.Product;
import com.n7.pojo.User;
import com.n7.services.DeviceService;
import com.n7.services.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.*;

@RestController
@RequestMapping("/api")
public class ApiDeviceController {

    @Autowired
    private DeviceService deviceService;

    @Autowired
    private UserService userService;

    @GetMapping("/devices")
    public ResponseEntity<?> getAllDevices(){
        List<Device> devices = this.deviceService.getAllDevices();
        List<Map<String, Object>> listData = new ArrayList<>();
        for (Device device : devices){
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("deviceId", device.getDeviceId());
            data.put("userId", device.getUser() != null ? device.getUser().getUserId() : null); // ✅ tránh null
            data.put("deviceName", device.getDeviceName());
            data.put("deviceCode", device.getDeviceCode());

            listData.add(data);
        }

        return ResponseEntity.ok(listData);
    }

    @GetMapping("/my-devices")
    public ResponseEntity<?> getAllMyDevices(Principal principal){
        String username = principal.getName();
        User u = this.userService.getUserByUsername(username);
        List<Device> devices = this.deviceService.getDeviceByUser(u);
        List<Map<String, Object>> listData = new ArrayList<>();
        for (Device device : devices){
            Map<String, Object> data = new LinkedHashMap<>();
            data.put("deviceId", device.getDeviceId());
            data.put("userId", device.getUser() != null ? device.getUser().getUserId() : null); // ✅ an toàn
            data.put("deviceName", device.getDeviceName());
            data.put("deviceCode", device.getDeviceCode());

            listData.add(data);
        }

        return ResponseEntity.ok(listData);
    }
}
