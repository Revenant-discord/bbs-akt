import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const LoyaltyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Věrnostní program</Text>
      <Text style={styles.text}>
        Zde najdete informace o svých bodech, odměnách a benefitech věrnostního programu.
      </Text>
      {/* Později zde můžeš zobrazit aktuální počet bodů, úrovně, odměny atd. */}
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

export default LoyaltyScreen;