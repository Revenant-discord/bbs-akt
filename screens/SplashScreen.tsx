import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Animated, Image, Dimensions, StatusBar } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

// Oranžový gradient a barvy
const ORANGE = "#FF9800";
const ORANGE_DARK = "#F57C00";
const WHITE = "#fff";
const BG_GRADIENT = [ORANGE_DARK, ORANGE];

// Logo – nahraď cestu nebo obrázek za tvé firemní logo!
const LOGO_URI = require("../assets/logo.png");

const steps = [
  "Inicializace aplikace...",
  "Ověřujeme aktualizace...",
  "Připravujeme prostředí...",
  "Načítáme data uživatele...",
  "Startujeme BBS Detailing..."
];

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
  const [step, setStep] = useState(0);
  const progress = useRef(new Animated.Value(0)).current;
  const logoScale = useRef(new Animated.Value(0.7)).current;
  const logoOpacity = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Logo animace
    Animated.parallel([
      Animated.spring(logoScale, { toValue: 1, useNativeDriver: true }),
      Animated.timing(logoOpacity, { toValue: 1, duration: 650, useNativeDriver: true }),
    ]).start();

    // Kroky a progress
    let currentStep = 0;
    const totalSteps = steps.length;
    const interval = setInterval(() => {
      if (currentStep < totalSteps - 1) {
        setStep(++currentStep);
        Animated.timing(progress, {
          toValue: (currentStep + 1) / totalSteps,
          duration: 380,
          useNativeDriver: false,
        }).start();
      } else {
        clearInterval(interval);
        setTimeout(() => {
          Animated.timing(progress, {
            toValue: 1,
            duration: 420,
            useNativeDriver: false,
          }).start(() => onFinish());
        }, 900);
      }
    }, 850);

    return () => clearInterval(interval);
  }, [onFinish, progress, logoScale, logoOpacity]);

  const barWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  return (
    <LinearGradient colors={BG_GRADIENT} style={styles.gradient}>
      <StatusBar barStyle="light-content" backgroundColor={ORANGE_DARK} />
      <View style={styles.container}>
        <Animated.View
          style={[
            styles.logoWrapper,
            {
              transform: [{ scale: logoScale }],
              opacity: logoOpacity,
              shadowColor: ORANGE,
              shadowOffset: { width: 0, height: 8 },
              shadowOpacity: 0.45,
              shadowRadius: 20,
              elevation: 10,
            },
          ]}
        >
          <Image
            source={LOGO_URI}
            style={styles.logo}
            resizeMode="contain"
          />
        </Animated.View>
        <Text style={styles.brand}>BBS Detailing</Text>
        <View style={styles.progressBarBackground}>
          <Animated.View
            style={[
              styles.progressBarFill,
              { width: barWidth }
            ]}
          />
        </View>
        <Text style={styles.stepText}>{steps[step]}</Text>
        <Text style={styles.footer}>© {new Date().getFullYear()} BBS Detailing</Text>
      </View>
    </LinearGradient>
  );
}

const { width } = Dimensions.get("window");

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 28,
  },
  logoWrapper: {
    backgroundColor: WHITE,
    borderRadius: 38,
    padding: 18,
    marginBottom: 18,
    alignItems: "center",
    justifyContent: "center",
    elevation: 10,
  },
  logo: {
    width: 90,
    height: 90,
  },
  brand: {
    fontSize: 30,
    fontWeight: "bold",
    color: WHITE,
    letterSpacing: 2,
    marginBottom: 28,
    textShadowColor: "rgba(0,0,0,0.18)",
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 12,
    elevation: 2,
  },
  progressBarBackground: {
    height: 12,
    width: width * 0.7,
    backgroundColor: "rgba(255,255,255,0.29)",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 26,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.15)",
  },
  progressBarFill: {
    height: 12,
    backgroundColor: WHITE,
    borderRadius: 8,
  },
  stepText: {
    fontSize: 16,
    color: WHITE,
    fontWeight: "500",
    marginBottom: 24,
    textAlign: "center",
    minHeight: 28,
    textShadowColor: "rgba(0,0,0,0.07)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  footer: {
    position: "absolute",
    bottom: 24,
    fontSize: 13,
    color: "rgba(255,255,255,0.75)",
    letterSpacing: 1.1,
  },
});