import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { DUMMY_CHATS } from '../data/dummy-data';

const FriendProfileScreen = ({ route, navigation }) => {
  const { colors, isDarkMode } = useTheme();
  const { chatId } = route.params || {};
  const friend = DUMMY_CHATS.find(c => c.id === chatId) || {
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
    status: "Life is what happens when you're busy making other plans.",
    phone: '+1234567890'
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#1a1a1a' : '#fff',
      },
      headerTintColor: isDarkMode ? '#fff' : '#000',
      headerShadowVisible: false,
      headerTitle: '',
    });
  }, [navigation, isDarkMode]);

  const handleCall = () => {
    Linking.openURL(`tel:${friend.phone}`);
  };

  const handleVideoCall = () => {
    // Implement video call functionality
  };

  const handleBlock = () => {
    // Implement block functionality
  };

  const handleReport = () => {
    // Implement report functionality
  };

  const renderActionButton = (icon, label, onPress, color = colors.primary) => (
    <TouchableOpacity 
      style={styles.actionButton} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={[styles.iconBackground, { backgroundColor: color + '15' }]}>
        <Ionicons name={icon} size={24} color={color} />
      </View>
      <Text style={[styles.actionText, { color: colors.text }]}>{label}</Text>
    </TouchableOpacity>
  );

  const renderSettingItem = (icon, label, onPress, color = colors.text, showArrow = true) => (
    <TouchableOpacity 
      style={styles.settingItem} 
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={22} color={color} style={styles.settingIcon} />
        <Text style={[styles.settingText, { color }]}>{label}</Text>
      </View>
      {showArrow && <Ionicons name="chevron-forward" size={20} color={isDarkMode ? '#666' : '#999'} />}
    </TouchableOpacity>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      showsVerticalScrollIndicator={false}
    >
      {/* Profile Header */}
      <View style={[styles.header, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        <Image 
          source={{ uri: friend.avatar }} 
          style={[styles.avatar, { borderColor: isDarkMode ? '#333' : '#eee' }]} 
        />
        <Text style={[styles.name, { color: colors.text }]}>{friend.name}</Text>
        <Text style={[styles.status, { color: isDarkMode ? '#aaa' : '#666' }]}>online</Text>
      </View>

      {/* Action Buttons */}
      <View style={[styles.section, styles.actionContainer, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        {renderActionButton('call-outline', 'Audio', handleCall)}
        {renderActionButton('videocam-outline', 'Video', handleVideoCall)}
        {renderActionButton('search-outline', 'Search')}
      </View>

      {/* Info Section */}
      <View style={[styles.section, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="information-circle-outline" size={22} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>About</Text>
        </View>
        <Text style={[styles.bio, { color: colors.text }]}>{friend.status}</Text>
      </View>

      {/* Media Section */}
      <View style={[styles.section, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        <View style={styles.sectionHeader}>
          <Ionicons name="images-outline" size={22} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.primary }]}>Media, Links and Docs</Text>
        </View>
        <TouchableOpacity 
          style={[styles.mediaPreview, { backgroundColor: isDarkMode ? '#2a2a2a' : '#f0f0f0' }]}
          activeOpacity={0.7}
        >
          <View style={styles.mediaGrid}>
            <Text style={[styles.mediaCount, { color: colors.text }]}>247</Text>
            <Ionicons name="chevron-forward" size={16} color={isDarkMode ? '#666' : '#999'} />
          </View>
        </TouchableOpacity>
      </View>

      {/* Settings Section */}
      <View style={[styles.section, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        {renderSettingItem('notifications-off-outline', 'Mute notifications')}
        {renderSettingItem('notifications-outline', 'Custom notifications')}
      </View>

      {/* Danger Zone */}
      <View style={[styles.section, { backgroundColor: isDarkMode ? '#1a1a1a' : '#fff' }]}>
        {renderSettingItem('ban-outline', `Block ${friend.name}`, handleBlock, '#FF3B30', false)}
        {renderSettingItem('warning-outline', 'Report contact', handleReport, '#FF3B30', false)}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    marginBottom: 12,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 4,
      },
    }),
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 16,
    borderWidth: 3,
    borderColor: '#eee',
  },
  name: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 6,
  },
  status: {
    fontSize: 14,
    marginBottom: 10,
  },
  section: {
    marginBottom: 12,
    padding: 16,
    marginHorizontal: 12,
    borderRadius: 16,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 3,
      },
    }),
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 12,
  },
  actionButton: {
    alignItems: 'center',
    minWidth: 80,
  },
  iconBackground: {
    width: 52,
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  actionText: {
    fontSize: 13,
    fontWeight: '500',
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingBottom: 8,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 8,
  },
  bio: {
    fontSize: 15,
    lineHeight: 22,
  },
  mediaGrid: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
  },
  mediaPreview: {
    height: 50,
    borderRadius: 12,
    justifyContent: 'center',
  },
  mediaCount: {
    fontSize: 16,
    fontWeight: '500',
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: 'rgba(150, 150, 150, 0.2)',
  },
  settingLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingIcon: {
    marginRight: 12,
  },
  settingText: {
    fontSize: 16,
  },
});

export default FriendProfileScreen;
