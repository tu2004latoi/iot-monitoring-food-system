import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SensorData = ({ deviceCode }) => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    if (!deviceCode) return;

    const socket = new SockJS('http://10.0.2.2:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(`✅ WebSocket connected to ${deviceCode}`);
        client.subscribe(`/topic/esp32/${deviceCode}`, (message) => {
          try {
            const data = JSON.parse(message.body);
            setSensorData(data);
          } catch (err) {
            console.error('❌ Lỗi phân tích JSON:', err);
          }
        });
      },
      onStompError: (frame) => {
        console.error('❌ STOMP error: ' + frame.headers['message']);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, [deviceCode]);

  return (
    <View style={styles.sensorContainer}>
      <Text style={styles.title}>🌡️ Dữ liệu cảm biến</Text>
      {sensorData ? (
        <>
          <Text>Nhiệt độ: {sensorData.temperature}°C</Text>
          <Text>Độ ẩm: {sensorData.humidity}%</Text>
          <Text>Thời gian: {sensorData.timestamp}</Text>
        </>
      ) : (
        <Text>Đang chờ dữ liệu...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  sensorContainer: {
    marginTop: 10,
    padding: 8,
    backgroundColor: '#e6f0ff',
    borderRadius: 6,
  },
  title: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: '#333',
  },
});

export default SensorData;
