// app/(tabs)/profile.tsx
import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { User, Mail, Phone, Trophy, Calendar, LogOut } from 'lucide-react-native';
import { useAuth } from '../../contexts/AuthContext';

export default function ProfileScreen() {
  const { userData, loading, logout } = useAuth();
  const [loggingOut, setLoggingOut] = React.useState(false);
  const [showConfirm, setShowConfirm] = React.useState(false);

  const handleLogout = async () => {
    setLoggingOut(true);
    
    try {
      await logout();
    } catch (error: any) {
      alert(`Error al cerrar sesión: ${error?.message || 'Error desconocido'}`);
    } finally {
      setLoggingOut(false);
    }
  };

  // Mostrar loading mientras carga
  if (loading || !userData) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#09C82C" />
        <Text style={styles.loadingText}>Cargando perfil...</Text>
      </View>
    );
  }

  // Modal de confirmación
  if (showConfirm) {
    return (
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Cerrar Sesión</Text>
          <Text style={styles.modalMessage}>¿Estás seguro que deseas cerrar sesión?</Text>
          
          <View style={styles.modalButtons}>
            <TouchableOpacity 
              style={[styles.modalButton, styles.cancelButton]}
              onPress={() => setShowConfirm(false)}
            >
              <Text style={styles.cancelButtonText}>Cancelar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.modalButton, styles.confirmButton]}
              onPress={() => {
                setShowConfirm(false);
                handleLogout();
              }}
              disabled={loggingOut}
            >
              {loggingOut ? (
                <ActivityIndicator color="white" size="small" />
              ) : (
                <Text style={styles.confirmButtonText}>Cerrar Sesión</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.age}>{userData.age} años</Text>
        
        {/* Botón de cerrar sesión */}
        <TouchableOpacity 
          onPress={() => setShowConfirm(true)}
          style={styles.logoutButton}
          disabled={loggingOut}
        >
          {loggingOut ? (
            <ActivityIndicator color="white" size="small" />
          ) : (
            <>
              <LogOut size={18} color="white" />
              <Text style={styles.logoutText}>Cerrar Sesión</Text>
            </>
          )}
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* Card de información de contacto */}
        <View style={styles.card}>
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
              <Phone size={18} color="#09C82C" />
              <Text style={styles.contactText}>{userData.phone}</Text>
            </View>
          </View>
        </View>

        {/* Card de historial de partidos */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Trophy size={20} color="#facc15" />
            <Text style={styles.cardTitle}>Historial de partidos</Text>
          </View>
          {userData.matches && userData.matches.length > 0 ? (
            userData.matches.map((match: any, index: number) => (
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
            ))
          ) : (
            <View style={styles.emptyState}>
              <Text style={styles.emptyStateIcon}>🏆</Text>
              <Text style={styles.emptyStateText}>Aún no has jugado ningún partido</Text>
              <Text style={styles.emptyStateSubtext}>¡Busca tu primera partida!</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0fdf4',
  },
  loadingText: {
    marginTop: 16,
    color: '#6b7280',
    fontSize: 16,
  },
  header: {
    backgroundColor: '#09C82C',
    padding: 24,
    paddingTop: 50,
    paddingBottom: 48,
    alignItems: 'center',
  },
  avatar: {
    width: 96,
    height: 96,
    backgroundColor: 'white',
    borderRadius: 48,
    marginBottom: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontSize: 40,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  age: {
    color: '#dcfce7',
    marginTop: 4,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    marginTop: 16,
    minWidth: 150,
    justifyContent: 'center',
  },
  logoutText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 14,
  },
  scrollView: {
    flex: 1,
    padding: 24,
    marginTop: -32,
  },
  card: {
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
  emptyState: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#6b7280',
    marginBottom: 8,
  },
  emptyStateSubtext: {
    fontSize: 14,
    color: '#9ca3af',
  },
  // Estilos del modal
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 12,
  },
  modalMessage: {
    fontSize: 16,
    color: '#6b7280',
    marginBottom: 24,
  },
  modalButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  modalButton: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButton: {
    backgroundColor: '#e5e7eb',
  },
  cancelButtonText: {
    color: '#374151',
    fontWeight: '600',
  },
  confirmButton: {
    backgroundColor: '#ef4444',
  },
  confirmButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});