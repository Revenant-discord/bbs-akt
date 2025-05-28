import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const PaymentsScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Platby a faktury</Text>
      <Text style={styles.text}>
        Zde najdete přehled všech svých objednávek, plateb a faktur.
      </Text>
      {/* Zde můžeš později přidat seznam faktur, historii plateb, apod. */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    color: '#F57C00',
  },
  text: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
});

export default PaymentsScreen;