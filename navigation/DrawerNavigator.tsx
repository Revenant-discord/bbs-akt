import React, { useRef, useEffect } from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { TouchableOpacity, View, StyleSheet, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

import MapScreen from '../screens/MapScreen';
import PriceListScreen from '../screens/PriceListScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import PaymentsScreen from '../screens/PaymentsScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import LegalScreen from '../screens/LegalScreen';

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const BUTTON_SIZE = 54;
const OUTLINE_SIZE = 64;

const styles = StyleSheet.create({
  menuButtonContainer: {
    marginLeft: 16,
    marginRight: 4,
  },
  outline: {
    position: 'absolute',
    width: OUTLINE_SIZE,
    height: OUTLINE_SIZE,
    top: -(OUTLINE_SIZE - BUTTON_SIZE) / 2,
    left: -(OUTLINE_SIZE - BUTTON_SIZE) / 2,
    borderRadius: OUTLINE_SIZE / 2,
    zIndex: 0,
    overflow: 'hidden',
  },
  menuButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 10,
    shadowColor: '#FFB86B',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.10,
    shadowRadius: 8,
    zIndex: 1,
    overflow: 'hidden',
  },
  // Pulzující oranžový efekt
  pulse: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    backgroundColor: 'rgba(245,124,0,0.45)', // méně průhledná výplň
    zIndex: 2,
  },
  menuIcon: {
    color: '#F57C00',
    fontSize: 28,
    zIndex: 3,
  },
});

function PulsingButton({ children }: { children: React.ReactNode }) {
  const pulseAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(pulseAnim, {
          toValue: 0,
          duration: 1100,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
      ])
    ).start();
  }, [pulseAnim]);

  // Pulz efekt: mění scale a opacity pulzní výplně i kolečka
  const scale = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.7, 1.07],
  });
  const pulseOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0.22, 0.48], // méně průhledná při max
  });
  const buttonOpacity = pulseAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0.78], // kolečko se lehce zprůhlední během pulsu
  });

  return (
    <Animated.View style={{ opacity: buttonOpacity }}>
      <View style={{ position: 'relative' }}>
        <Animated.View
          style={[
            styles.pulse,
            {
              transform: [{ scale }],
              opacity: pulseOpacity,
            },
          ]}
        />
        {children}
      </View>
    </Animated.View>
  );
}

export default function DrawerNavigator() {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.92,
      useNativeDriver: true,
      speed: 28,
      bounciness: 7,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
      speed: 16,
      bounciness: 8,
    }).start();
  };

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: true,
        headerTitleAlign: 'center',
        headerLeft: () => (
          <View style={styles.menuButtonContainer}>
            <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
              <TouchableOpacity
                onPress={() => navigation.toggleDrawer()}
                activeOpacity={0.85}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                hitSlop={{ top: 18, bottom: 18, left: 18, right: 18 }}
              >
                <View>
                  {/* Moderní gradient outline */}
                  <View style={styles.outline}>
                    <LinearGradient
                      colors={['#FFB86B', '#F57C00', '#FF8C00', '#FFB86B']}
                      start={{ x: 0.1, y: 0.3 }}
                      end={{ x: 0.9, y: 0.7 }}
                      style={{
                        width: OUTLINE_SIZE,
                        height: OUTLINE_SIZE,
                        borderRadius: OUTLINE_SIZE / 2,
                        opacity: 0.85,
                      }}
                    />
                  </View>
                  <PulsingButton>
                    <View style={styles.menuButton}>
                      <Ionicons name="menu" style={styles.menuIcon} />
                    </View>
                  </PulsingButton>
                </View>
              </TouchableOpacity>
            </Animated.View>
          </View>
        ),
        drawerActiveTintColor: '#F57C00',
        drawerInactiveTintColor: '#222',
        drawerLabelStyle: { fontWeight: 'bold', fontSize: 16 },
      })}
    >
      <Drawer.Screen
        name="Mapa"
        component={MapScreen}
        options={{
          headerTitle: 'Mapa',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="map" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Ceník"
        component={PriceListScreen}
        options={{
          headerTitle: 'Ceník',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="pricetag" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Rezervace"
        component={ReservationScreen}
        options={{
          headerTitle: 'Rezervace',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="calendar" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Profil"
        component={ProfileScreen}
        options={{
          headerTitle: 'Profil',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="person" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Platby a faktury"
        component={PaymentsScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="card" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Věrnostní program"
        component={LoyaltyScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="ribbon" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FAQ"
        component={FaqScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="help-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Kontakt"
        component={ContactScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="call" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="O aplikaci"
        component={AboutScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="information-circle" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="Právní informace"
        component={LegalScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <Ionicons name="document" size={size} color={color} />
          ),
        }}
      />
    </Drawer.Navigator>
  );
}