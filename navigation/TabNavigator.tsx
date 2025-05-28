import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MapScreen from '../screens/MapScreen';
import CarDetailScreen from '../screens/CarDetailScreen';
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
          if (route.name === 'Map') iconName = 'map';
          else if (route.name === 'Detail auta') iconName = 'car';
          else if (route.name === 'Profil') iconName = 'person';
          else iconName = 'ellipse';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Map" component={MapScreen} options={{ tabBarLabel: 'Mapa' }} />
      <Tab.Screen name="Detail auta" component={CarDetailScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}