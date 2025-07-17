import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';

const SensorData = () => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://10.0.2.2:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log('✅ WebSocket connected');
        client.subscribe('/topic/esp32', (message) => {
          console.log('🔥 Received:', message.body);
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
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Dữ liệu cảm biến (ESP32)</Text>
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
  container: {
    position: 'absolute',       // 👈 Gắn lên góc phải
    top: 40,
    right: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 8,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
  },
});

export default SensorData;
