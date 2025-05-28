import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import CarsScreen from '../screens/CarsScreen';
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
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Auta') iconName = 'car';
          else if (route.name === 'Profil') iconName = 'person';
          else iconName = 'ellipse';
          return <Ionicons name={iconName as any} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} options={{ tabBarLabel: 'Domů' }} />
      <Tab.Screen name="Auta" component={CarsScreen} />
      <Tab.Screen name="Profil" component={ProfileScreen} />
    </Tab.Navigator>
  );
}