import React, { useState, useLayoutEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Alert,
  TextInput,
  Modal,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

// Simulated contacts data with more details
const initialBlockedContacts = [
  {
    id: '1',
    name: 'Emma Johnson',
    phone: '+1 987 654 3210',
    email: 'emma.johnson@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    blockedDate: '2023-06-15',
    reason: 'Spam messages',
  },
  {
    id: '2',
    name: 'Michael Smith',
    phone: '+1 456 789 0123',
    email: 'michael.smith@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/85.jpg',
    blockedDate: '2023-05-22',
    reason: 'Harassment',
  },
];

// Simulated contacts list for adding new blocked contacts
const contactsList = [
  {
    id: '3',
    name: 'Sarah Williams',
    phone: '+1 234 567 8901',
    email: 'sarah.williams@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/50.jpg',
  },
  {
    id: '4',
    name: 'David Brown',
    phone: '+1 345 678 9012',
    email: 'david.brown@example.com',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    id: '5',
    name: 'Lisa Miller',
    phone: '+1 456 789 0123',
    email: 'lisa.miller@example.com',
    avatar: 'https://randomuser.me/api/portraits/women/68.jpg',
  },
];

const BlockedContactsScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();
  const [contacts, setContacts] = useState(initialBlockedContacts);
  const [isAddContactModalVisible, setIsAddContactModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedContacts, setSelectedContacts] = useState([]);

  const handleUnblockContact = useCallback((contactId) => {
    Alert.alert(
      'Unblock Contact',
      'Are you sure you want to unblock this contact?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Unblock',
          style: 'destructive',
          onPress: () => {
            const updatedContacts = contacts.filter(contact => contact.id !== contactId);
            setContacts(updatedContacts);
            
            // Here you would typically update the backend/storage
            navigation.navigate('Profile', { 
              updatedBlockedContacts: updatedContacts.length 
            });
          },
        },
      ]
    );
  }, [contacts, navigation]);

  const handleContactDetails = useCallback((contact) => {
    Alert.alert(
      'Contact Details',
      `Name: ${contact.name}\nPhone: ${contact.phone}\nEmail: ${contact.email}\n\nBlocked on: ${contact.blockedDate}\nReason: ${contact.reason}`,
      [{ text: 'OK' }]
    );
  }, []);

  const filteredContactsList = contactsList.filter(contact => 
    contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    contact.phone.includes(searchQuery)
  );

  const handleAddContacts = useCallback(() => {
    if (selectedContacts.length === 0) {
      Alert.alert('Select Contacts', 'Please select at least one contact to block.');
      return;
    }

    const newBlockedContacts = selectedContacts.map(contact => ({
      ...contact,
      blockedDate: new Date().toISOString().split('T')[0],
      reason: 'Manually blocked',
    }));

    setContacts(prevContacts => [...prevContacts, ...newBlockedContacts]);
    setSelectedContacts([]);
    setIsAddContactModalVisible(false);
    
    // Here you would typically update the backend/storage
    navigation.navigate('Profile', { 
      updatedBlockedContacts: contacts.length + newBlockedContacts.length 
    });
  }, [selectedContacts, contacts, navigation]);

  const toggleContactSelection = useCallback((contact) => {
    setSelectedContacts(prev => 
      prev.some(c => c.id === contact.id)
        ? prev.filter(c => c.id !== contact.id)
        : [...prev, contact]
    );
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
      ),
      headerRight: () => (
        <TouchableOpacity 
          onPress={() => setIsAddContactModalVisible(true)}
        >
          <Ionicons name="add" size={28} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  const renderBlockedContactItem = ({ item }) => (
    <View 
      style={[
        styles.contactContainer, 
        { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }
      ]}
    >
      <Image 
        source={{ uri: item.avatar }} 
        style={styles.avatar} 
      />
      <View style={styles.contactInfo}>
        <Text style={[styles.contactName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.contactPhone, { color: colors.textSecondary }]}>
          {item.phone}
        </Text>
      </View>
      <View style={styles.contactActions}>
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => handleContactDetails(item)}
        >
          <Ionicons name="information-circle" size={24} color={colors.primary} />
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.unblockButton, 
            { 
              backgroundColor: colors.error,
            }
          ]}
          onPress={() => handleUnblockContact(item.id)}
        >
          <Text 
            style={[
              styles.unblockButtonText,
              { 
                color: isDarkMode ? 'white' : 'black' 
              }
            ]}
          >
            Unblock
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderAddContactItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.addContactItem,
        { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }
      ]}
      onPress={() => toggleContactSelection(item)}
    >
      <Image 
        source={{ uri: item.avatar }} 
        style={styles.addContactAvatar} 
      />
      <View style={styles.addContactInfo}>
        <Text style={[styles.addContactName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.addContactPhone, { color: colors.textSecondary }]}>
          {item.phone}
        </Text>
      </View>
      {selectedContacts.some(c => c.id === item.id) && (
        <Ionicons 
          name="checkmark-circle" 
          size={24} 
          color={colors.primary} 
        />
      )}
    </TouchableOpacity>
  );

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      {contacts.length === 0 ? (
        <View style={styles.emptyState}>
          <Ionicons 
            name="ban" 
            size={64} 
            color={colors.textSecondary} 
            style={styles.emptyIcon}
          />
          <Text style={[styles.emptyText, { color: colors.textSecondary }]}>
            No blocked contacts
          </Text>
        </View>
      ) : (
        <FlatList
          data={contacts}
          renderItem={renderBlockedContactItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContent}
        />
      )}

      <Modal
        visible={isAddContactModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsAddContactModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <View style={styles.modalHeader}>
              <Text style={[styles.modalTitle, { color: colors.text }]}>
                Add Blocked Contacts
              </Text>
              <TouchableOpacity onPress={() => setIsAddContactModalVisible(false)}>
                <Ionicons name="close" size={24} color={colors.text} />
              </TouchableOpacity>
            </View>

            <TextInput
              style={[
                styles.searchInput,
                { 
                  backgroundColor: colors.background,
                  color: colors.text,
                  borderColor: colors.border,
                }
              ]}
              placeholder="Search contacts"
              placeholderTextColor={colors.textSecondary}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />

            <FlatList
              data={filteredContactsList}
              renderItem={renderAddContactItem}
              keyExtractor={(item) => item.id}
              style={styles.contactsList}
            />

            <TouchableOpacity
              style={[
                styles.addButton, 
                { 
                  backgroundColor: selectedContacts.length > 0 
                    ? colors.primary 
                    : colors.textSecondary 
                }
              ]}
              onPress={handleAddContacts}
              disabled={selectedContacts.length === 0}
            >
              <Text style={styles.addButtonText}>
                Block {selectedContacts.length > 0 ? `(${selectedContacts.length})` : ''}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContent: {
    paddingVertical: 16,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: '30%',
  },
  emptyIcon: {
    marginBottom: 16,
    opacity: 0.5,
  },
  emptyText: {
    fontSize: 16,
    opacity: 0.7,
  },
  contactContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 16,
  },
  contactInfo: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: '600',
  },
  contactPhone: {
    fontSize: 14,
    marginTop: 4,
  },
  contactActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailsButton: {
    marginRight: 12,
  },
  unblockButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
  },
  unblockButtonText: {
    fontSize: 14,
    fontWeight: '600',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  searchInput: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
  },
  contactsList: {
    maxHeight: 300,
  },
  addContactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
  },
  addContactAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  addContactInfo: {
    flex: 1,
  },
  addContactName: {
    fontSize: 16,
  },
  addContactPhone: {
    fontSize: 14,
    marginTop: 4,
  },
  addButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default BlockedContactsScreen;
