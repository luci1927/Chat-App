import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import ChatListItem from '../components/ChatListItem';
import HeaderMenu from '../components/HeaderMenu';
import { DUMMY_CHATS } from '../data/dummy-data';

const ChatListScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
      },
      headerTintColor: isDarkMode ? '#fff' : '#000',
      headerTitleStyle: {
        color: isDarkMode ? '#fff' : '#000',
        fontSize: 32,
        fontWeight: 'bold',
      },
      headerRight: () => (
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="camera-outline" size={24} color={isDarkMode ? '#fff' : '#000'} />
          </TouchableOpacity>
          <TouchableOpacity 
            style={[
              styles.headerButton,
              { backgroundColor: isDarkMode ? 'transparent' : 'transparent' }
            ]}>
            <Ionicons 
              name="search-outline" 
              size={24} 
              color={isDarkMode ? '#fff' : '#000000'} 
            />
          </TouchableOpacity>
          <HeaderMenu />
        </View>
      ),
    });
  }, [navigation, isDarkMode]);

  const renderChatItem = ({ item }) => (
    <View style={{ backgroundColor: colors.background }}>
      <ChatListItem
        chat={item}
        onPress={() => navigation.navigate('SingleChat', { 
          chatId: item.id,
          name: item.name
        })}
        textColor={colors.text}
        lastMessageColor={colors.text}
        timeColor={colors.text}
        borderColor={colors.border}
      />
    </View>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <FlatList
        data={DUMMY_CHATS}
        renderItem={renderChatItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
      />
      <TouchableOpacity 
        style={[styles.fab, { backgroundColor: colors.primary }]}
        onPress={() => navigation.navigate('NewChat')}
      >
        <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 82,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 8,
    
  },
  headerButton: {
    marginLeft: 20,
    padding: 4,
    borderRadius: 20,
  },
});

export default ChatListScreen;
