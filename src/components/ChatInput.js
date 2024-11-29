import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ChatInput = ({ onSend }) => {
  const [message, setMessage] = useState('');
  const { colors } = useTheme();

  const handleSend = () => {
    if (message.trim().length > 0) {
      onSend({ text: message.trim() });
      setMessage('');
    }
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.surface }]}>
      <View style={[styles.inputContainer, { backgroundColor: colors.background }]}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="add-circle" size={20} color={colors.primary} />
        </TouchableOpacity>
        
        <View style={[styles.textInputWrapper, { backgroundColor: colors.surface }]}>
          <TextInput
            style={[styles.input, { color: colors.text }]}
            placeholder="Message"
            placeholderTextColor={colors.textSecondary}
            value={message}
            onChangeText={setMessage}
            multiline
            maxHeight={100}
          />
          <TouchableOpacity style={styles.attachButton}>
            <Ionicons name="camera-outline" size={20} color={colors.primary} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity 
          style={styles.iconButton}
          onPress={message.trim().length > 0 ? handleSend : undefined}
        >
          {message.trim().length > 0 ? (
            <View style={[styles.sendButtonInner, { backgroundColor: colors.primary }]}>
              <Ionicons name="send" size={16} color="#fff" />
            </View>
          ) : (
            <Ionicons name="mic" size={20} color={colors.primary} />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 4,
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderTopColor: 'rgba(0,0,0,0.1)',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInputWrapper: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
    width: 28,
    height: 28,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ChatInput;
