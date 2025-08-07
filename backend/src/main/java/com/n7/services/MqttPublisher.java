package com.n7.services;

import com.n7.configs.MqttProperties;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.stereotype.Service;

@Service
public class MqttPublisher {

    private final MqttClient client;
    private final MqttProperties mqttProperties;

    private final String relayTopic = "esp32/relay";
    private final String modeTopic = "esp32/mode";

    public MqttPublisher(MqttProperties mqttProperties) throws MqttException {
        this.mqttProperties = mqttProperties;
        this.client = new MqttClient(mqttProperties.getBroker(), MqttClient.generateClientId(), null);

        MqttConnectOptions options = new MqttConnectOptions();
        options.setAutomaticReconnect(true);
        options.setCleanSession(true);

        if (mqttProperties.getUsername() != null && !mqttProperties.getUsername().isEmpty()) {
            options.setUserName(mqttProperties.getUsername());
            options.setPassword(mqttProperties.getPassword().toCharArray());
        }

        this.client.connect(options);
    }

    public void sendRelayCommand(String deviceCode, boolean turnOn) {
        try {
            String payload = String.format("{\"device_code\":\"%s\", \"relay\": \"%s\"}",
                    deviceCode, turnOn ? "on" : "off");

            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(1);

            client.publish(relayTopic, message);
            System.out.printf("Sent to topic %s: %s%n", relayTopic, payload);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public void sendModeCommand(String mode) {
        try {
            String payload = String.format("{\"mode\": \"%s\"}", mode);

            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(1);

            client.publish(modeTopic, message);
            System.out.printf("Sent to topic %s: %s%n", modeTopic, payload);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
