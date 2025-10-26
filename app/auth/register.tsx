// app/auth/register.tsx
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import { registerUser } from '../../services/authService';

export default function RegisterScreen() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = async () => {
    setLoading(true);
    try {
      const result = await registerUser(formData);
      
      if (result.success) {
        router.replace('/(tabs)/home');
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('Error al registrar usuario');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <KeyboardAvoidingView 
        style={styles.keyboardView}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Header */}
            <View style={styles.header}>
              <Text style={styles.icon}>🏆</Text>
              <Text style={styles.title}>Crear Cuenta</Text>
              <Text style={styles.subtitle}>Únete a MatchUp</Text>
            </View>

            {/* Formulario */}
            <View style={styles.inputContainer}>
              {/* Nombre */}
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="rgba(255, 255, 255, 0.97)"
                value={formData.name}
                onChangeText={(text) => setFormData({ ...formData, name: text })}
                autoCapitalize="words"
                editable={!loading}
              />

              {/* Edad y Teléfono en la misma fila */}
              <View style={styles.row}>
                <TextInput
                  style={[styles.input, styles.ageInput]}
                  placeholder="Edad"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.age}
                  onChangeText={(text) => setFormData({ ...formData, age: text })}
                  keyboardType="number-pad"
                  maxLength={3}
                  editable={!loading}
                />

                <TextInput
                  style={[styles.input, styles.phoneInput]}
                  placeholder="Teléfono"
                  placeholderTextColor="rgba(255, 255, 255, 0.6)"
                  value={formData.phone}
                  onChangeText={(text) => setFormData({ ...formData, phone: text })}
                  keyboardType="phone-pad"
                  editable={!loading}
                />
              </View>

              {/* Email */}
              <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={formData.email}
                onChangeText={(text) => setFormData({ ...formData, email: text })}
                keyboardType="email-address"
                autoCapitalize="none"
                editable={!loading}
              />

              {/* Contraseña */}
              <TextInput
                style={styles.input}
                placeholder="Contraseña (mín. 6 caracteres)"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={formData.password}
                onChangeText={(text) => setFormData({ ...formData, password: text })}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
              />

              {/* Confirmar Contraseña */}
              <TextInput
                style={styles.input}
                placeholder="Confirmar contraseña"
                placeholderTextColor="rgba(255, 255, 255, 0.6)"
                value={formData.confirmPassword}
                onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
                secureTextEntry
                autoCapitalize="none"
                editable={!loading}
              />
            </View>

            {/* Botón de Registro */}
            <TouchableOpacity 
              style={[styles.button, loading && styles.buttonDisabled]}
              onPress={handleRegister}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#22c55e" />
              ) : (
                <>
                  <UserPlus size={20} color="#22c55e" />
                  <Text style={styles.buttonText}>Crear Cuenta</Text>
                </>
              )}
            </TouchableOpacity>

            {/* Link a Login */}
            <TouchableOpacity 
              onPress={() => router.push('/auth/login')}
              disabled={loading}
            >
              <Text style={styles.linkText}>
                ¿Ya tienes cuenta?{' '}
                <Text style={styles.linkBold}>Inicia sesión aquí</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#22c55e',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
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
    marginBottom: 24,
  },
  icon: {
    fontSize: 48,
    marginBottom: 12,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 4,
  },
  subtitle: {
    color: 'rgba(255, 255, 255, 0.9)',
    fontSize: 16,
  },
  inputContainer: {
    gap: 12,
    marginBottom: 20,
  },
  input: {
    padding: 14,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.7)',
    borderRadius: 12,
    fontSize: 16,
    backgroundColor: 'rgba(255, 255, 255, 0.48)',
    color: 'white',
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  ageInput: {
    width: 80,
    textAlign: 'center',
  },
  phoneInput: {
    flex: 1,
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
    marginTop: 20,
    color: 'rgba(255, 255, 255, 0.9)',
  },
  linkBold: {
    color: 'white',
    fontWeight: '600',
  },
});