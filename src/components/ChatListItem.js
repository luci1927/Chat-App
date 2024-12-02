import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

const ChatListItem = ({ chat, onPress, textColor, lastMessageColor, timeColor, borderColor }) => {
  return (
    <TouchableOpacity 
      style={[
        styles.container, 
        { borderBottomColor: borderColor }
      ]} 
      onPress={onPress}
    >
      <Image source={{ uri: chat.avatar }} style={styles.avatar} />
      <View style={styles.contentContainer}>
        <View style={styles.headerContainer}>
          <Text style={[styles.name, { color: textColor }]}>{chat.name}</Text>
          <Text style={[styles.time, { color: timeColor }]}>{chat.time}</Text>
        </View>
        <View style={styles.messageContainer}>
          <Text style={[styles.lastMessage, { color: lastMessageColor }]} numberOfLines={1}>
            {chat.lastMessage.text}
          </Text>
          {chat.unreadCount > 0 && (
            <View style={styles.unreadBadge}>
              <Text style={styles.unreadCount}>{chat.unreadCount}</Text>
            </View>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  contentContainer: {
    flex: 1,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
  },
  time: {
    fontSize: 12,
  },
  messageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lastMessage: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    marginRight: 5,
  },
  unreadBadge: {
    backgroundColor: '#25D366',
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  unreadCount: {
    color: '#fff',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default ChatListItem;
