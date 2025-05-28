import React, { useState } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { View, Text, StyleSheet, Switch, FlatList } from 'react-native';

type Package = {
  id: string;
  name: string;
  description: string;
  oneTimePrice: number;
  monthlyPrice: number;
};

const packages: Package[] = [
  {
    id: '1',
    name: 'Základní mytí',
    description: 'Ruční mytí exteriéru vozu.',
    oneTimePrice: 399,
    monthlyPrice: 999,
  },
  {
    id: '2',
    name: 'Kompletní detailing',
    description: 'Hloubkové čištění interiéru i exteriéru.',
    oneTimePrice: 1599,
    monthlyPrice: 3599,
  },
  {
    id: '3',
    name: 'Interiér+exteriér',
    description: 'Profesionální údržba celého vozu.',
    oneTimePrice: 999,
    monthlyPrice: 2499,
  },
];

const PriceListScreen: React.FC = () => {
  const [isMonthly, setIsMonthly] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
      <Text style={styles.title}>Ceník balíčků</Text>
      <View style={styles.switchRow}>
        <Text style={!isMonthly ? styles.selected : undefined}>Jednorázově</Text>
        <Switch
          value={isMonthly}
          onValueChange={setIsMonthly}
        />
        <Text style={isMonthly ? styles.selected : undefined}>Měsíčně</Text>
      </View>
      <FlatList
        data={packages}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.packageBox}>
            <Text style={styles.packageName}>{item.name}</Text>
            <Text>{item.description}</Text>
            <Text style={styles.price}>
              {isMonthly
                ? `${item.monthlyPrice} Kč / měsíc`
                : `${item.oneTimePrice} Kč / jednorázově`}
            </Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 16, textAlign: 'center' },
  switchRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 18 },
  selected: { fontWeight: 'bold', color: '#1565c0' },
  packageBox: { backgroundColor: '#f2f2f2', padding: 16, borderRadius: 10, marginBottom: 16 },
  packageName: { fontSize: 18, fontWeight: 'bold' },
  price: { fontSize: 16, fontWeight: 'bold', marginTop: 8, color: '#1565c0' }
});

export default PriceListScreen;