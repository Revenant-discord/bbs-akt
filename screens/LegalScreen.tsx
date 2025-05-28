import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const LegalScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Právní informace</Text>
      <Text style={styles.sectionTitle}>Ochrana osobních údajů</Text>
      <Text style={styles.text}>
        Vaše osobní údaje jsou zpracovávány v souladu s platnou legislativou a zásadami ochrany osobních údajů. Podrobné informace naleznete na našich webových stránkách nebo nás kontaktujte pro více detailů.
      </Text>
      <Text style={styles.sectionTitle}>Obchodní podmínky</Text>
      <Text style={styles.text}>
        Používáním této aplikace souhlasíte s aktuálními obchodními podmínkami společnosti BBS Detailing. Podmínky se mohou čas od času měnit.
      </Text>
      <Text style={styles.sectionTitle}>GDPR</Text>
      <Text style={styles.text}>
        Pro veškeré dotazy ohledně zpracování osobních údajů nás kontaktujte na e-mailu info@bbsdetailing.cz.
      </Text>
      {/* Můžeš přidat další právní sekce podle potřeby */}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 22,
    color: '#F57C00',
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 18,
    marginBottom: 6,
    color: '#222',
  },
  text: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
});

export default LegalScreen;