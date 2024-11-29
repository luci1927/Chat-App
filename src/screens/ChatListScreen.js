import React from 'react';
import { View, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import ChatListItem from '../components/ChatListItem';
import { DUMMY_CHATS } from '../data/dummy-data';

const ChatListScreen = ({ navigation }) => {
  const renderChatItem = ({ item }) => (
    <ChatListItem
      chat={item}
      onPress={() => navigation.navigate('SingleChat', { 
        chatId: item.id,
        name: item.name
      })}
    />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_CHATS}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default ChatListScreen;
