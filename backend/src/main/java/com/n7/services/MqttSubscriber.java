package com.n7.services;

import com.n7.controllers.WebSocketController;
import com.n7.pojo.EnvRecord;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MqttSubscriber {

    private final String broker = "tcp://192.168.1.17:1883";
    private final String clientId = "SpringBootClient";
    private final String topic = "esp32/sensor";

    private EnvRecord latestRecord;

    @Autowired
    private WebSocketController webSocketController;

    public MqttSubscriber() {
        startSubscriber();
    }

    private void startSubscriber() {
        try {
            MqttClient client = new MqttClient(broker, clientId, null);
            MqttConnectOptions options = new MqttConnectOptions();
            options.setAutomaticReconnect(true);
            options.setCleanSession(true);

            client.connect(options);
            client.subscribe(topic, (t, msg) -> {
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

                // Gửi dữ liệu tới client real-time qua WebSocket
                webSocketController.sendDataToClients(record);

            });

            System.out.println("Connected and subscribed to topic: " + topic);

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }

    public EnvRecord getLatestRecord() {
        return latestRecord;
    }
}