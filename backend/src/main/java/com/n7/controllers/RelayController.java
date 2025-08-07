package com.n7.controllers;

import com.n7.pojo.RelayControlMode;
import com.n7.services.RelayService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class RelayController {

    @Autowired
    private RelayService relayService;

    @PostMapping("/relay/mode")
    public String setMode(@RequestParam("mode") String mode) {
        try {
            RelayControlMode controlMode = RelayControlMode.valueOf(mode.toUpperCase());
            relayService.setMode(controlMode);
            return "Relay mode set to: " + mode;
        } catch (IllegalArgumentException ex) {
            return "Invalid mode. Use 'auto' or 'manual'.";
        }
    }

    @PostMapping("/relay/{deviceCode}/on")
    public String turnOnRelay(@PathVariable String deviceCode) {
        relayService.setManualRelay(deviceCode, true);
        return "Relay turned ON for device: " + deviceCode;
    }

    @PostMapping("/relay/{deviceCode}/off")
    public String turnOffRelay(@PathVariable String deviceCode) {
        relayService.setManualRelay(deviceCode, false);
        return "Relay turned OFF for device: " + deviceCode;
    }

    @GetMapping("/relay/mode")
    public String getCurrentMode() {
        return "Current relay mode: " + relayService.getCurrentMode();
    }
}
