import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import type { StackNavigationProp } from '@react-navigation/stack';
import type { RootStackParamList } from '../navigation/AppNavigator';

type OrdersScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Vaše objednávky'>;

const mockOrders = [
  { id: '1', car: 'Škoda Octavia', date: '2025-05-20', status: 'Hotovo' },
  { id: '2', car: 'VW Passat', date: '2025-05-25', status: 'Probíhá' },
];

const OrdersScreen: React.FC = () => {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Vaše objednávky</Text>
      <Button title="Nová objednávka" onPress={() => navigation.navigate('Rezervace')} />
      <FlatList
        data={mockOrders}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.orderItem}
            onPress={() => navigation.navigate('CarDetail', { car: item.car })}
          >
            <Text style={styles.car}>{item.car}</Text>
            <Text>{item.date} - {item.status}</Text>
          </TouchableOpacity>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 },
  orderItem: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 10, marginBottom: 12 },
  car: { fontWeight: 'bold' }
});

export default OrdersScreen;