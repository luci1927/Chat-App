import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Dummy contacts data
const DUMMY_CONTACTS = [
  { id: '1', name: 'Alice Johnson', status: 'Hey there! I am using WhatsApp', phone: '+1234567890' },
  { id: '2', name: 'Bob Smith', status: 'Available', phone: '+1234567891' },
  { id: '3', name: 'Charlie Brown', status: 'At work', phone: '+1234567892' },
  { id: '4', name: 'David Wilson', status: 'Busy', phone: '+1234567893' },
  { id: '5', name: 'Eva Green', status: 'In a meeting', phone: '+1234567894' },
  { id: '6', name: 'Frank White', status: 'Available', phone: '+1234567895' },
  { id: '7', name: 'Grace Lee', status: 'At the gym', phone: '+1234567896' },
  { id: '8', name: 'Henry Ford', status: 'On vacation', phone: '+1234567897' },
];

const NewChatScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [searchQuery, setSearchQuery] = useState('');

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  const filteredContacts = DUMMY_CONTACTS.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderContactItem = ({ item }) => (
    <TouchableOpacity
      style={styles.contactItem}
      onPress={() => {
        navigation.navigate('SingleChat', {
          chatId: item.id,
          name: item.name,
        });
      }}
    >
      <View style={[styles.avatar, { backgroundColor: colors.primary }]}>
        <Text style={styles.avatarText}>
          {item.name.charAt(0)}
        </Text>
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.contactStatus, { color: colors.textSecondary }]}>
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.searchContainer, { backgroundColor: colors.surface }]}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={[styles.searchInput, { color: colors.text }]}
          placeholder="Search contacts"
          placeholderTextColor={colors.textSecondary}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>
      <FlatList
        data={filteredContacts}
        renderItem={renderContactItem}
        keyExtractor={item => item.id}
        ItemSeparatorComponent={() => (
          <View style={[styles.separator, { backgroundColor: colors.border }]} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    margin: 10,
    borderRadius: 8,
  },
  searchInput: {
    flex: 1,
    marginLeft: 8,
    fontSize: 16,
  },
  contactItem: {
    flexDirection: 'row',
    padding: 12,
    alignItems: 'center',
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  contactInfo: {
    marginLeft: 12,
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '500',
  },
  contactStatus: {
    fontSize: 14,
    marginTop: 2,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 74,
  },
});

export default NewChatScreen;
