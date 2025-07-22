import "./Devices.css";
import SockJS from 'sockjs-client';
import { Client } from '@stomp/stompjs';
import { useEffect, useState } from "react";

const Devices = ({ devices }) => {
  const [sensorData, setSensorData] = useState(null);

  useEffect(() => {
    const socket = new SockJS('http://10.0.2.2:8080/ws');
    const client = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,
      onConnect: () => {
        console.log(' WebSocket connected');
        client.subscribe('/topic/esp32', (message) => {
          console.log(' Received:', message.body);
          try {
            const data = JSON.parse(message.body);
            setSensorData(data);
          } catch (err) {
            console.error(' Lỗi phân tích JSON:', err);
          }
        });
      },
      onStompError: (frame) => {
        console.error(' STOMP error: ' + frame.headers['message']);
      },
    });

    client.activate();

    return () => {
      client.deactivate();
    };
  }, []);


  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title ">📦 Danh sách thiết bị</h1>
      <h1 className="text-7xl font-bold text-blue-500">Hello Tailwind!</h1>
      <div className="product-grid">
        {devices.map((p) => (
          <div className="product-card" key={p.deviceId}>
            <div className="product-info">
              <h3 className="product-name">Tên thiết bị: {p.deviceName}</h3>
              <h3 className="product-name">Mã thiết bị: {p.deviceCode}</h3>

              {sensorData ? (
                <>
                  <h3>Nhiệt độ: {sensorData.temperature}°C</h3>
                  <h3>Độ ẩm: {sensorData.humidity}%</h3>
                  <h3>Thời gian: {sensorData.timestamp}</h3>
                </>
              ) : (
                <h3>Đang chờ dữ liệu từ cảm biến...</h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Devices;


