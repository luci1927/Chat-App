import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { format } from 'date-fns';

const MessageBubble = ({ message }) => {
  const formattedTime = format(new Date(message.timestamp), 'HH:mm');
  
  return (
    <View style={[
      styles.container,
      message.isSent ? styles.sent : styles.received
    ]}>
      <View style={styles.messageContent}>
        {message.image && (
          <Image 
            source={{ uri: message.image.uri }} 
            style={styles.image}
            resizeMode="cover"
          />
        )}
        {message.text && (
          <Text style={styles.text}>{message.text}</Text>
        )}
        <Text style={styles.timestamp}>{formattedTime}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    maxWidth: '80%',
    marginVertical: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
  },
  messageContent: {
    flexDirection: 'column',
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#E7FFDB',
    borderTopRightRadius: 2,
    marginLeft: '20%',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff',
    borderTopLeftRadius: 2,
    marginRight: '20%',
  },
  text: {
    fontSize: 16,
    color: '#000',
    lineHeight: 20,
    marginRight: 40,
  },
  timestamp: {
    fontSize: 11,
    color: '#667781',
    alignSelf: 'flex-end',
    marginTop: 1,
    position: 'absolute',
    right: 0,
    bottom: 0,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 4,
  },
});

export default MessageBubble;
