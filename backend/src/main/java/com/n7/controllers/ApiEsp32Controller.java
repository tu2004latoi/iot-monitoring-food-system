package com.n7.controllers;

import com.n7.pojo.EnvRecord;
import com.n7.services.MqttSubscriber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class ApiEsp32Controller {

    @Autowired
    private MqttSubscriber mqttSubscriber;

    @GetMapping("/from-esp32")
    public ResponseEntity<EnvRecord> getEsp32Data() {
        EnvRecord record = mqttSubscriber.getLatestRecord();

        if (record == null) {
            return ResponseEntity.noContent().build();
        }

        return ResponseEntity.ok(record);
    }
}
