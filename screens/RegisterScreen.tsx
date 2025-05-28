import React, { useState } from "react";
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
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

// Barvy
const ORANGE = "#FF9800";
const ORANGE_DARK = "#F57C00";
const BORDER = "#fff3e0";
const ERROR_COLOR = "#d32f2f";
const SUCCESS_COLOR = "#388e3c";
const LOGO_URI = require("../assets/logo.png");

type RegisterScreenNavigationProp = StackNavigationProp<RootStackParamList, "Register">;
type Props = { navigation: RegisterScreenNavigationProp };

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [jmeno, setJmeno] = useState("");
  const [password, setPassword] = useState("");
  const [passwordAgain, setPasswordAgain] = useState("");
  const [secure, setSecure] = useState(true);
  const [secureAgain, setSecureAgain] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);

  // Animace pro "Již máte účet?"
  const [loginPressed, setLoginPressed] = useState(false);
  const loginColor = useState(new Animated.Value(0))[0];

  // Navigace na Login
  const onLogin = () => {
    navigation.navigate("Login");
  };

  // Handler pro registraci
  const onRegister = async () => {
    setError("");
    setSuccess("");
    if (!email || !jmeno || !password || !passwordAgain) {
      setError("Vyplňte všechna pole.");
      return;
    }
    if (!email.includes("@") || email.length < 5) {
      setError("Zadejte platný e-mail.");
      return;
    }
    if (password.length < 6) {
      setError("Heslo musí mít alespoň 6 znaků.");
      return;
    }
    if (password !== passwordAgain) {
      setError("Hesla se neshodují.");
      return;
    }
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      setSuccess("Registrace byla úspěšná! Nyní se můžete přihlásit.");
      setEmail("");
      setJmeno("");
      setPassword("");
      setPasswordAgain("");
    }, 1200);
  };

  // Animace pro "Přihlásit se"
  const onLoginPressIn = () => {
    setLoginPressed(true);
    Animated.timing(loginColor, {
      toValue: 1,
      duration: 120,
      useNativeDriver: false,
    }).start();
  };

  const onLoginPressOut = () => {
    Animated.timing(loginColor, {
      toValue: 0,
      duration: 220,
      useNativeDriver: false,
    }).start(() => setLoginPressed(false));
  };

  const loginTextColor = loginColor.interpolate({
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
          <Text style={styles.title}>Registrace</Text>
          <Text style={styles.subtitle}>Vytvořte si účet do BBS Detailing</Text>
          <TextInput
            style={styles.input}
            placeholder="Jméno a příjmení"
            placeholderTextColor="#bdbdbd"
            value={jmeno}
            onChangeText={setJmeno}
            autoCapitalize="words"
            returnKeyType="next"
          />
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
                returnKeyType="next"
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
          <View style={{ width: "100%", marginBottom: 12 }}>
            <View style={styles.passwordRow}>
              <TextInput
                style={[styles.input, { flex: 1, marginBottom: 0, paddingRight: 40 }]}
                placeholder="Zadejte heslo znovu"
                placeholderTextColor="#bdbdbd"
                value={passwordAgain}
                onChangeText={setPasswordAgain}
                secureTextEntry={secureAgain}
                autoCapitalize="none"
                returnKeyType="done"
              />
              <TouchableOpacity
                style={styles.eyeButton}
                onPress={() => setSecureAgain((s) => !s)}
                activeOpacity={0.7}
              >
                <Text style={styles.eyeIcon}>{secureAgain ? "🙈" : "👁"}</Text>
              </TouchableOpacity>
            </View>
          </View>
          {error ? <Text style={styles.error}>{error}</Text> : null}
          {success ? <Text style={styles.success}>{success}</Text> : null}
          <TouchableOpacity
            style={[styles.button, loading && { opacity: 0.7 }]}
            onPress={onRegister}
            disabled={loading}
            activeOpacity={0.9}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Registrovat se</Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPressIn={onLoginPressIn}
            onPressOut={onLoginPressOut}
            onPress={onLogin}
            activeOpacity={1}
            style={styles.loginBtn}
          >
            <Animated.Text style={[styles.loginLink, { color: loginTextColor }]}>
              Již máte účet? Přihlaste se
            </Animated.Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.footerCopyright}>
          © {new Date().getFullYear()} BBS Detailing
        </Text>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
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
    marginBottom: 10,
    fontWeight: "500",
    textAlign: "center",
  },
  success: {
    color: SUCCESS_COLOR,
    marginBottom: 10,
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
  loginBtn: {
    alignSelf: "center",
    marginTop: 8,
  },
  loginLink: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
    letterSpacing: 0.2,
    color: ORANGE_DARK,
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

export default RegisterScreen;