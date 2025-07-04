import React, { useState } from 'react';
import { View, Text, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import { CameraView, Camera, useCameraPermissions } from 'expo-camera';

const ScanScreen = () => {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  // Kiểm tra quyền camera
  if (!permission) {
    return (
      <View style={styles.container}>
        <Text>Đang tải...</Text>
      </View>
    );
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          Ứng dụng cần quyền truy cập camera để quét mã
        </Text>
        <TouchableOpacity style={styles.button} onPress={requestPermission}>
          <Text style={styles.buttonText}>Cấp quyền</Text>
        </TouchableOpacity>
      </View>
    );
  }

  // Xử lý khi quét được mã
  const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    setScanned(true);
    Alert.alert(
      'Đã quét được mã!', 
      `Loại: ${type}\nDữ liệu: ${data}`, 
      [
        { 
          text: 'OK', 
          onPress: () => setScanned(false) // Reset để có thể quét tiếp
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <CameraView
        style={styles.camera}
        facing="back"
        onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
        barcodeScannerSettings={{
          barcodeTypes: [
            "qr",        // Mã QR
            "pdf417",    // PDF417
            "aztec",     // Aztec
            "ean13",     // EAN-13
            "ean8",      // EAN-8
            "upc_e",     // UPC-E
            "code128",   // Code 128
            "code39",    // Code 39
            "code93",    // Code 93
            "codabar",   // Codabar
            "itf14",     // ITF-14
            "datamatrix" // Data Matrix
          ],
        }}
      >
        {/* Overlay để hiển thị khung quét */}
        <View style={styles.overlay}>
          <View style={styles.scanArea}>
            <Text style={styles.instruction}>
              Đưa mã vào khung để quét
            </Text>
          </View>
          
          {scanned && (
            <TouchableOpacity 
              style={styles.scanAgainButton}
              onPress={() => setScanned(false)}
            >
              <Text style={styles.scanAgainText}>Quét lại</Text>
            </TouchableOpacity>
          )}
        </View>
      </CameraView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  message: {
    textAlign: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  camera: {
    flex: 1,
    width: '100%',
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 250,
    height: 250,
    borderWidth: 2,
    borderColor: 'white',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.1)',
  },
  instruction: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  scanAgainButton: {
    position: 'absolute',
    bottom: 100,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 30,
    paddingVertical: 15,
    borderRadius: 25,
  },
  scanAgainText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default ScanScreen;