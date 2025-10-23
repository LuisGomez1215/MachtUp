import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SearchingScreen() {
  const router = useRouter();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            router.replace('/(tabs)/chat');
          }, 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.icon}>🔍</Text>
        <Text style={styles.title}>Buscando jugadores...</Text>
        <Text style={styles.subtitle}>Encontrando el partido perfecto para ti</Text>
        
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBar, { width: `${progress}%` }]} />
        </View>
        
        <Text style={styles.progressText}>{progress}%</Text>

        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.cancelButton}
        >
          <Text style={styles.cancelButtonText}>Cancelar búsqueda</Text>
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
    alignItems: 'center',
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  icon: {
    fontSize: 64,
    marginBottom: 24,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    color: '#6b7280',
    marginBottom: 24,
    textAlign: 'center',
  },
  progressBarContainer: {
    width: '100%',
    height: 16,
    backgroundColor: '#e5e7eb',
    borderRadius: 999,
    marginBottom: 24,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#09C82C',
    borderRadius: 999,
  },
  progressText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#09C82C',
    marginBottom: 32,
  },
  cancelButton: {
    width: '100%',
    backgroundColor: '#e5e7eb',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
});