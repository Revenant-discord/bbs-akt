import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../navigation/AppNavigator';

type CarDetailScreenRouteProp = RouteProp<RootStackParamList, 'CarDetail'>;

const CarDetailScreen: React.FC = () => {
  const route = useRoute<CarDetailScreenRouteProp>();
  const { car } = route.params;

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>{car}</Text>
      <Text>Detail vozidla bude zde...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 }
});

export default CarDetailScreen;