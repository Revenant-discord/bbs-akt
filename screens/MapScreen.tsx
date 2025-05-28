import React, { useEffect, useState } from 'react';
import { StyleSheet, Dimensions, ActivityIndicator, Alert } from 'react-native';
// Z SafeAreaView použijeme pouze dolní a boční okraje, aby nevznikala mezera pod headerem
import { SafeAreaView } from 'react-native-safe-area-context';
import MapView, { Marker, Polygon } from 'react-native-maps';
import * as Location from 'expo-location';
import { plzenskyKrajCoords } from './plzenskyKrajPolygon';

const MapScreen = () => {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Chyba', 'Aplikace potřebuje povolení k přístupu k poloze.');
        setLoading(false);
        return;
      }

      let loc = await Location.getCurrentPositionAsync({});
      setLocation(loc);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
        <ActivityIndicator size="large" />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container} edges={['left', 'right', 'bottom']}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 49.75,
          longitude: 13.37,
          latitudeDelta: 1.3,
          longitudeDelta: 1.3,
        }}
        showsUserLocation={true}
      >
        {/* Přesný polygon Plzeňského kraje */}
        <Polygon
          coordinates={plzenskyKrajCoords}
          fillColor="rgba(255,140,0,0.3)"
          strokeColor="rgba(255,140,0,1)"
          strokeWidth={3}
        />
        {/* Marker na aktuální pozici uživatele */}
        {location && (
          <Marker
            coordinate={{
              latitude: location.coords.latitude,
              longitude: location.coords.longitude,
            }}
            title="Vaše poloha"
            pinColor="blue"
          />
        )}
      </MapView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapScreen;