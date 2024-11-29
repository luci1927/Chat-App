import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { colors, isDarkMode, toggleTheme } = useTheme();
  const [isNotificationsEnabled, setIsNotificationsEnabled] = useState(true);
  const [isReadReceiptsEnabled, setIsReadReceiptsEnabled] = useState(true);

  const profileSections = [
    {
      id: 'profile',
      title: 'Profile',
      items: [
        {
          id: 'edit-profile',
          icon: 'person',
          label: 'Edit Profile',
          onPress: () => {},
        },
        {
          id: 'status',
          icon: 'information-circle',
          label: 'Status',
          onPress: () => {},
        },
        {
          id: 'phone',
          icon: 'call',
          label: 'Phone Number',
          value: '+1 234 567 8900',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'account',
      title: 'Account',
      items: [
        {
          id: 'privacy',
          icon: 'lock-closed',
          label: 'Privacy',
          onPress: () => {},
        },
        {
          id: 'security',
          icon: 'shield-checkmark',
          label: 'Security',
          onPress: () => {},
        },
        {
          id: 'two-step',
          icon: 'key',
          label: 'Two-step verification',
          onPress: () => {},
        },
        {
          id: 'change-number',
          icon: 'phone-portrait',
          label: 'Change Number',
          onPress: () => {},
        },
        {
          id: 'request-info',
          icon: 'document-text',
          label: 'Request Account Info',
          onPress: () => {},
        },
        {
          id: 'delete-account',
          icon: 'trash',
          label: 'Delete My Account',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'notifications',
      title: 'Notifications',
      items: [
        {
          id: 'notifications-toggle',
          icon: 'notifications',
          label: 'Notifications',
          type: 'switch',
          value: isNotificationsEnabled,
          onValueChange: setIsNotificationsEnabled,
        },
        {
          id: 'message-preview',
          icon: 'eye',
          label: 'Message Preview',
          onPress: () => {},
        },
        {
          id: 'read-receipts',
          icon: 'checkmark-done',
          label: 'Read Receipts',
          type: 'switch',
          value: isReadReceiptsEnabled,
          onValueChange: setIsReadReceiptsEnabled,
        },
      ],
    },
    {
      id: 'appearance',
      title: 'Appearance',
      items: [
        {
          id: 'theme',
          icon: 'moon',
          label: 'Dark theme',
          type: 'switch',
          value: isDarkMode,
          onValueChange: toggleTheme,
        },
        {
          id: 'wallpaper',
          icon: 'image',
          label: 'Chat wallpaper',
          onPress: () => {},
        },
        {
          id: 'font-size',
          icon: 'text',
          label: 'Font Size',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'storage',
      title: 'Storage and Data',
      items: [
        {
          id: 'storage-usage',
          icon: 'folder',
          label: 'Storage Usage',
          onPress: () => {},
        },
        {
          id: 'network',
          icon: 'wifi',
          label: 'Network Usage',
          onPress: () => {},
        },
        {
          id: 'auto-download',
          icon: 'download',
          label: 'Auto-Download Media',
          onPress: () => {},
        },
      ],
    },
    {
      id: 'help',
      title: 'Help',
      items: [
        {
          id: 'help-center',
          icon: 'information-circle',
          label: 'Help Center',
          onPress: () => {},
        },
        {
          id: 'contact-us',
          icon: 'mail',
          label: 'Contact us',
          onPress: () => {},
        },
        {
          id: 'terms',
          icon: 'document',
          label: 'Terms and Privacy Policy',
          onPress: () => {},
        },
      ],
    },
  ];

  const renderSectionItem = (item) => (
    <TouchableOpacity
      key={item.id}
      style={[styles.menuItem, { 
        backgroundColor: colors.surface,
        borderBottomColor: colors.border,
      }]}
      onPress={item.onPress}
      disabled={item.type === 'switch'}
    >
      <View style={styles.menuItemLeft}>
        <Ionicons 
          name={item.icon} 
          size={22} 
          color={item.id === 'delete-account' ? colors.danger : colors.primary} 
          style={styles.menuIcon} 
        />
        <View style={styles.menuItemTextContainer}>
          <Text style={[
            styles.menuItemText, 
            { 
              color: item.id === 'delete-account' ? colors.danger : colors.text 
            }
          ]}>
            {item.label}
          </Text>
          {item.value && !item.type && (
            <Text style={[styles.menuItemValue, { color: colors.textSecondary }]}>
              {item.value}
            </Text>
          )}
        </View>
      </View>
      {item.type === 'switch' ? (
        <Switch
          value={item.value}
          onValueChange={item.onValueChange}
          trackColor={{ false: '#767577', true: colors.primary }}
          thumbColor={colors.surface}
          ios_backgroundColor="#3e3e3e"
        />
      ) : (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View style={[styles.profileSection, { backgroundColor: colors.surface }]}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
            <Text style={[styles.status, { color: colors.textSecondary }]}>
              Hey there! I am using WhatsApp
            </Text>
          </View>
          <Ionicons name="qr-code" size={24} color={colors.primary} />
        </TouchableOpacity>
      </View>

      {profileSections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            {section.title}
          </Text>
          <View style={[styles.sectionContent, { 
            borderTopColor: colors.border,
            borderBottomColor: colors.border,
          }]}>
            {section.items.map(renderSectionItem)}
          </View>
        </View>
      ))}

      <Text style={[styles.version, { color: colors.textSecondary }]}>
        WhatsApp Clone v1.0.0
      </Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
    marginBottom: 20,
  },
  avatarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  profileInfo: {
    marginLeft: 16,
    flex: 1,
  },
  name: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  status: {
    fontSize: 14,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 16,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuIcon: {
    marginRight: 16,
    width: 24,
    textAlign: 'center',
  },
  menuItemTextContainer: {
    flex: 1,
  },
  menuItemText: {
    fontSize: 16,
  },
  menuItemValue: {
    fontSize: 14,
    marginTop: 2,
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    marginVertical: 24,
  },
});

export default ProfileScreen;
