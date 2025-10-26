import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { Search } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function HomeScreen() {
  const router = useRouter();
  const { userData } = useAuth();

  // Obtener primer nombre del usuario
  const firstName = userData?.name.split(' ')[0] || 'Usuario';

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.headerTitle}>MatchUp</Text>
          <Text style={styles.headerSubtitle}>¡Hola, {firstName}!</Text>
        </View>
      </View>

      <Text style={styles.sectionTitle}>Selecciona tipo de partida</Text>

      <ScrollView style={styles.scrollView}>
        <TouchableOpacity
          onPress={() => router.push('/main/select-game?mode=rapida')}
          style={styles.card}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardIcon}>⚡</Text>
              <View>
                <Text style={styles.cardTitle}>Partida Rápida</Text>
                <Text style={styles.cardSubtitle}>Encuentra un partido ahora</Text>
              </View>
            </View>
            <Search size={32} color="#09C82C" />
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          disabled
          style={[styles.card, styles.cardDisabled]}
        >
          <View style={styles.cardContent}>
            <View style={styles.cardInfo}>
              <Text style={styles.cardIcon}>🏆</Text>
              <View>
                <Text style={[styles.cardTitle, styles.textDisabled]}>Partida MatchUp</Text>
                <Text style={[styles.cardSubtitle, styles.textDisabled]}>Próximamente...</Text>
              </View>
            </View>
            <View style={styles.badge}>
              <Text style={styles.badgeText}>Pronto</Text>
            </View>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  header: {
    backgroundColor: '#09C82C',
    padding: 24,
    paddingTop: 50,
    paddingBottom: 32,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    color: '#dcfce7',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: 'white',
    backgroundColor: '#09C82C',
    paddingHorizontal: 24,
    paddingBottom: 16,
  },
  scrollView: {
    flex: 1,
    padding: 24,
    marginTop: -24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardDisabled: {
    backgroundColor: '#e5e7eb',
    borderColor: '#d1d5db',
    opacity: 0.7,
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  cardIcon: {
    fontSize: 48,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03440F',
  },
  cardSubtitle: {
    color: '#6b7280',
    marginTop: 4,
  },
  textDisabled: {
    color: '#9ca3af',
  },
  badge: {
    backgroundColor: '#d1d5db',
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
  },
  badgeText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 12,
  },
}); 