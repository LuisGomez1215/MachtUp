import { Send } from 'lucide-react-native';
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ChatScreen() {
  const [messages, setMessages] = useState([
    { id: 1, user: 'Sistema', text: 'Partido encontrado! 🎉', time: '10:30', isSystem: true },
    { id: 2, user: 'Sistema', text: 'Canchas recomendadas:\n1. Polideportivo Central - $15.000\n2. Estadio Municipal - $20.000', time: '10:30', isSystem: true },
    { id: 3, user: 'Juan', text: 'Hola! Yo puedo a las 18:00', time: '10:31', isUser: false },
    { id: 4, user: 'Tú', text: 'Perfecto, yo también!', time: '10:32', isUser: true },
    { id: 5, user: 'María', text: 'Genial, confirmado entonces', time: '10:33', isUser: false }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const sendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, {
        id: messages.length + 1,
        user: 'Tú',
        text: newMessage,
        time: new Date().toLocaleTimeString('es-CL', { hour: '2-digit', minute: '2-digit' }),
        isUser: true
      }]);
      setNewMessage('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Chat del Partido</Text>
        <Text style={styles.headerSubtitle}>Fútbol 5v5 - 10 jugadores</Text>
      </View>

      <ScrollView style={styles.messagesContainer}>
        {messages.map(msg => (
          <View
            key={msg.id}
            style={[
              styles.messageBubble,
              msg.isSystem && styles.systemMessage,
              msg.isUser && styles.userMessage,
              !msg.isSystem && !msg.isUser && styles.otherMessage
            ]}
          >
            {!msg.isSystem && (
              <Text style={[styles.messageUser, msg.isUser && styles.messageUserSelf]}>
                {msg.user}
              </Text>
            )}
            <Text style={[styles.messageText, msg.isUser && styles.messageTextSelf]}>
              {msg.text}
            </Text>
            <Text style={[styles.messageTime, msg.isUser && styles.messageTimeSelf]}>
              {msg.time}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.inputContainer}>
        <TextInput
          value={newMessage}
          onChangeText={setNewMessage}
          onSubmitEditing={sendMessage}
          placeholder="Escribe un mensaje..."
          placeholderTextColor="#9ca3af"
          style={styles.input}
        />
        <TouchableOpacity onPress={sendMessage} style={styles.sendButton}>
          <Send size={20} color="white" />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    paddingBottom: 24,
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
  messagesContainer: {
    flex: 1,
    padding: 16,
  },
  messageBubble: {
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    maxWidth: '80%',
  },
  systemMessage: {
    backgroundColor: '#dcfce7',
    borderWidth: 2,
    borderColor: '#09C82C',
    alignSelf: 'center',
    maxWidth: '90%',
  },
  userMessage: {
    backgroundColor: '#09C82C',
    alignSelf: 'flex-end',
  },
  otherMessage: {
    backgroundColor: 'white',
    borderWidth: 2,
    borderColor: '#bbf7d0',
    alignSelf: 'flex-start',
  },
  messageUser: {
    fontSize: 12,
    fontWeight: '600',
    color: '#03440F',
    marginBottom: 4,
  },
  messageUserSelf: {
    color: 'white',
  },
  messageText: {
    color: '#1f2937',
    fontSize: 16,
  },
  messageTextSelf: {
    color: 'white',
  },
  messageTime: {
    fontSize: 10,
    color: '#6b7280',
    marginTop: 4,
  },
  messageTimeSelf: {
    color: 'rgba(255, 255, 255, 0.7)',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: 'white',
    borderTopWidth: 2,
    borderTopColor: '#bbf7d0',
    gap: 8,
  },
  input: {
    flex: 1,
    padding: 12,
    borderWidth: 2,
    borderColor: '#d1d5db',
    borderRadius: 8,
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: '#09C82C',
    padding: 12,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    width: 48,
  },
});
