import React from 'react';
import { View, Text, StyleSheet, Image, Platform } from 'react-native';
import { format } from 'date-fns';
import { useTheme } from '../context/ThemeContext';

const MessageBubble = ({ message }) => {
  const { colors, isDarkMode } = useTheme();
  const formattedTime = format(new Date(message.timestamp), 'HH:mm');
  
  const renderMessageStatus = () => {
    if (!message.isSent) return null;
    
    const statusColor = isDarkMode ? 'rgba(255,255,255,0.9)' : 'rgba(0,0,0,0.6)';
    const seenColor = colors.primary;

    switch (message.status) {
      case 'sending':
        return (
          <Text style={[styles.statusText, { color: statusColor }]}>○</Text>
        );
      case 'sent':
        return (
          <Text style={[styles.statusText, { color: statusColor }]}>✓</Text>
        );
      case 'delivered':
        return (
          <Text style={[styles.statusText, { color: statusColor }]}>✓✓</Text>
        );
      case 'seen':
        return (
          <Text style={[styles.statusText, { color: seenColor }]}>✓✓</Text>
        );
      default:
        return null;
    }
  };

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
        <View style={styles.messageFooter}>
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
          {renderMessageStatus()}
        </View>
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
    marginRight: 4,
  },
  messageFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginTop: 2,
    minHeight: 20,
  },
  timestamp: {
    fontSize: 11,
    marginRight: 4,
  },
  statusText: {
    fontSize: 14,
    marginLeft: 2,
    fontWeight: '600',
  },
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 4,
  },
});

export default MessageBubble;
