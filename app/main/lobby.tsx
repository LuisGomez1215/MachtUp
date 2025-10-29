import { useLocalSearchParams, useRouter } from 'expo-router';
import { ArrowLeft } from 'lucide-react-native';
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function LobbyScreen() {
  const router = useRouter();
  const { sportName, sportIcon, gameMode } = useLocalSearchParams();

  const [friends] = useState([
    { id: 1, name: 'Juan Pérez', status: 'online' },
    { id: 2, name: 'María González', status: 'offline' },
    { id: 3, name: 'Pedro Sánchez', status: 'online' },
    { id: 4, name: 'Ana López', status: 'online' },
  ]);

  const handleSearchMatch = () => {
    console.log('🎮 Navegando a searching con:', {
      sport: sportName,
      mode: gameMode,
      icon: sportIcon,
    });

    router.push({
      pathname: '/main/searching',
      params: {
        sport: sportName as string,    // ✅ Usar sportName
        mode: gameMode as string,      // ✅ Usar gameMode
        icon: sportIcon as string,     // ✅ Usar sportIcon
      }
    });
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
            <Text style={styles.headerTitle}>Lobby {gameMode}</Text>
            <Text style={styles.headerSubtitle}>{sportName}</Text>
          </View>
        </View>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Tu equipo</Text>
          <View style={styles.playerCard}>
            <View style={styles.playerInfo}>
              <View style={styles.avatarSelf}>
                <Text style={styles.avatarText}>👤</Text>
              </View>
              <View>
                <Text style={styles.playerName}>Tú</Text>
                <Text style={styles.playerStatus}>Listo para jugar</Text>
              </View>
            </View>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleSearchMatch}
          style={styles.searchButton}
        >
          <Text style={styles.searchButtonText}>Buscar Partida</Text>
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
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#bbf7d0',
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 16,
  },
  playerCard: {
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#bbf7d0',
  },
  friendCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#f0fdf4',
    borderRadius: 12,
    padding: 12,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginTop: 12,
  },
  playerInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avatarSelf: {
    width: 48,
    height: 48,
    backgroundColor: '#09C82C',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    backgroundColor: '#d1d5db',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 20,
  },
  playerName: {
    fontWeight: '600',
    color: '#03440F',
  },
  playerStatus: {
    fontSize: 14,
    color: '#6b7280',
    marginTop: 2,
  },
  inviteButton: {
    backgroundColor: '#09C82C',
    padding: 8,
    borderRadius: 8,
  },
  searchButton: {
    backgroundColor: '#09C82C',
    padding: 16,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 24,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 20,
  },
});