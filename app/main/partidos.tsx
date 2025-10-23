import { Calendar, MapPin } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function PartidosScreen() {
  const partidos = [
    {
      id: '1',
      deporte: 'Fútbol 5v5',
      fecha: 'Hoy, 18:00',
      ubicacion: 'Cancha Los Leones',
      jugadores: '8/10',
    },
    {
      id: '2',
      deporte: 'Basket 3v3',
      fecha: 'Mañana, 19:00',
      ubicacion: 'Parque O\'Higgins',
      jugadores: '5/6',
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Mis Partidos</Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {partidos.map((partido) => (
          <TouchableOpacity key={partido.id} style={styles.partidoCard}>
            <Text style={styles.deporte}>{partido.deporte}</Text>
            
            <View style={styles.infoRow}>
              <Calendar size={18} color="#09C82C" />
              <Text style={styles.infoText}>{partido.fecha}</Text>
            </View>

            <View style={styles.infoRow}>
              <MapPin size={18} color="#09C82C" />
              <Text style={styles.infoText}>{partido.ubicacion}</Text>
            </View>

            <View style={styles.footer}>
              <Text style={styles.jugadores}>{partido.jugadores} jugadores</Text>
              <TouchableOpacity style={styles.chatButton}>
                <Text style={styles.chatButtonText}>Abrir Chat</Text>
              </TouchableOpacity>
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
    paddingTop: 60,
    paddingBottom: 24,
  },
  headerTitle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white',
  },
  scrollView: {
    flex: 1,
    padding: 24,
  },
  partidoCard: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    borderWidth: 2,
    borderColor: '#bbf7d0',
  },
  deporte: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#03440F',
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    color: '#374151',
    fontSize: 14,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#e5e7eb',
  },
  jugadores: {
    color: '#6b7280',
    fontWeight: '600',
  },
  chatButton: {
    backgroundColor: '#09C82C',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  chatButtonText: {
    color: 'white',
    fontWeight: '600',
  },
});