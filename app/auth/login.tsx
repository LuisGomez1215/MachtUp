import { useRouter } from 'expo-router';
import { LogIn } from 'lucide-react-native';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Aquí irá la lógica de Firebase después
    console.log('Login:', email, password);
    
    // Por ahora, navega directo a home
    router.replace('/main/home');
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
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
          <LogIn size={20} color="white" />
          <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.push('/auth/register')}>
          <Text style={styles.link}>¿No tienes cuenta? Regístrate</Text>
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
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    alignItems: 'center',
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
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    width: '100%',
    padding: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 16,
  },
  button: {
    width: '100%',
    backgroundColor: '#09C82C',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 16,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
  link: {
    color: '#09C82C',
    fontWeight: '600',
  },
});