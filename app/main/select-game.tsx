import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft, Users } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SelectGameScreen() {
  const router = useRouter();
  const { mode } = useLocalSearchParams();

  const sports = [
    { id: 'futbol', name: 'Fútbol', icon: '⚽', modes: ['5v5', '7v7', '11v11'] },
    { id: 'basket', name: 'Basket', icon: '🏀', modes: ['3v3', '5v5'] },
    { id: 'voleibol', name: 'Voleibol', icon: '🏐', modes: ['6v6'] }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <ArrowLeft size={20} color="white" />
          <Text style={styles.backButtonText}>Volver</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Elige tu deporte</Text>
        <Text style={styles.headerSubtitle}>
          Partida {mode === 'rapida' ? 'Rápida' : 'MatchUp'}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {sports.map(sport => (
          <TouchableOpacity
            key={sport.id}
            onPress={() => router.push({
              pathname: '/main/select-mode',
              params: { 
                sportId: sport.id,
                sportName: sport.name,
                sportIcon: sport.icon,
                sportModes: JSON.stringify(sport.modes),
                mode 
              }
            })}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View style={styles.cardInfo}>
                <Text style={styles.cardIcon}>{sport.icon}</Text>
                <View>
                  <Text style={styles.cardTitle}>{sport.name}</Text>
                  <Text style={styles.cardSubtitle}>{sport.modes.join(', ')}</Text>
                </View>
              </View>
              <Users size={32} color="#09C82C" />
            </View>
          </TouchableOpacity>
        ))}
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
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'flex-start',
  },
  backButtonText: {
    color: 'white',
    fontWeight: '600',
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
  scrollView: {
    flex: 1,
    padding: 24,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
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
});