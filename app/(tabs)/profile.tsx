import { Calendar, Mail, Phone, Trophy, User } from 'lucide-react-native';
import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';

export default function ProfileScreen() {
  const userData = {
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
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>👤</Text>
        </View>
        <Text style={styles.name}>{userData.name}</Text>
        <Text style={styles.age}>{userData.age} años</Text>
      </View>

      <ScrollView style={styles.scrollView}>
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

        <View style={styles.card}>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0fdf4',
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
});