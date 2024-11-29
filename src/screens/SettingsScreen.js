import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, colors, toggleTheme } = useTheme();

  const renderSection = (title, content, icon, onPress, rightComponent = null) => (
    <TouchableOpacity 
      style={[styles.section, { borderBottomColor: colors.border, backgroundColor: colors.surface }]} 
      onPress={onPress}
    >
      <View style={styles.sectionIcon}>
        <Ionicons name={icon} size={22} color={colors.primary} />
      </View>
      <View style={styles.sectionContent}>
        <Text style={[styles.sectionTitle, { color: colors.text }]}>{title}</Text>
        {content && <Text style={[styles.sectionText, { color: colors.textSecondary }]}>{content}</Text>}
      </View>
      {rightComponent || (
        <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
      )}
    </TouchableOpacity>
  );

  const renderSwitch = (value, onValueChange) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#D1D1D6', true: colors.success }}
      ios_backgroundColor="#D1D1D6"
    />
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>App Settings</Text>
        {renderSection(
          'Theme',
          isDarkMode ? 'Dark' : 'Light',
          isDarkMode ? 'moon' : 'sunny-outline',
          toggleTheme,
          renderSwitch(isDarkMode, toggleTheme)
        )}
        {renderSection(
          'Chat Wallpaper',
          null,
          'image-outline',
          () => {}
        )}
        {renderSection(
          'Notifications',
          null,
          'notifications-outline',
          () => {},
          renderSwitch(true, () => {})
        )}
        {renderSection(
          'App Language',
          'English',
          'language-outline',
          () => {}
        )}
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>Data and Storage</Text>
        {renderSection(
          'Storage Usage',
          '1.2 GB',
          'server-outline',
          () => {}
        )}
        {renderSection(
          'Network Usage',
          '25.5 MB',
          'cellular-outline',
          () => {}
        )}
        {renderSection(
          'Auto-Download Media',
          'Wi-Fi and Cellular',
          'cloud-download-outline',
          () => {}
        )}
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>Help</Text>
        {renderSection(
          'FAQ',
          null,
          'help-circle-outline',
          () => {}
        )}
        {renderSection(
          'Contact Us',
          null,
          'mail-outline',
          () => {}
        )}
        {renderSection(
          'Privacy Policy',
          null,
          'shield-checkmark-outline',
          () => {}
        )}
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.textSecondary }]}>ChatApp v1.0.0</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsGroup: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  groupTitle: {
    fontSize: 14,
    marginLeft: 8,
    marginBottom: 8,
    marginTop: -12,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionContent: {
    flex: 1,
    marginLeft: 12,
  },
  sectionTitle: {
    fontSize: 16,
  },
  sectionText: {
    fontSize: 14,
    marginTop: 2,
  },
  logoutButton: {
    marginTop: 24,
    marginBottom: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    marginTop: 16,
    marginBottom: 32,
    fontSize: 14,
  },
});

export default SettingsScreen;