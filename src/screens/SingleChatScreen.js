import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  StatusBar,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import MessageBubble from '../components/MessageBubble';
import ChatInput from '../components/ChatInput';
import { DUMMY_CHATS } from '../data/dummy-data';

const SingleChatScreen = ({ route, navigation }) => {
  const { chatId, name } = route.params || {};
  const chat = DUMMY_CHATS.find(c => c.id === chatId) || DUMMY_CHATS[0];
  const [messages, setMessages] = useState(chat.messages || []);

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitle: () => null,
      headerLeft: () => (
        <View style={styles.headerLeft}>
          <TouchableOpacity 
            onPress={() => navigation.goBack()} 
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 0 }}
          >
            <Ionicons name="chevron-back-outline" size={26} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.headerTitleContainer}
            onPress={() => {/* Handle profile press */}}
          >
            <Image 
              source={{ uri: chat.avatar }} 
              style={styles.avatarImage} 
            />
            <View style={styles.headerTextContainer}>
              <Text style={styles.headerTitle}>{chat.name}</Text>
              <Text style={styles.headerSubtitle}>online</Text>
            </View>
          </TouchableOpacity>
        </View>
      ),
      headerRight: () => (
        <View style={styles.headerRightIcons}>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="videocam" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="call" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerIcon}>
            <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: '#128C7E',
        elevation: 0,
        shadowOpacity: 0,
      },
      headerTintColor: '#fff',
    });
  }, [navigation, chatId, name]);

  const sendMessage = (messageData) => {
    const newMessage = {
      id: Date.now().toString(),
      text: messageData.text,
      timestamp: new Date().toISOString(),
      isSent: true,
    };
    setMessages(prevMessages => [newMessage, ...prevMessages]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor="#128C7E" />
      <KeyboardAvoidingView 
        style={[styles.container, styles.keyboardAvoidingView]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <View style={styles.backgroundPattern} />
        <View style={styles.messagesContainer}>
          <FlatList
            data={messages}
            renderItem={({ item }) => <MessageBubble message={item} />}
            keyExtractor={item => item.id}
            contentContainerStyle={styles.messagesList}
            inverted={false}
            showsVerticalScrollIndicator={false}
            initialScrollIndex={0}
            ListHeaderComponent={<View style={styles.messageListHeader} />}
          />
        </View>
        <ChatInput onSend={sendMessage} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,

  },
  container: {
    flex: 1,
    backgroundColor: '#E5DDD5',
  },
  keyboardAvoidingView: {
    flex: 1,
    backgroundColor: '#F0F2F5',
  },
  backgroundPattern: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    opacity: 0.05,
    backgroundColor: '#000',
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    marginRight: 50,
  },
  headerTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: -30,
  },
  avatarImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  headerTextContainer: {
    justifyContent: 'center',
  },
  headerTitle: {
    color: '#fff',
    fontSize: 17,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: '#fff',
    fontSize: 12,
    opacity: 0.8,
  },
  headerRightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    paddingHorizontal: 10,
  },
  backButton: {
    marginLeft: 6,
    paddingRight: 0,
    justifyContent: 'center',
  },
  backButtonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  messagesContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  messagesList: {
    flexGrow: 0,
    paddingTop: 10,
  },
  messageListHeader: {
    height: 8,
  },
});

export default SingleChatScreen;
