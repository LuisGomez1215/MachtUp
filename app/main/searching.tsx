import { router, useLocalSearchParams } from 'expo-router';
import { useEffect, useRef, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuth } from '../../contexts/AuthContext';
import {
  findOrCreateLobby,
  leaveLobby,
  Lobby,
  subscribeLobby
} from '../../services/lobbyService';
import { Coordinates, getCurrentLocation } from '../../services/locationService';

const SEARCH_PHASES = [
  { radius: 5, duration: 30000, label: 'Buscando a 5km' },
  { radius: 8, duration: 20000, label: 'Expandiendo a 8km' },
  { radius: 15, duration: 20000, label: 'Expandiendo a 15km' },
  { radius: 50, duration: 15000, label: 'Buscando en Región Metropolitana' },
];

export default function SearchingScreen() {
  const { sport, mode, icon } = useLocalSearchParams();
  const { user, userData } = useAuth();
  
  const [lobby, setLobby] = useState<Lobby | null>(null);
  const [loading, setLoading] = useState(true);
  const [searching, setSearching] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [progress, setProgress] = useState(0);
  const [userLocation, setUserLocation] = useState<Coordinates | null>(null);
  
  const unsubscribeRef = useRef<(() => void) | null>(null);
  const phaseTimerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    initializeSearch();
    
    return () => {
      // Cleanup cuando se desmonta el componente o se cierra la app
      const cleanupOnExit = async () => {
        if (lobby && user) {
          await leaveLobby(lobby.id, user.uid);
        }
        cleanup();
      };
      
      cleanupOnExit();
    };
  }, [lobby, user]);

  const initializeSearch = async () => {
    if (!user || !userData) {
      Alert.alert('Error', 'Usuario no autenticado o datos incompletos');
      router.back();
      return;
    }

    // Validar parámetros
    if (!sport || !mode || !icon) {
      Alert.alert('Error', 'Faltan parámetros del partido');
      router.back();
      return;
    }

    console.log('📍 Iniciando búsqueda con:', { sport, mode, icon });
    console.log('👤 Usuario:', { uid: user.uid, name: userData.name });

    // Obtener ubicación
    const location = await getCurrentLocation();
    
    if (!location) {
      Alert.alert(
        'Ubicación requerida',
        'Necesitamos tu ubicación para encontrar jugadores cercanos',
        [{ text: 'OK', onPress: () => router.back() }]
      );
      return;
    }

    setUserLocation(location);
    await joinLobby(location);
    startSearchPhases();
  };

  const joinLobby = async (location: Coordinates) => {
    if (!user || !userData) {
      Alert.alert('Error', 'Datos de usuario no disponibles');
      router.back();
      return;
    }

    try {
      console.log('🎯 Creando lobby con:', {
        sport,
        mode,
        icon,
        userId: user.uid,
        userName: userData.name,
        userPhone: userData.phone,
      });

      const newLobby = await findOrCreateLobby(
        sport as string,
        mode as string,
        icon as string,
        {
          id: user.uid,
          nombre: userData.name || 'Usuario',
          telefono: userData.phone || '',
          joinedAt: Date.now(),
          location,
        },
        location
      );

      console.log('✅ Lobby creado/unido:', newLobby.id);
      setLobby(newLobby);

      // Suscribirse a cambios en tiempo real
      unsubscribeRef.current = subscribeLobby(newLobby.id, handleLobbyUpdate);

      // Verificar si ya está completo
      if (newLobby.estado === 'completo') {
        handleMatchFound(newLobby);
      }
    } catch (error) {
      console.error('Error joining lobby:', error);
      Alert.alert('Error', 'No se pudo unir al lobby: ' + (error as Error).message);
      router.back();
    } finally {
      setLoading(false);
    }
  };

  const startSearchPhases = () => {
    runPhase(0);
  };

  const runPhase = (phaseIndex: number) => {
    if (phaseIndex >= SEARCH_PHASES.length) {
      // No se encontró partida después de todas las fases
      handleNoMatchFound();
      return;
    }

    setCurrentPhase(phaseIndex);
    setProgress(0);

    const phase = SEARCH_PHASES[phaseIndex];
    const startTime = Date.now();

    // Actualizar progreso
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const newProgress = Math.min((elapsed / phase.duration) * 100, 100);
      setProgress(newProgress);

      if (newProgress >= 100) {
        clearInterval(progressIntervalRef.current!);
      }
    }, 100);

    // Timer para pasar a la siguiente fase
    phaseTimerRef.current = setTimeout(() => {
      if (searching) {
        runPhase(phaseIndex + 1);
      }
    }, phase.duration);
  };

  const handleLobbyUpdate = (updatedLobby: Lobby | null) => {
    if (!updatedLobby) {
      // El lobby fue eliminado
      Alert.alert('Error', 'El lobby fue cerrado');
      router.back();
      return;
    }

    setLobby(updatedLobby);

    // Verificar si se completó
    if (updatedLobby.estado === 'completo' && searching) {
      handleMatchFound(updatedLobby);
    }
  };

  const handleMatchFound = (completedLobby: Lobby) => {
    setSearching(false);
    setProgress(100);
    cleanup();

    // Esperar 2 segundos antes de redirigir
    setTimeout(() => {
      router.replace({
        pathname: '/(tabs)/chat',
        params: {
          lobbyId: completedLobby.id,
          sport: completedLobby.deporte,
          mode: completedLobby.modalidad,
          icon: completedLobby.icon,
        },
      });
    }, 2000);
  };

  const handleNoMatchFound = () => {
    setSearching(false);
    cleanup();

    Alert.alert(
      'Sin resultados',
      'No se encontraron jugadores disponibles. ¿Quieres intentar de nuevo?',
      [
        { text: 'Cancelar', onPress: () => router.back() },
        {
          text: 'Reintentar',
          onPress: () => {
            setSearching(true);
            setProgress(0);
            setCurrentPhase(0);
            startSearchPhases();
          },
        },
      ]
    );
  };

  const cleanup = () => {
    if (phaseTimerRef.current) {
      clearTimeout(phaseTimerRef.current);
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
    }
    if (unsubscribeRef.current) {
      unsubscribeRef.current();
    }
  };

  const handleCancel = async () => {
    // Salir del lobby sin confirmación
    if (lobby && user) {
      await leaveLobby(lobby.id, user.uid);
    }
    cleanup();
    router.back();
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#09C82C" />
        <Text style={styles.loadingText}>Obteniendo ubicación...</Text>
      </View>
    );
  }

  const currentPhaseData = SEARCH_PHASES[currentPhase];
  const playersFound = lobby?.jugadores.length || 0;
  const maxPlayers = lobby?.maxJugadores || 0;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.icon}>🔍</Text>
        
        <Text style={styles.title}>
          {searching ? 'Buscando jugadores...' : '¡Partido encontrado! 🎉'}
        </Text>
        
        {searching && (
          <Text style={styles.subtitle}>
            {currentPhaseData.label}
          </Text>
        )}

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>{Math.round(progress)}%</Text>
        </View>

        <View style={styles.playersInfo}>
          <Text style={styles.playersText}>
            {playersFound}/{maxPlayers} jugadores
          </Text>
        </View>

        {searching && (
          <TouchableOpacity 
            style={styles.cancelButtonContainer} 
            onPress={handleCancel}
          >
            <Text style={styles.cancelButton}>
              Cancelar búsqueda
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  icon: {
    fontSize: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03440F',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  progressContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    width: '100%',
    height: 12,
    backgroundColor: '#e5e7eb',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 10,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#09C82C',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#03440F',
  },
  playersInfo: {
    backgroundColor: '#dcfce7',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 20,
  },
  playersText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#03440F',
  },
  cancelButtonContainer: {
    marginTop: 30,
  },
  cancelButton: {
    fontSize: 16,
    color: '#ef4444',
    textDecorationLine: 'underline',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});