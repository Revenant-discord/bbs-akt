import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const ContactScreen: React.FC = () => {
  const handleEmail = () => {
    Linking.openURL('mailto:info@bbsdetailing.cz');
  };

  const handlePhone = () => {
    Linking.openURL('tel:+420123456789');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Kontakt</Text>
      <Text style={styles.text}>Máte dotaz nebo potřebujete pomoc? Kontaktujte nás:</Text>

      <TouchableOpacity onPress={handlePhone} style={styles.button}>
        <Text style={styles.buttonText}>Telefon: +420 123 456 789</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEmail} style={styles.button}>
        <Text style={styles.buttonText}>E-mail: info@bbsdetailing.cz</Text>
      </TouchableOpacity>

      <Text style={styles.addressTitle}>Adresa provozovny:</Text>
      <Text style={styles.text}>Ulice 1, 123 45 Město</Text>
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
    marginBottom: 8,
  },
  button: {
    backgroundColor: '#fff7eb',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginVertical: 7,
    borderColor: '#F57C00',
    borderWidth: 1,
  },
  buttonText: {
    color: '#F57C00',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addressTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    marginTop: 22,
    marginBottom: 5,
    color: '#222',
  },
});

export default ContactScreen;