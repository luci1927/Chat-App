import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Keyboard,
  Platform,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend({ text: message.trim() });
      setMessage('');
      Keyboard.dismiss();
    }
  };

  const handleFocus = () => {
    setIsTyping(true);
  };

  const handleBlur = () => {
    setIsTyping(false);
  };

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-circle" size={20} color="#128C7E" />
        </TouchableOpacity>
        
        <View style={styles.textInputWrapper}>
          <TextInput
            style={styles.input}
            placeholder="Message"
            placeholderTextColor="#999"
            value={message}
            onChangeText={setMessage}
            multiline
            maxHeight={100}
            onFocus={handleFocus}
            onBlur={handleBlur}
          />
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="camera-outline" size={20} color="#128C7E" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={message.trim().length > 0 ? handleSend : undefined}
        >
          {message.trim().length > 0 ? (
            <View style={styles.sendButtonInner}>
              <Ionicons name="send" size={16} color="#fff" />
            </View>
          ) : (
            <Ionicons name="mic" size={20} color="#128C7E" />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0F2F5',
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F0F2F5',
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 18,
    marginHorizontal: 4,
    paddingVertical: Platform.OS === 'ios' ? 4 : 1,
    paddingHorizontal: 8,
    minHeight: 32,
    maxHeight: 100,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 2,
    elevation: 2,
    marginBottom: 5,
    marginTop: 4,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    maxHeight: 100,
    paddingTop: Platform.OS === 'ios' ? 4 : 1,
    paddingBottom: Platform.OS === 'ios' ? 4 : 1,
    paddingHorizontal: 5,
  },
  iconButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  attachButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: -4,
  },
  sendButtonInner: {
    backgroundColor: '#128C7E',
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;
