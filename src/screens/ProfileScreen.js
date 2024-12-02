import React, { useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ProfileScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();

  const profileSections = [
    {
      id: 'profile',
      title: 'Profile Info',
      items: [
        {
          id: 'name',
          icon: 'person',
          label: 'Name',
          value: 'John Doe',
          onPress: () => navigation.navigate('ChangeName', { currentName: 'John Doe' }),
        },
        {
          id: 'about',
          icon: 'information-circle',
          label: 'About',
          value: 'Hey there! I am using ChatApp',
          onPress: () => navigation.navigate('ChangeAbout', { currentAbout: 'Hey there! I am using ChatApp' }),
        },
        {
          id: 'phone',
          icon: 'call',
          label: 'Phone',
          value: '+1 234 567 8900',
          onPress: () => navigation.navigate('ChangePhoneNumber', { currentPhone: '234 567 8900', currentCountryCode: '+1' }),
        },
      ],
    },
    {
      id: 'privacy',
      title: 'Privacy',
      items: [
        {
          id: 'last-seen',
          icon: 'time',
          label: 'Last seen',
          value: 'Everyone',
          onPress: () => navigation.navigate('LastSeenPrivacy', { currentOption: 'Everyone' }),
        },
        {
          id: 'profile-photo',
          icon: 'image',
          label: 'Profile photo',
          value: 'My contacts',
          onPress: () => navigation.navigate('ProfilePhotoPrivacy', { currentOption: 'My contacts' }),
        },
        {
          id: 'about-privacy',
          icon: 'information-circle',
          label: 'About',
          value: 'Everyone',
          onPress: () => navigation.navigate('AboutPrivacy', { currentOption: 'Everyone' }),
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      items: [
        {
          id: 'blocked',
          icon: 'ban',
          label: 'Blocked contacts',
          value: '2 contacts',
          onPress: () => navigation.navigate('BlockedContacts'),
        },
        {
          id: 'faceid',
          icon: 'scan-circle',
          label: 'Face ID',
          value: 'Disabled',
          onPress: () => navigation.navigate('FaceID'),
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
    >
      <View style={styles.menuItemLeft}>
        <Ionicons 
          name={item.icon} 
          size={22} 
          color={colors.primary} 
          style={styles.menuIcon} 
        />
        <View style={styles.menuItemTextContainer}>
          <Text style={[styles.menuItemText, { color: colors.text }]}>
            {item.label}
          </Text>
          {item.value && (
            <Text style={[styles.menuItemValue, { color: colors.textSecondary }]}>
              {item.value}
            </Text>
          )}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  useLayoutEffect(() => {
    navigation.setOptions({
      headerStyle: {
        backgroundColor: isDarkMode ? '#000' : '#fff',
      },
      headerTintColor: isDarkMode ? '#fff' : '#000',
    });
  }, [navigation, isDarkMode]);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={{ paddingBottom: 24 }}
    >
      <View style={[styles.profileSection, { 
        backgroundColor: colors.surface,
        marginHorizontal: 16,
        borderRadius: 12,
        marginTop: 16,
      }]}>
        <TouchableOpacity style={styles.avatarContainer}>
          <Image
            source={{ uri: 'https://randomuser.me/api/portraits/men/32.jpg' }}
            style={styles.avatar}
          />
          <View style={styles.profileInfo}>
            <Text style={[styles.name, { color: colors.text }]}>John Doe</Text>
            <Text style={[styles.status, { color: colors.textSecondary }]}>
              Hey there! I am using ChatApp
            </Text>
          </View>
          <Ionicons name="qr-code" size={24} color={colors.primary} style={{ marginLeft: 8 }} />
        </TouchableOpacity>
      </View>

      {profileSections.map((section) => (
        <View key={section.id} style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
            {section.title}
          </Text>
          <View style={[styles.sectionContent, { 
            backgroundColor: colors.surface,
            marginHorizontal: 16,
            borderRadius: 8,
            overflow: 'hidden',
          }]}>
            {section.items.map(renderSectionItem)}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  profileSection: {
    padding: 16,
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
    opacity: 0.8,
  },
  section: {
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 32,
    marginBottom: 8,
    textTransform: 'uppercase',
  },
  sectionContent: {
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 16,
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
    marginRight: 12,
  },
  menuItemText: {
    fontSize: 16,
    fontWeight: '400',
  },
  menuItemValue: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
});

export default ProfileScreen;
