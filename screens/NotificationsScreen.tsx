import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const NotificationsScreen = () => (
  <SafeAreaView style={styles.container}>
    <Text style={styles.title}>Oznámení</Text>
  </SafeAreaView>
);

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16 }
});

export default NotificationsScreen;