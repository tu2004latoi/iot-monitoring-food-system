package com.n7.services;

import com.n7.pojo.RelayControlMode;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RelayService {

    private RelayControlMode currentMode = RelayControlMode.AUTO;
    private boolean manualState = false;

    private final MqttPublisher mqttPublisher;

    @Autowired
    public RelayService(MqttPublisher mqttPublisher) {
        this.mqttPublisher = mqttPublisher;
    }

    public void setMode(RelayControlMode mode) {
        this.currentMode = mode;

        // Gửi mode xuống ESP32 qua MQTT
        mqttPublisher.sendModeCommand(mode.name().toLowerCase());
    }

    public RelayControlMode getCurrentMode() {
        return currentMode;
    }

    public void setManualRelay(String deviceCode, boolean state) {
        if (currentMode != RelayControlMode.MANUAL) {
            throw new IllegalStateException("Relay đang ở chế độ AUTO");
        }
        this.manualState = state;
        mqttPublisher.sendRelayCommand(deviceCode, state);
    }

    public boolean getManualState() {
        return manualState;
    }
}
