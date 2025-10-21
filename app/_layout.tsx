import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  TouchableOpacity, 
  TextInput, 
  ScrollView, 
  StyleSheet 
} from 'react-native';
import { 
  Users, 
  User, 
  Trophy, 
  Calendar, 
  Phone, 
  Mail, 
  ArrowLeft, 
  LogIn, 
  UserPlus 
} from 'lucide-react-native';

export default function MatchUpApp() {
  const [currentScreen, setCurrentScreen] = useState('auth');
  const [selectedSport, setSelectedSport] = useState<any>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchProgress, setSearchProgress] = useState(0);
  const [authMode, setAuthMode] = useState('login');
  
  const [userData] = useState({
    name: 'Carlos Rodríguez',
    age: 25,
    email: 'carlos@matchup.com',
    phone: '+56 9 1234 5678',
    matches: [
      { sport: 'Fútbol 11v11', date: '15 Oct 2025', result: 'Victoria' },
      { sport: 'Basket 5v5', date: '12 Oct 2025', result: 'Derrota' },
      { sport: 'Fútbol 7v7', date: '10 Oct 2025', result: 'Victoria' },
      { sport: 'Voleibol 6v6', date: '08 Oct 2025', result: 'Victoria' },
      { sport: 'Fútbol 5v5', date: '05 Oct 2025', result: 'Empate' }
    ]
  });

  const sports = [
    { 
      id: 'futbol', 
      name: 'Fútbol', 
      icon: '⚽',
      modes: ['5v5', '7v7', '11v11']
    },
    { 
      id: 'voleibol', 
      name: 'Voleibol', 
      icon: '🏐',
      modes: ['6v6']
    },
    { 
      id: 'basket', 
      name: 'Basket', 
      icon: '🏀',
      modes: ['3v3', '5v5']
    }
  ];

  useEffect(() => {
    if (isSearching) {
      const interval = setInterval(() => {
        setSearchProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 300);
      return () => clearInterval(interval);
    }
  }, [isSearching]);

  if (currentScreen === 'auth') {
    return (
      <View style={styles.authContainer}>
        <View style={styles.authCard}>
          <View style={styles.authHeader}>
            <Text style={styles.authIcon}>🏆</Text>
            <Text style={styles.authTitle}>MatchUp</Text>
            <Text style={styles.authSubtitle}>Encuentra tu partido perfecto</Text>
          </View>

          <View style={styles.tabContainer}>
            <TouchableOpacity
              onPress={() => setAuthMode('login')}
              style={[styles.tab, authMode === 'login' && styles.tabActive]}
            >
              <Text style={[styles.tabText, authMode === 'login' && styles.tabTextActive]}>
                Iniciar Sesión
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setAuthMode('register')}
              style={[styles.tab, authMode === 'register' && styles.tabActive]}
            >
              <Text style={[styles.tabText, authMode === 'register' && styles.tabTextActive]}>
                Registrarse
              </Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            {authMode === 'register' && (
              <TextInput
                placeholder="Nombre completo"
                style={styles.input}
                placeholderTextColor="#9ca3af"
              />
            )}
            <TextInput
              placeholder="Email"
              style={styles.input}
              placeholderTextColor="#9ca3af"
              keyboardType="email-address"
              autoCapitalize="none"
            />
            <TextInput
              placeholder="Contraseña"
              style={styles.input}
              placeholderTextColor="#9ca3af"
              secureTextEntry
            />
            {authMode === 'register' && (
              <>
                <TextInput
                  placeholder="Edad"
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                  keyboardType="numeric"
                />
                <TextInput
                  placeholder="Teléfono"
                  style={styles.input}
                  placeholderTextColor="#9ca3af"
                  keyboardType="phone-pad"
                />
              </>
            )}
          </View>

          <TouchableOpacity
            onPress={() => setCurrentScreen('home')}
            style={styles.authButton}
          >
            {authMode === 'login' ? <LogIn size={20} color="white" /> : <UserPlus size={20} color="white" />}
            <Text style={styles.authButtonText}>
              {authMode === 'login' ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (currentScreen === 'home') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.headerTitle}>MatchUp</Text>
            <Text style={styles.headerSubtitle}>¡Hola, {userData.name.split(' ')[0]}!</Text>
          </View>
          <TouchableOpacity
            onPress={() => setCurrentScreen('profile')}
            style={styles.profileButton}
          >
            <User size={24} color="white" />
          </TouchableOpacity>
        </View>

        <Text style={styles.sectionTitle}>Elige tu deporte</Text>

        <ScrollView style={styles.scrollView}>
          {sports.map(sport => (
            <TouchableOpacity
              key={sport.id}
              onPress={() => {
                setSelectedSport(sport);
                setCurrentScreen('selectMode');
              }}
              style={styles.sportCard}
            >
              <View style={styles.sportCardContent}>
                <View style={styles.sportInfo}>
                  <Text style={styles.sportIcon}>{sport.icon}</Text>
                  <View>
                    <Text style={styles.sportName}>{sport.name}</Text>
                    <Text style={styles.sportModes}>{sport.modes.join(', ')}</Text>
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

  if (currentScreen === 'selectMode') {
    return (
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            onPress={() => {
              setCurrentScreen('home');
              setSelectedSport(null);
            }}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="white" />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
          <View style={styles.sportHeader}>
            <Text style={styles.sportHeaderIcon}>{selectedSport?.icon}</Text>
            <View>
              <Text style={styles.sportHeaderTitle}>{selectedSport?.name}</Text>
              <Text style={styles.sportHeaderSubtitle}>Selecciona el formato</Text>
            </View>
          </View>
        </View>

        <ScrollView style={styles.scrollView}>
          {selectedSport?.modes.map((mode: string) => (
            <TouchableOpacity
              key={mode}
              onPress={() => {
                setCurrentScreen('searching');
                setIsSearching(true);
                setSearchProgress(0);
              }}
              style={styles.modeCard}
            >
              <View style={styles.modeCardContent}>
                <View>
                  <Text style={styles.modeTitle}>{mode}</Text>
                  <Text style={styles.modePlayers}>
                    {mode === '5v5' ? '10 jugadores' : 
                     mode === '7v7' ? '14 jugadores' : 
                     mode === '11v11' ? '22 jugadores' :
                     mode === '6v6' ? '12 jugadores' :
                     mode === '3v3' ? '6 jugadores' : '10 jugadores'}
                  </Text>
                </View>
                <View style={styles.searchBadge}>
                  <Text style={styles.searchBadgeText}>Buscar</Text>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    );
  }

  if (currentScreen === 'searching') {
    return (
      <View style={styles.searchContainer}>
        <View style={styles.searchCard}>
          <Text style={styles.searchIcon}>🔍</Text>
          <Text style={styles.searchTitle}>Buscando jugadores...</Text>
          <Text style={styles.searchSubtitle}>Encontrando el partido perfecto para ti</Text>
          
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: `${searchProgress}%` }]} />
          </View>
          
          <Text style={styles.progressText}>{searchProgress}%</Text>

          <TouchableOpacity
            onPress={() => {
              setIsSearching(false);
              setSearchProgress(0);
              setCurrentScreen('home');
            }}
            style={styles.cancelButton}
          >
            <Text style={styles.cancelButtonText}>Cancelar búsqueda</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  if (currentScreen === 'profile') {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          <TouchableOpacity
            onPress={() => setCurrentScreen('home')}
            style={styles.backButton}
          >
            <ArrowLeft size={24} color="white" />
            <Text style={styles.backButtonText}>Volver</Text>
          </TouchableOpacity>
          <View style={styles.profileInfo}>
            <View style={styles.profileAvatar}>
              <Text style={styles.profileAvatarText}>👤</Text>
            </View>
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileAge}>{userData.age} años</Text>
          </View>
        </View>

        <ScrollView style={styles.profileScrollView}>
          <View style={styles.profileCard}>
            <View style={styles.cardHeader}>
              <User size={20} color="#09C82C" />
              <Text style={styles.cardTitle}>Información de contacto</Text>
            </View>
            <View style={styles.contactInfo}>
              <View style={styles.contactItem}>
                <Mail size={18} color="#09C82C" />
                <Text style={styles.contactText}>{userData.email}</Text>
              </View>
              <View style={styles.contactItem}>
                <Phone size={18} color="#079C23" />
                <Text style={styles.contactText}>{userData.phone}</Text>
              </View>
            </View>
          </View>

          <View style={styles.profileCard}>
            <View style={styles.cardHeader}>
              <Trophy size={20} color="#facc15" />
              <Text style={styles.cardTitle}>Historial de partidos</Text>
            </View>
            {userData.matches.map((match, index) => (
              <View key={index} style={styles.matchItem}>
                <View style={styles.matchInfo}>
                  <Calendar size={18} color="#09C82C" />
                  <View style={styles.matchDetails}>
                    <Text style={styles.matchSport}>{match.sport}</Text>
                    <Text style={styles.matchDate}>{match.date}</Text>
                  </View>
                </View>
                <View style={[
                  styles.matchBadge,
                  match.result === 'Victoria' && styles.matchBadgeWin,
                  match.result === 'Derrota' && styles.matchBadgeLose
                ]}>
                  <Text style={[
                    styles.matchBadgeText,
                    match.result === 'Victoria' && styles.matchBadgeTextWin,
                    match.result === 'Derrota' && styles.matchBadgeTextLose
                  ]}>{match.result}</Text>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }

  return null;
}

const styles = StyleSheet.create({
  authContainer: {
    flex: 1,
    backgroundColor: '#09C82C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  authCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
  },
  authHeader: {
    alignItems: 'center',
    marginBottom: 32,
  },
  authIcon: {
    fontSize: 64,
    marginBottom: 16,
  },
  authTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 8,
  },
  authSubtitle: {
    color: '#6b7280',
  },
  tabContainer: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 24,
  },
  tab: {
    flex: 1,
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#e5e7eb',
    alignItems: 'center',
  },
  tabActive: {
    backgroundColor: '#09C82C',
  },
  tabText: {
    fontWeight: '600',
    color: '#6b7280',
  },
  tabTextActive: {
    color: 'white',
  },
  inputContainer: {
    gap: 16,
    marginBottom: 24,
  },
  input: {
    padding: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  authButton: {
    backgroundColor: '#09C82C',
    padding: 12,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  authButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 18,
  },
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
  profileButton: {
    position: 'absolute',
    right: 24,
    top: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    padding: 12,
    borderRadius: 50,
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
  sportCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  sportCardContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  sportInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  sportIcon: {
    fontSize: 48,
  },
  sportName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#03440F',
  },
  sportModes: {
    color: '#6b7280',
    marginTop: 4,
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
  sportHeaderIcon: {
    fontSize: 48,
  },
  sportHeaderTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  sportHeaderSubtitle: {
    color: '#dcfce7',
    marginTop: 4,
  },
  modeCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 32,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  modeCardContent: {
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
  searchBadge: {
    backgroundColor: '#bbf7d0',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 999,
  },
  searchBadgeText: {
    color: '#166534',
    fontWeight: 'bold',
  },
  searchContainer: {
    flex: 1,
    backgroundColor: '#09C82C',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  searchCard: {
    backgroundColor: 'white',
    borderRadius: 24,
    padding: 32,
    width: '100%',
    maxWidth: 400,
    alignItems: 'center',
  },
  searchIcon: {
    fontSize: 64,
    marginBottom: 24,
  },
  searchTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 16,
    textAlign: 'center',
  },
  searchSubtitle: {
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
  profileHeader: {
    backgroundColor: '#09C82C',
    padding: 24,
    paddingTop: 50,
    paddingBottom: 48,
  },
  profileInfo: {
    alignItems: 'center',
  },
  profileAvatar: {
    width: 96,
    height: 96,
    backgroundColor: 'white',
    borderRadius: 48,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileAvatarText: {
    fontSize: 40,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  profileAge: {
    color: '#dcfce7',
    marginTop: 4,
  },
  profileScrollView: {
    flex: 1,
    padding: 24,
    marginTop: -32,
  },
  profileCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#bbf7d0',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03440F',
  },
  contactInfo: {
    gap: 12,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  contactText: {
    color: '#374151',
  },
  matchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#f0fdf4',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#bbf7d0',
    marginTop: 12,
  },
  matchInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  matchDetails: {
    gap: 2,
  },
  matchSport: {
    fontWeight: '600',
    color: '#03440F',
  },
  matchDate: {
    fontSize: 14,
    color: '#6b7280',
  },
  matchBadge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#e5e7eb',
  },
  matchBadgeWin: {
    backgroundColor: '#bbf7d0',
  },
  matchBadgeLose: {
    backgroundColor: '#fecaca',
  },
  matchBadgeText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  matchBadgeTextWin: {
    color: '#166534',
  },
  matchBadgeTextLose: {
    color: '#991b1b',
  },
});