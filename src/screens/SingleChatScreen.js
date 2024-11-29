import React, { useState, useRef, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ChatInput from '../components/ChatInput';
import MessageBubble from '../components/MessageBubble';
import { DUMMY_CHATS } from '../data/dummy-data';

const SingleChatScreen = ({ route, navigation }) => {
  const { colors } = useTheme();
  const { chatId, name } = route.params || {};
  const [messages, setMessages] = useState([]);
  const flatListRef = useRef(null);

  useLayoutEffect(() => {
    // Set up the initial messages from dummy data
    const chat = DUMMY_CHATS.find(chat => chat.id === chatId);
    if (chat) {
      setMessages(chat.messages || []);
    }
  }, [chatId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerTitleAlign: 'left',
      headerTitle: () => (
        <TouchableOpacity 
          style={styles.headerTitle}
          onPress={() => navigation.navigate('FriendProfile')}
        >
          <Image 
            source={{ uri: DUMMY_CHATS.find(c => c.id === chatId)?.avatar }} 
            style={styles.headerAvatar} 
          />
          <View style={styles.headerInfo}>
            <Text style={styles.headerName}>
              {DUMMY_CHATS.find(c => c.id === chatId)?.name}
            </Text>
            <Text style={styles.headerStatus}>online</Text>
          </View>
        </TouchableOpacity>
      ),
      headerLeft: () => (
        <TouchableOpacity 
          style={styles.headerBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color="#fff" />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam" size={24} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call" size={22} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="ellipsis-vertical" size={22} color="#fff" />
          </TouchableOpacity>
        </View>
      ),
      headerStyle: {
        backgroundColor: colors.primary,
        elevation: 0,
        shadowOpacity: 0,
      },
    });
  }, [navigation, chatId, name, colors]);

  const handleSendMessage = (messageData) => {
    const newMessage = {
      id: String(Date.now()),
      ...messageData,
      isSent: true,
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    setTimeout(() => {
      flatListRef.current?.scrollToEnd();
    }, 100);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <StatusBar barStyle="light-content" backgroundColor={colors.primary} />
      <KeyboardAvoidingView 
        style={[styles.container, styles.keyboardAvoidingView]}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}
      >
        <FlatList
          ref={flatListRef}
          data={messages}
          renderItem={({ item }) => (
            <MessageBubble message={item} />
          )}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.messageList}
          onLayout={() => flatListRef.current?.scrollToEnd()}
          onContentSizeChange={() => flatListRef.current?.scrollToEnd()}
        />
        <ChatInput onSend={handleSendMessage} />
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
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  messageList: {
    paddingVertical: 16,
  },
  headerTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  headerAvatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  headerInfo: {
    justifyContent: 'center',
  },
  headerName: {
    fontSize: 17,
    fontWeight: '600',
    color: '#fff',
  },
  headerStatus: {
    fontSize: 12,
    color: 'rgba(255,255,255,0.8)',
  },
  headerBackButton: {
    marginLeft: -8,
    padding: 8,
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerButton: {
    padding: 8,
    marginLeft: 4,
  },
});

export default SingleChatScreen;
