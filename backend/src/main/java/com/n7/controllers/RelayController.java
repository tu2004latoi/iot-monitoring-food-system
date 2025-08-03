package com.n7.controllers;

import com.n7.services.MqttPublisher;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RelayController {

    @Autowired
    private MqttPublisher mqttPublisher;

    @PostMapping("/relay/{deviceCode}/on")
    public String turnOnRelay(@PathVariable String deviceCode) {
        mqttPublisher.sendRelayCommand(deviceCode, true);
        return "Relay turned ON for device: " + deviceCode;
    }

    @PostMapping("/relay/{deviceCode}/off")
    public String turnOffRelay(@PathVariable String deviceCode) {
        mqttPublisher.sendRelayCommand(deviceCode, false);
        return "Relay turned OFF for device: " + deviceCode;
    }
}
