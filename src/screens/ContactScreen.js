import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ContactScreen = ({ navigation }) => {
  const { colors } = useTheme();

  const contactMethods = [
    {
      title: 'Email',
      subtitle: 'support@chatapp.com',
      icon: 'mail-outline',
      onPress: () => Linking.openURL('mailto:support@chatapp.com'),
    },
    {
      title: 'Phone',
      subtitle: '+1 (555) 123-4567',
      icon: 'call-outline',
      onPress: () => Linking.openURL('tel:+15551234567'),
    },
    {
      title: 'Website',
      subtitle: 'www.chatapp.com',
      icon: 'globe-outline',
      onPress: () => Linking.openURL('https://www.chatapp.com'),
    },
    {
      title: 'Twitter',
      subtitle: '@chatapp',
      icon: 'logo-twitter',
      onPress: () => Linking.openURL('https://twitter.com/chatapp'),
    },
    {
      title: 'Facebook',
      subtitle: 'ChatApp Official',
      icon: 'logo-facebook',
      onPress: () => Linking.openURL('https://facebook.com/chatapp'),
    },
  ];

  const renderContactMethod = ({ title, subtitle, icon, onPress }) => (
    <TouchableOpacity
      key={title}
      style={[styles.contactMethod, { backgroundColor: colors.surface }]}
      onPress={onPress}
    >
      <View style={styles.contactIcon}>
        <Ionicons name={icon} size={24} color={colors.primary} />
      </View>
      <View style={styles.contactInfo}>
        <Text style={[styles.contactTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.contactSubtitle, { color: colors.textSecondary }]}>
          {subtitle}
        </Text>
      </View>
      <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={styles.header}>
        <Text style={[styles.title, { color: colors.text }]}>Contact Us</Text>
        <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
          We're here to help! Reach out to us through any of these channels.
        </Text>
      </View>

      <View style={styles.contactList}>
        {contactMethods.map(renderContactMethod)}
      </View>

      <View style={[styles.officeInfo, { backgroundColor: colors.surface }]}>
        <Text style={[styles.officeTitle, { color: colors.text }]}>
          Office Location
        </Text>
        <Text style={[styles.officeAddress, { color: colors.textSecondary }]}>
          123 Tech Street{'\n'}
          Silicon Valley, CA 94025{'\n'}
          United States
        </Text>
        <TouchableOpacity
          style={[styles.mapButton, { backgroundColor: colors.primary }]}
          onPress={() => Linking.openURL('https://maps.google.com/?q=Silicon+Valley')}
        >
          <Text style={styles.mapButtonText}>Open in Maps</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.supportHours}>
        <Text style={[styles.supportTitle, { color: colors.text }]}>
          Support Hours
        </Text>
        <Text style={[styles.supportText, { color: colors.textSecondary }]}>
          Monday - Friday: 9:00 AM - 6:00 PM (PST){'\n'}
          Saturday: 10:00 AM - 4:00 PM (PST){'\n'}
          Sunday: Closed
        </Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  contactList: {
    marginTop: 20,
  },
  contactMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 12,
    borderRadius: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
  },
  officeInfo: {
    margin: 16,
    padding: 20,
    borderRadius: 12,
  },
  officeTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  officeAddress: {
    fontSize: 15,
    lineHeight: 22,
    marginBottom: 16,
  },
  mapButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
  },
  mapButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  supportHours: {
    margin: 16,
    marginTop: 8,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  supportText: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default ContactScreen;
