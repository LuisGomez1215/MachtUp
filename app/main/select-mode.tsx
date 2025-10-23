import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SelectModeScreen() {
  const router = useRouter();
  const { sportId, sportName, sportIcon, sportModes, mode } = useLocalSearchParams();
  
  const modes = JSON.parse(sportModes as string);

  const getPlayers = (gameMode: string) => {
    const players: { [key: string]: string } = {
      '3v3': '6 jugadores',
      '5v5': '10 jugadores',
      '6v6': '12 jugadores',
      '7v7': '14 jugadores',
      '11v11': '22 jugadores'
    };
    return players[gameMode] || '10 jugadores';
  };

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
        <View style={styles.sportHeader}>
          <Text style={styles.sportIcon}>{sportIcon}</Text>
          <View>
            <Text style={styles.headerTitle}>{sportName}</Text>
            <Text style={styles.headerSubtitle}>Selecciona el formato</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        {modes.map((gameMode: string) => (
          <TouchableOpacity
            key={gameMode}
            onPress={() => router.push({
              pathname: '/main/lobby',
              params: {
                sportName,
                sportIcon,
                gameMode,
                mode
              }
            })}
            style={styles.card}
          >
            <View style={styles.cardContent}>
              <View>
                <Text style={styles.modeTitle}>{gameMode}</Text>
                <Text style={styles.modePlayers}>{getPlayers(gameMode)}</Text>
              </View>
              <View style={styles.badge}>
                <Text style={styles.badgeText}>Jugar</Text>
              </View>
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
  sportHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sportIcon: {
    fontSize: 48,
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
    padding: 32,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  cardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  modeTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03440F',
  },
  modePlayers: {
    color: '#6b7280',
    marginTop: 4,
  },
  badge: {
    backgroundColor: '#bbf7d0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  badgeText: {
    color: '#166534',
    fontWeight: 'bold',
  },
});