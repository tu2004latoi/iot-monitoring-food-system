package com.n7.services;

import com.n7.configs.MqttProperties;
import com.n7.controllers.WebSocketController;
import com.n7.dto.EnvRecordDTO;
import com.n7.pojo.Device;
import com.n7.pojo.EnvRecord;
import org.eclipse.paho.client.mqttv3.*;
import org.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class MqttSubscriber {

    @Autowired
    private DeviceService deviceService;

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
                String device_code = json.getString("device_code");
                double temp = json.getDouble("temperature");
                double hum = json.getDouble("humidity");

                Device device = this.deviceService.getOrCreateByDeviceCode(device_code);

                EnvRecord record = new EnvRecord();
                record.setTemperature((float) temp);
                record.setHumidity((float) hum);
                record.setTimestamp(LocalDateTime.now());
                record.setDevice(device);

                this.latestRecord = record;

                // Gửi dữ liệu real-time qua WebSocket
                webSocketController.sendDataToClients(convertToDTO(record));

                System.out.println("Data sent to WebSocket: " + convertToDTO(record));
            });

            System.out.println("Connected and subscribed to topic: " + mqttProperties.getTopic());

        } catch (MqttException e) {
            e.printStackTrace();
        }
    }


    public EnvRecord getLatestRecord() {
        return latestRecord;
    }

    public EnvRecordDTO convertToDTO(EnvRecord record) {
        EnvRecordDTO dto = new EnvRecordDTO();
        dto.setTemperature(record.getTemperature());
        dto.setHumidity(record.getHumidity());
        dto.setDeviceCode(record.getDevice().getDeviceCode());
        dto.setTimestamp(record.getTimestamp().toString()); // Hoặc định dạng tùy bạn
        return dto;
    }

}
