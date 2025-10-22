import { useRouter } from 'expo-router';
import { UserPlus } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function RegisterScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    nombre: '',
    edad: '',
    email: '',
    telefono: '',
    password: '',
    confirmPassword: '',
  });

  const handleRegister = () => {
    // Validaciones
    if (formData.password !== formData.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    // Aquí irá Firebase Auth después
    console.log('Registro:', formData);
    router.replace('/main/home');
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.card}>
        <Text style={styles.icon}>🏆</Text>
        <Text style={styles.title}>Crear Cuenta</Text>
        <Text style={styles.subtitle}>Únete a MatchUp</Text>

        <TextInput
          placeholder="Nombre completo"
          value={formData.nombre}
          onChangeText={(text) => setFormData({ ...formData, nombre: text })}
          style={styles.input}
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Edad"
          value={formData.edad}
          onChangeText={(text) => setFormData({ ...formData, edad: text })}
          style={styles.input}
          keyboardType="numeric"
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Email"
          value={formData.email}
          onChangeText={(text) => setFormData({ ...formData, email: text })}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Teléfono"
          value={formData.telefono}
          onChangeText={(text) => setFormData({ ...formData, telefono: text })}
          style={styles.input}
          keyboardType="phone-pad"
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Contraseña"
          value={formData.password}
          onChangeText={(text) => setFormData({ ...formData, password: text })}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#9ca3af"
        />

        <TextInput
          placeholder="Confirmar contraseña"
          value={formData.confirmPassword}
          onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
          style={styles.input}
          secureTextEntry
          placeholderTextColor="#9ca3af"
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <UserPlus size={20} color="white" />
          <Text style={styles.buttonText}>Crear Cuenta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.link}>¿Ya tienes cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#09C82C',
  },
  contentContainer: {
    padding: 24,
    paddingTop: 60,
    paddingBottom: 40,
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