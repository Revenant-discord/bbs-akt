import React from 'react';
import { View, Text, StyleSheet, Linking, TouchableOpacity } from 'react-native';

const AboutScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O aplikaci</Text>
      <Text style={styles.text}>
        Tato aplikace byla vytvořena pro zákazníky BBS Detailing. Umožňuje snadno rezervovat služby, sledovat objednávky, spravovat věrnostní program a mnoho dalšího.
      </Text>
      <Text style={styles.text}>
        Verze aplikace: <Text style={styles.bold}>1.0.0</Text>
      </Text>
      <TouchableOpacity
        onPress={() => Linking.openURL('https://bbsdetailing.cz')}
        style={styles.linkButton}
      >
        <Text style={styles.linkText}>Navštívit naše webové stránky</Text>
      </TouchableOpacity>
      <Text style={styles.footer}>
        © {new Date().getFullYear()} BBS Detailing
      </Text>
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
    marginBottom: 10,
  },
  bold: {
    fontWeight: 'bold',
    color: '#F57C00',
  },
  linkButton: {
    marginTop: 20,
    backgroundColor: '#F57C00',
    borderRadius: 8,
    paddingHorizontal: 18,
    paddingVertical: 10,
  },
  linkText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  footer: {
    marginTop: 40,
    color: '#bbb',
    fontSize: 14,
    textAlign: 'center',
  },
});

export default AboutScreen;