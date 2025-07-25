// components/UtilityScreen.js
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function UtilityScreen() {
  const navigation = useNavigation();

  const utilities = [
    {
      title: 'Thêm thực phẩm',
      onPress: () => navigation.navigate('Scan'), // tên route đã đăng ký
    },
    {
      title: 'Thêm thiết bị',
      onPress: () => navigation.navigate('AddDevice'), // tên route đã đăng ký
    },
    // Có thể thêm các tiện ích khác sau
    // { title: 'Theo dõi nhiệt độ', onPress: () => {} },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Các tiện ích</Text>
      <View style={styles.grid}>
        {utilities.map((item, index) => (
          <TouchableOpacity
            key={index}
            style={styles.box}
            onPress={item.onPress}
          >
            <Text style={styles.boxText}>{item.title}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  box: {
    width: 140,
    height: 140,
    backgroundColor: '#007AFF',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  boxText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});
