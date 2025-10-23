<<<<<<< HEAD
// ==========================================
// FILE: app/auth/login.tsx
// ==========================================
=======
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
import { useRouter } from 'expo-router';
import { LogIn } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
<<<<<<< HEAD
    // Aquí irá la lógica de autenticación
    router.replace('/(tabs)/home');
=======
    // Aquí irá la lógica de Firebase después
    console.log('Login:', email, password);
    
    // Por ahora, navega directo a home
    router.replace('/main/home');
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
<<<<<<< HEAD
        <View style={styles.header}>
          <Text style={styles.icon}>🏆</Text>
          <Text style={styles.title}>MatchUp</Text>
          <Text style={styles.subtitle}>Encuentra tu partido perfecto</Text>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            placeholderTextColor="#9ca3af"
            keyboardType="email-address"
            autoCapitalize="none"
          />
          <TextInput
            placeholder="Contraseña"
            value={password}
            onChangeText={setPassword}
            style={styles.input}
            placeholderTextColor="#9ca3af"
            secureTextEntry
          />
        </View>

        <TouchableOpacity onPress={handleLogin} style={styles.button}>
=======
        <Text style={styles.icon}>🏆</Text>
        <Text style={styles.title}>MatchUp</Text>
        <Text style={styles.subtitle}>Inicia sesión para encontrar partidos</Text>

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Contraseña"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
          <LogIn size={20} color="white" />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
<<<<<<< HEAD
          <Text style={styles.linkText}>
            ¿No tienes cuenta?{' '}
            <Text style={styles.linkBold}>Regístrate aquí</Text>
          </Text>
=======
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09C82C',
    justifyContent: 'center',
<<<<<<< HEAD
    alignItems: 'center',
=======
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
<<<<<<< HEAD
    width: '100%',
    maxWidth: 400,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
=======
    alignItems: 'center',
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 8,
  },
  subtitle: {
    color: '#6b7280',
<<<<<<< HEAD
    fontSize: 16,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
=======
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
    padding: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
<<<<<<< HEAD
  },
  button: {
=======
    marginBottom: 16,
  },
  button: {
    width: '100%',
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
    backgroundColor: '#09C82C',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
<<<<<<< HEAD
=======
    marginBottom: 16,
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
<<<<<<< HEAD
  linkText: {
    textAlign: 'center',
    marginTop: 24,
    color: '#6b7280',
  },
  linkBold: {
=======
  link: {
>>>>>>> d1ce32923bf34ba8790dc04dd284779470907f3c
    color: '#09C82C',
    fontWeight: '600',
  },
});