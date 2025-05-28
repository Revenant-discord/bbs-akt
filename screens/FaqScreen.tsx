import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const FaqScreen: React.FC = () => {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Často kladené dotazy</Text>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Jak mohu vytvořit novou rezervaci?</Text>
        <Text style={styles.answer}>
          Novou rezervaci vytvoříte v sekci "Rezervace" v hlavním menu aplikace. Vyberte datum, čas a potvrďte.
        </Text>
      </View>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Kde najdu své faktury?</Text>
        <Text style={styles.answer}>
          Všechny své platby a faktury najdete v sekci "Platby a faktury" v bočním menu.
        </Text>
      </View>
      <View style={styles.faqItem}>
        <Text style={styles.question}>Jak získám body do věrnostního programu?</Text>
        <Text style={styles.answer}>
          Body získáváte za každou dokončenou objednávku. Přehled bodů najdete ve "Věrnostním programu".
        </Text>
      </View>
      {/* Přidej další otázky a odpovědi dle potřeby */}
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
  faqItem: {
    marginBottom: 24,
  },
  question: {
    fontSize: 17,
    fontWeight: 'bold',
    marginBottom: 6,
    color: '#222',
  },
  answer: {
    fontSize: 15,
    color: '#333',
    lineHeight: 20,
  },
});

export default FaqScreen;