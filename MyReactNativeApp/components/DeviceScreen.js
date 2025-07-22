import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    ActivityIndicator,
    Alert,
} from 'react-native';
import APIs, { authApis, endpoints } from '../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SensorData from './devices/SensorData';

const DeviceScreen = () => {
    const [devices, setDevices] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadDevices = async () => {
            try {
                const token = await AsyncStorage.getItem('token');
                const res = await authApis(token).get(endpoints['my-devices']);
                setDevices(res.data);
            } catch (err) {
                console.error(err);
                Alert.alert("Lỗi", "Không thể tải danh sách thiết bị");
            } finally {
                setLoading(false);
            }
        };

        loadDevices();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>📱 {item.deviceName || '(Không có tên)'}</Text>
            <Text>Mã thiết bị: {item.deviceCode}</Text>
            <Text>ID thiết bị: {item.deviceId}</Text>
            <Text>ID người dùng: {item.userId ?? 'Chưa gán'}</Text>

            {/* ✅ Gắn dữ liệu cảm biến */}
            <SensorData deviceCode={item.deviceCode} />
        </View>
    );
    if (loading) {
        return (
            <View style={styles.center}>
                <ActivityIndicator size="large" color="#2d6cdf" />
                <Text>Đang tải thiết bị...</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={devices}
            keyExtractor={(item) => item.deviceId.toString()}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
            ListEmptyComponent={<Text style={styles.empty}>Bạn chưa có thiết bị nào.</Text>}
        />
    );
};

const styles = StyleSheet.create({
    list: {
        padding: 16,
        backgroundColor: '#fff',
    },
    item: {
        backgroundColor: '#f0f4ff',
        padding: 16,
        borderRadius: 10,
        marginBottom: 12,
        elevation: 2,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 4,
        color: '#2d6cdf',
    },
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    empty: {
        textAlign: 'center',
        marginTop: 20,
        color: '#888',
    },
});

export default DeviceScreen;
