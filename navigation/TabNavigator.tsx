import React from 'react';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import TabNavigator from './TabNavigator';
import PaymentsScreen from '../screens/PaymentsScreen';
import LoyaltyScreen from '../screens/LoyaltyScreen';
import FaqScreen from '../screens/FaqScreen';
import ContactScreen from '../screens/ContactScreen';
import AboutScreen from '../screens/AboutScreen';
import LegalScreen from '../screens/LegalScreen';
import { Ionicons } from '@expo/vector-icons';

// Drawer navigator
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      {/* Další custom sekce, například odhlášení, apod. */}
    </DrawerContentScrollView>
  );
}

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: '#F57C00',
        drawerInactiveTintColor: '#222',
        drawerLabelStyle: { fontWeight: 'bold', fontSize: 16 },
      }}
    >
      <Drawer.Screen
        name="Domů"
        component={TabNavigator}
        options={{
          drawerLabel: 'Domů',
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
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