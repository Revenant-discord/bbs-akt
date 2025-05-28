import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import PriceListScreen from '../screens/PriceListScreen';
import ReservationScreen from '../screens/ReservationScreen';
import ProfileScreen from '../screens/ProfileScreen';
import { Ionicons } from '@expo/vector-icons';

const Tab = createBottomTabNavigator();

export default function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#F57C00',
        tabBarInactiveTintColor: '#222',
        tabBarLabelStyle: { fontWeight: 'bold', fontSize: 14 },
        tabBarIcon: ({ color, size }) => {
          let iconName: string;
          if (route.name === 'Mapa') iconName = 'map';
          else if (route.name === 'Ceník') iconName = 'pricetag';
          else if (route.name === 'Rezervace') iconName = 'calendar';
          else if (route.name === 'Profil') iconName = 'person';
          else iconName = 'ellipse';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Mapa" component={MapScreen} />
      <Tab.Screen name="Ceník" component={PriceListScreen} />
      <Tab.Screen name="Rezervace" component={ReservationScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}