import React, { useState } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
} from 'react-native';
import APIs, { authApis, endpoints } from '../../configs/APIs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AddDevice = () => {
    const [deviceCode, setDeviceCode] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [msg, setMsg] = useState('');

    const validate = () => {
        let errors = {};
        if (!deviceCode) errors.deviceCode = 'Mã thiết bị không được để trống';

        setFieldErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async () => {
        setMsg('');
        if (!validate()) return;
        try {
            setLoading(true);
            const token = await AsyncStorage.getItem('token');
            const res = await authApis(token).post(endpoints['add-device'](deviceCode), {
                deviceCode
            });
            Alert.alert('Thành công', 'Thiết bị đã được thêm!');
            setDeviceCode(''); // reset form
        } catch (err) {
            console.error(err);
            setMsg('Có lỗi xảy ra khi thêm thiết bị');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Thêm thiết bị mới</Text>
            {msg ? <Text style={styles.errorMsg}>{msg}</Text> : null}

            <TextInput
                style={styles.input}
                placeholder="Mã thiết bị"
                value={deviceCode}
                onChangeText={setDeviceCode}
            />
            {fieldErrors.deviceCode && <Text style={styles.error}>{fieldErrors.deviceCode}</Text>}

            <TouchableOpacity onPress={handleSubmit} style={styles.button} disabled={loading}>
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={styles.buttonText}>Thêm thiết bị</Text>
                )}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 24,
        textAlign: 'center',
        color: '#2d6cdf',
    },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 12,
        borderRadius: 8,
        marginBottom: 10,
    },
    button: {
        backgroundColor: '#2d6cdf',
        padding: 14,
        borderRadius: 8,
        marginTop: 16,
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    error: {
        color: 'red',
        marginBottom: 10,
    },
    errorMsg: {
        color: 'red',
        textAlign: 'center',
        marginBottom: 12,
    },
});

export default AddDevice;