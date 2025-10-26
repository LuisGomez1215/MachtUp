// app/auth/login.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LogIn } from 'lucide-react-native';
import { loginUser } from '../../services/authService';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '' });

  const validateForm = () => {
    let valid = true;
    const newErrors = { email: '', password: '' };

    if (!email.trim()) {
      newErrors.email = 'El email es requerido';
      valid = false;
    } else if (!email.includes('@')) {
      newErrors.email = 'Email inválido';
      valid = false;
    }

    if (!password) {
      newErrors.password = 'La contraseña es requerida';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleLogin = async () => {
    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      const result = await loginUser(email.trim(), password);

      if (result.success) {
        Alert.alert('¡Bienvenido!', result.message);
        router.replace('/(tabs)/home');
      } else {
        Alert.alert('Error', result.message);
      }
    } catch (error) {
      Alert.alert('Error', 'Ocurrió un error inesperado');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.icon}>🏆</Text>
          <Text style={styles.title}>MatchUp</Text>
          <Text style={styles.subtitle}>Encuentra tu partido perfecto</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              placeholder="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setErrors({ ...errors, email: '' });
              }}
              style={[styles.input, errors.email ? styles.inputError : null]}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              keyboardType="email-address"
              autoCapitalize="none"
              editable={!loading}
            />
            {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
          </View>

          <View>
            <TextInput
              placeholder="Contraseña"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setErrors({ ...errors, password: '' });
              }}
              style={[styles.input, errors.password ? styles.inputError : null]}
              placeholderTextColor="rgba(255, 255, 255, 0.6)"
              secureTextEntry
              editable={!loading}
            />
            {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}
          </View>
        </View>

        <TouchableOpacity 
          onPress={handleLogin} 
          style={[styles.button, loading && styles.buttonDisabled]}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#22c55e" />
          ) : (
            <>
              <LogIn size={20} color="#22c55e" />
              <Text style={styles.buttonText}>Iniciar Sesión</Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => router.push('/auth/register')}
          disabled={loading}
        >
          <Text style={styles.linkText}>
            ¿No tienes cuenta?{' '}
            <Text style={styles.linkBold}>Regístrate aquí</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22c55e',
    justifyContent: 'center',
    padding: 24,
  },
  content: {
    width: '100%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  icon: {
    fontSize: 64,
    marginBottom: 16,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 8,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    padding: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    color: 'white',
  },
  inputError: {
    borderColor: '#ef4444',
  },
  errorText: {
    color: '#fecaca',
    fontSize: 12,
    marginTop: 4,
    marginLeft: 4,
  },
  button: {
    backgroundColor: 'white',
    padding: 14,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#22c55e',
    fontWeight: 'bold',
    fontSize: 18,
  },
  linkText: {
    textAlign: 'center',
    marginTop: 24,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  linkBold: {
    color: 'white',
    fontWeight: '600',
  },
});