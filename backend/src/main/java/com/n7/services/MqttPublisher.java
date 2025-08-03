package com.n7.services;

import com.n7.configs.MqttProperties;
import org.eclipse.paho.client.mqttv3.*;
import org.springframework.stereotype.Service;

@Service
public class MqttPublisher {

    private final MqttClient client;
    private final MqttProperties mqttProperties;

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
            String topic = mqttProperties.getTopic(); // ví dụ: esp32/sensor
            String commandTopic = topic.replace("sensor", "relay"); // ví dụ: esp32/relay

            String payload = String.format("{\"device_code\":\"%s\", \"relay\": \"%s\"}",
                    deviceCode, turnOn ? "on" : "off");

            MqttMessage message = new MqttMessage(payload.getBytes());
            message.setQos(1);

            client.publish(commandTopic, message);
            System.out.printf("Sent to topic %s: %s%n", commandTopic, payload);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }
}
