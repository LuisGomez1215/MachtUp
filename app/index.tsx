import { useEffect } from 'react';
import { Redirect } from 'expo-router';
import { ActivityIndicator, View } from 'react-native';
import { useAuth } from '../contexts/AuthContext';

export default function Index() {
  const { user, loading } = useAuth();

  // Mostrar loading mientras verifica la autenticación
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#09C82C' }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    );
  }

  // Si hay usuario autenticado, ir a home, si no, ir a login
  return <Redirect href={user ? "/(tabs)/home" : "/auth/login"} />;
}