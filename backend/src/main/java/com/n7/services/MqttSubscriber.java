package com.n7.services;

import com.n7.configs.MqttProperties;
import com.n7.controllers.WebSocketController;
import com.n7.pojo.EnvRecord;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MqttSubscriber {

    private final MqttProperties mqttProperties;
    private final WebSocketController webSocketController;

    private EnvRecord latestRecord;

    public MqttSubscriber(MqttProperties mqttProperties, WebSocketController webSocketController) {
        this.mqttProperties = mqttProperties;
        this.webSocketController = webSocketController;
        startSubscriber();
    }

    private void startSubscriber() {
        try {
            String clientId = mqttProperties.getClientId() + "-" + java.util.UUID.randomUUID(); // clientId động
            MqttClient client = new MqttClient(mqttProperties.getBroker(), clientId, null);

            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);

            if (mqttProperties.getUsername() != null && !mqttProperties.getUsername().isEmpty()) {
                options.setUserName(mqttProperties.getUsername());
                options.setPassword(mqttProperties.getPassword().toCharArray());
            }

            client.connect(options);
            client.subscribe(mqttProperties.getTopic(), (t, msg) -> {
                String payload = new String(msg.getPayload());
                System.out.println("Received: " + payload);

                JSONObject json = new JSONObject(payload);
                double temp = json.getDouble("temperature");
                double hum = json.getDouble("humidity");

                EnvRecord record = new EnvRecord();
                record.setTemperature((float) temp);
                record.setHumidity((float) hum);
                record.setTimestamp(LocalDateTime.now());

                this.latestRecord = record;

                // Gửi dữ liệu real-time qua WebSocket
                webSocketController.sendDataToClients(record);

                System.out.println("Data sent to WebSocket: " + record);
            });

            System.out.println("Connected and subscribed to topic: " + mqttProperties.getTopic());

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }


    public EnvRecord getLatestRecord() {
        return latestRecord;
    }
}
