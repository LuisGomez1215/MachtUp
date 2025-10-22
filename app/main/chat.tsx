import { StyleSheet, Text, View } from 'react-native';

export default function ChatScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chats</Text>
      </View>
      <View style={styles.content}>
        <Text style={styles.text}>Pantalla de Chat - Próximamente</Text>
      </View>
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
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    color: '#6b7280',
  },
});