import React, { useState, useContext } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
  Image,
  Animated,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { AuthContext } from "../context/AuthContext";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

const ORANGE = "#FF9800";
const ORANGE_DARK = "#F57C00";
const BORDER = "#fff3e0";
const ERROR_COLOR = "#d32f2f";
const LOGO_URI = require("../assets/logo.png");

type LoginScreenNavigationProp = StackNavigationProp<RootStackParamList, "Login">;
type Props = { navigation: LoginScreenNavigationProp };

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secure, setSecure] = useState(true);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const [contactPressed, setContactPressed] = useState(false);
  const contactColor = useState(new Animated.Value(0))[0];

  const { login } = useContext(AuthContext);

  const onLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Vyplňte e-mail a heslo.");
      return;
    }
    setLoading(true);
    try {
      await login(email, password);
    } catch (e: any) {
      setError(e.message || "Přihlášení se nezdařilo.");
    }
    setLoading(false);
  };

  // Navigace na Registraci
  const onRegister = () => {
    navigation.navigate("Register");
  };

  const onForgot = () => {
    navigation.navigate("ForgotPassword");
  };

  const onContactPressIn = () => {
    setContactPressed(true);
    Animated.timing(contactColor, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  const onContactPressOut = () => {
    Animated.timing(contactColor, {
      toValue: 0,
      duration: 220,
      useNativeDriver: false,
    }).start(() => setContactPressed(false));
  };

  const contactTextColor = contactColor.interpolate({
    inputRange: [0, 1],
    outputRange: [ORANGE_DARK, "#a43c00"],
  });

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: ORANGE }}>
      <KeyboardAvoidingView
        style={styles.wrapper}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.card}>
          <View style={styles.logoCircle}>
            <Image source={LOGO_URI} style={styles.logo} resizeMode="contain" />
          </View>
          <Text style={styles.title}>Přihlášení</Text>
          <Text style={styles.subtitle}>Vítejte zpět do BBS Detailing!</Text>
          <TextInput
            style={styles.input}
            placeholder="E-mail"
            placeholderTextColor="#bdbdbd"
            value={email}
            onChangeText={setEmail}
            autoCapitalize="none"
            keyboardType="email-address"
            returnKeyType="next"
          />
          <View style={{ width: "100%", marginBottom: 12 }}>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0, paddingRight: 40 }]}
                placeholder="Heslo"
                placeholderTextColor="#bdbdbd"
                value={password}
                onChangeText={setPassword}
                secureTextEntry={secure}
                autoCapitalize="none"
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setSecure((s) => !s)}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeIcon}>{secure ? "🙈" : "👁"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={onLogin}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Přihlásit se</Text>
            )}
          </TouchableOpacity>
          {/* REGISTRACE */}
          <View style={styles.registerBox}>
            <Text style={styles.registerText}>Nemáte účet?</Text>
            <TouchableOpacity onPress={onRegister} activeOpacity={0.82}>
              <Text style={styles.registerLink}>Zaregistrujte se</Text>
            </TouchableOpacity>
          </View>
          {/* ZAPOMENUTÉ HESLO */}
          <TouchableOpacity
            onPress={onForgot}
            style={styles.contactBtn}
            activeOpacity={0.7}
          >
          <Text style={styles.footerLink}>Zapomněli jste heslo?</Text>
          </TouchableOpacity>
        </View>
        {/* Copyright dole bílý */}
        <Text style={styles.footerCopyright}>
          © {new Date().getFullYear()} BBS Detailing
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

// ...styles (beze změny)
const styles = StyleSheet.create({
  // ...předešlé styly
  wrapper: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 18,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.11,
    shadowRadius: 22,
    shadowOffset: { width: 0, height: 10 },
    elevation: 10,
  },
  logoCircle: {
    backgroundColor: "#fff",
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
    shadowColor: ORANGE_DARK,
    shadowOpacity: 0.22,
    shadowRadius: 18,
    shadowOffset: { width: 0, height: 6 },
  },
  logo: {
    width: 92,
    height: 92,
    borderRadius: 20,
  },
  title: {
    fontWeight: "bold",
    fontSize: 26,
    color: ORANGE_DARK,
    marginBottom: 8,
    textAlign: "center",
  },
  subtitle: {
    color: "#888",
    fontSize: 15,
    marginBottom: 28,
    textAlign: "center",
  },
  input: {
    width: "100%",
    backgroundColor: "#fff7eb",
    borderWidth: 1.2,
    borderColor: BORDER,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 16,
    marginBottom: 12,
    color: "#222",
    shadowColor: ORANGE,
    shadowOpacity: 0.07,
    shadowRadius: 7,
    shadowOffset: { width: 0, height: 2 },
  },
  passwordRow: {
    flexDirection: "row",
    alignItems: "center",
    position: "relative",
  },
  eyeButton: {
    position: "absolute",
    right: 8,
    top: 0,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    width: 36,
    zIndex: 2,
  },
  eyeIcon: {
    fontSize: 23,
    color: "#888",
    textAlign: "center",
    textAlignVertical: "center",
  },
  error: {
    color: ERROR_COLOR,
    marginBottom: 14,
    fontWeight: "500",
    textAlign: "center",
  },
  button: {
    width: "100%",
    backgroundColor: ORANGE,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 6,
    marginBottom: 18,
    shadowColor: ORANGE_DARK,
    shadowOpacity: 0.24,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 8 },
    elevation: 7,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 17,
    letterSpacing: 0.5,
  },
  registerBox: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    marginTop: -4,
    backgroundColor: "#fff7eb",
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ffecb3",
    shadowColor: ORANGE,
    shadowOpacity: 0.04,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 1 },
  },
  registerText: {
    fontSize: 15,
    color: "#888",
    marginRight: 6,
  },
  registerLink: {
    color: ORANGE_DARK,
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    letterSpacing: 0.2,
  },
  contactBtn: {
    alignSelf: "center",
    marginTop: 8,
  },
  footerLink: {
    color: "#F57C00",
    fontWeight: "bold",
    fontSize: 16,
    textDecorationLine: "underline",
    letterSpacing: 0.2,
    textAlign: "center",
  },
  footerCopyright: {
    position: "absolute",
    bottom: 20,
    alignSelf: "center",
    fontSize: 13,
    color: "#fff",
    letterSpacing: 1.1,
  },
});

export default LoginScreen;