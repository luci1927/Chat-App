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
  const { colors, isDarkMode } = useTheme();
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
      headerStyle: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
      },
      headerLeft: () => (
        <TouchableOpacity 
          style={styles.headerBackButton}
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="arrow-back" size={24} color={isDarkMode ? '#fff' : '#000'} />
        </TouchableOpacity>
      ),
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
            <Text style={[styles.headerName, { color: isDarkMode ? '#fff' : '#000' }]}>
              {DUMMY_CHATS.find(c => c.id === chatId)?.name}
            </Text>
            <Text style={[styles.headerStatus, { color: isDarkMode ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.6)' }]}>
              online
            </Text>
          </View>
        </TouchableOpacity>
      ),
      headerRight: () => (
        <View style={styles.headerRight}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="call-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="videocam-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
        </View>
      ),
      headerTintColor: isDarkMode ? '#fff' : '#000',
    });
  }, [navigation, chatId, name, colors, isDarkMode]);

  const handleSendMessage = (messageData) => {
    // Create message with initial 'sending' status
    const newMessage = {
      id: String(Date.now()),
      timestamp: new Date().toISOString(),
      ...messageData,
      isSent: true,
      status: 'sending',
    };
    setMessages(prevMessages => [...prevMessages, newMessage]);
    
    // Simulate message being sent
    setTimeout(() => {
      setMessages(prev => 
        prev.map(msg => 
          msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
        )
      );
      
      // Simulate message being delivered
      setTimeout(() => {
        setMessages(prev => 
          prev.map(msg => 
            msg.id === newMessage.id ? { ...msg, status: 'delivered' } : msg
          )
        );
        
        // Simulate message being seen
        setTimeout(() => {
          setMessages(prev => 
            prev.map(msg => 
              msg.id === newMessage.id ? { ...msg, status: 'seen' } : msg
            )
          );
        }, 2000);
      }, 1000);
    }, 500);

    setTimeout(() => {
      flatListRef.current?.scrollToEnd({ animated: true });
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
  },
  headerStatus: {
    fontSize: 12,
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
