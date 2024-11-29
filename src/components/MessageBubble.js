import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

const MessageBubble = ({ message }) => {
  const { colors, isDarkMode } = useTheme();
  const formattedTime = format(new Date(message.timestamp), 'HH:mm');
  
  return (
    <View style={[
      styles.container,
      message.isSent ? styles.sent : styles.received
    ]}>
      <View style={[
        styles.messageContent,
        message.isSent ? [
          styles.sentContent,
          { backgroundColor: isDarkMode ? colors.primary : colors.messageBubble }
        ] : [
          styles.receivedContent,
          { backgroundColor: colors.surface }
        ]
      ]}>
        {message.image && (
          <Image 
            source={{ uri: message.image }} 
            style={styles.messageImage} 
          />
        )}
        {message.text && (
          <Text style={[
            styles.text,
            { color: message.isSent ? (isDarkMode ? '#fff' : colors.messageText) : colors.text }
          ]}>
            {message.text}
          </Text>
        )}
        <Text style={[
          styles.timestamp,
          { 
            color: message.isSent 
              ? (isDarkMode ? 'rgba(255,255,255,0.7)' : 'rgba(0,0,0,0.5)') 
              : colors.textSecondary 
          }
        ]}>
          {formattedTime}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 4,
    paddingHorizontal: 8,
  },
  messageContent: {
    flexDirection: 'column',
    padding: 8,
    borderRadius: 12,
    maxWidth: '80%',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 1,
        },
        shadowOpacity: 0.18,
        shadowRadius: 1.0,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  sent: {
    alignSelf: 'flex-end',
    marginLeft: '20%',
  },
  received: {
    alignSelf: 'flex-start',
    marginRight: '20%',
  },
  sentContent: {
    borderTopRightRadius: 4,
  },
  receivedContent: {
    borderTopLeftRadius: 4,
  },
  text: {
    fontSize: 16,
    lineHeight: 20,
    marginRight: 36,
  },
  timestamp: {
    fontSize: 11,
    alignSelf: 'flex-end',
    marginTop: 1,
    position: 'absolute',
    right: 8,
    bottom: 8,
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 4,
  },
});

export default MessageBubble;
