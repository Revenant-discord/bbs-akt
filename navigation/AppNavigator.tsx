import React, { useContext, useState } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen'; // <-- Přidáno
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen'; // <-- Přidáno
import CarDetailScreen from '../screens/CarDetailScreen';
import SplashScreen from "../screens/SplashScreen";
import TabNavigator from './TabNavigator';
import { AuthContext } from '../context/AuthContext';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined; // <-- Přidáno
  Tabs: undefined;
  CarDetail: { car: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const AppNavigator = () => {
  const { user } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);

  if (showSplash) {
    return <SplashScreen onFinish={() => setShowSplash(false)} />;
  }

  return (
    <Stack.Navigator>
      {!user ? (
        <>
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={RegisterScreen} options={{ headerShown: false }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ headerShown: false }} />
        </>
      ) : (
        <>
          <Stack.Screen name="Tabs" component={TabNavigator} options={{ headerShown: false }} />
          <Stack.Screen name="CarDetail" component={CarDetailScreen} options={{ title: 'Detail vozidla' }} />
        </>
      )}
    </Stack.Navigator>
  );
};

export default AppNavigator;