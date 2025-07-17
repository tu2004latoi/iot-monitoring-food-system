// components/UtilityScreen.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function UtilityScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Tiện ích đang phát triển...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  text: { fontSize: 18 },
});
