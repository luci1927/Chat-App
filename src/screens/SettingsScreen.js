import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Platform,
  Modal,
  Pressable,
  FlatList,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const LANGUAGES = [
  { id: 'en', name: 'English', local: 'English' },
  { id: 'es', name: 'Spanish', local: 'Español' },
  { id: 'fr', name: 'French', local: 'Français' },
  { id: 'de', name: 'German', local: 'Deutsch' },
  { id: 'it', name: 'Italian', local: 'Italiano' },
  { id: 'pt', name: 'Portuguese', local: 'Português' },
  { id: 'ru', name: 'Russian', local: 'Русский' },
  { id: 'zh', name: 'Chinese', local: '中文' },
  { id: 'ja', name: 'Japanese', local: '日本語' },
  { id: 'ko', name: 'Korean', local: '한국어' },
  { id: 'ar', name: 'Arabic', local: 'العربية' },
  { id: 'hi', name: 'Hindi', local: 'हिन्दी' },
];

const SettingsScreen = ({ navigation }) => {
  const { isDarkMode, colors, toggleTheme, themeMode, setThemePreference } = useTheme();

  const [isLanguageModalVisible, setIsLanguageModalVisible] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(LANGUAGES[0]);
  const [autoDownloadSettings, setAutoDownloadSettings] = useState({
    mobileData: {
      photos: true,
      audio: false,
      videos: false,
      documents: true,
    },
    wifi: {
      photos: true,
      audio: true,
      videos: true,
      documents: true,
    },
    roaming: {
      photos: false,
      audio: false,
      videos: false,
      documents: false,
    }
  });

  const toggleAutoDownload = (network, type) => {
    setAutoDownloadSettings(prev => ({
      ...prev,
      [network]: {
        ...prev[network],
        [type]: !prev[network][type],
      },
    }));
  };

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
      {rightComponent}
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

  const renderThemeSection = () => {
    const [showModal, setShowModal] = useState(false);

    const ThemeModal = () => (
      <Modal
        animationType="fade"
        transparent={true}
        visible={showModal}
        onRequestClose={() => setShowModal(false)}
      >
        <Pressable 
          style={styles.modalOverlay} 
          onPress={() => setShowModal(false)}
        >
          <Pressable style={[styles.modalContent, { backgroundColor: colors.surface }]}>
            <Text style={[styles.modalTitle, { color: colors.text }]}>Choose Theme</Text>
            
            <TouchableOpacity
              style={[
                styles.themeOption,
              ]}
              onPress={() => {
                setThemePreference('system');
                setShowModal(false);
              }}
            >
              <View style={styles.themeOptionContent}>
                <View style={styles.themeOptionLeft}>
                  <Ionicons 
                    name="phone-portrait-outline" 
                    size={24} 
                    color={colors.primary} 
                  />
                  <View style={styles.themeOptionText}>
                    <Text style={[styles.themeOptionTitle, { color: colors.text }]}>
                      System
                    </Text>
                    <Text style={[styles.themeOptionSubtitle, { color: colors.textSecondary }]}>
                      Match system settings
                    </Text>
                  </View>
                </View>
                {themeMode === 'system' && (
                  <Ionicons name="checkmark" size={24} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.themeOption,
              ]}
              onPress={() => {
                setThemePreference('light');
                setShowModal(false);
              }}
            >
              <View style={styles.themeOptionContent}>
                <View style={styles.themeOptionLeft}>
                  <Ionicons 
                    name="sunny-outline" 
                    size={24} 
                    color={colors.primary} 
                  />
                  <View style={styles.themeOptionText}>
                    <Text style={[styles.themeOptionTitle, { color: colors.text }]}>
                      Light
                    </Text>
                    <Text style={[styles.themeOptionSubtitle, { color: colors.textSecondary }]}>
                      Always light theme
                    </Text>
                  </View>
                </View>
                {themeMode === 'light' && (
                  <Ionicons name="checkmark" size={24} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.themeOption}
              onPress={() => {
                setThemePreference('dark');
                setShowModal(false);
              }}
            >
              <View style={styles.themeOptionContent}>
                <View style={styles.themeOptionLeft}>
                  <Ionicons 
                    name="moon-outline" 
                    size={24} 
                    color={colors.primary} 
                  />
                  <View style={styles.themeOptionText}>
                    <Text style={[styles.themeOptionTitle, { color: colors.text }]}>
                      Dark
                    </Text>
                    <Text style={[styles.themeOptionSubtitle, { color: colors.textSecondary }]}>
                      Always dark theme
                    </Text>
                  </View>
                </View>
                {themeMode === 'dark' && (
                  <Ionicons name="checkmark" size={24} color={colors.primary} />
                )}
              </View>
            </TouchableOpacity>
          </Pressable>
        </Pressable>
      </Modal>
    );

    const getThemeText = () => {
      switch (themeMode) {
        case 'system':
          return 'System default';
        case 'light':
          return 'Light';
        case 'dark':
          return 'Dark';
        default:
          return 'System default';
      }
    };

    return (
      <View>
        {renderSection(
          'Theme',
          getThemeText(),
          isDarkMode ? 'moon' : 'sunny-outline',
          () => setShowModal(true),
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        )}
        <ThemeModal />
      </View>
    );
  };

  const renderLanguageItem = ({ item }) => (
    <TouchableOpacity
      style={[styles.languageItem, { 
        backgroundColor: colors.surface,
        borderBottomColor: colors.border,
        borderBottomWidth: StyleSheet.hairlineWidth,
      }]}
      onPress={() => {
        setSelectedLanguage(item);
        setIsLanguageModalVisible(false);
      }}
    >
      <View style={styles.languageInfo}>
        <Text style={[styles.languageName, { color: colors.text }]}>
          {item.name}
        </Text>
        <Text style={[styles.languageLocal, { color: colors.textSecondary }]}>
          {item.local}
        </Text>
      </View>
      {selectedLanguage.id === item.id && (
        <Ionicons name="checkmark" size={24} color={colors.primary} />
      )}
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
    <ScrollView style={[styles.container, { backgroundColor: colors.background }]}>
      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>App Settings</Text>
        {renderThemeSection()}
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
        <TouchableOpacity
          style={[styles.section, { borderBottomColor: colors.border, backgroundColor: colors.surface }]}
          onPress={() => setIsLanguageModalVisible(true)}
        >
          <View style={styles.sectionIcon}>
            <Ionicons name="language-outline" size={22} color={colors.primary} />
          </View>
          <View style={styles.sectionContent}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>App Language</Text>
            <Text style={[styles.sectionText, { color: colors.textSecondary }]}>{selectedLanguage.name}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color={colors.textSecondary} />
        </TouchableOpacity>
        {renderSection(
          'Auto-Download Media',
          'Manage media auto-download settings',
          'cloud-download-outline',
          () => navigation.navigate('AutoDownload'),
          <View style={styles.autoDownloadSummary}>
            <Text style={[styles.autoDownloadText, { color: colors.textSecondary }]}>
              Photos: {Object.entries(autoDownloadSettings)
                .filter(([network, settings]) => settings.photos)
                .map(([network]) => network === 'wifi' ? 'Wi-Fi' : network === 'mobileData' ? 'Mobile' : 'Roaming')
                .join(', ')}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        <Text style={[styles.groupTitle, { color: colors.textSecondary }]}>Data and Storage</Text>
        {renderSection(
          'Storage Usage',
          '1.2 GB',
          'server-outline',
          () => navigation.navigate('StorageUsage')
        )}
        {renderSection(
          'Network Usage',
          '25.5 MB',
          'cellular-outline',
          () => navigation.navigate('NetworkUsage')
        )}
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        {renderSection(
          'Help',
          'Get support and learn more',
          'help-circle-outline',
          () => navigation.navigate('Help')
        )}
      </View>

      <View style={[styles.settingsGroup, { backgroundColor: colors.surface }]}>
        {renderSection(
          'Privacy Policy',
          null,
          'shield-checkmark-outline',
          () => navigation.navigate('PrivacyPolicy')
        )}
        {renderSection(
          'Terms of Service',
          null,
          'document-text-outline',
          () => navigation.navigate('TermsOfService')
        )}
      </View>

      <TouchableOpacity 
        style={[styles.logoutButton, { backgroundColor: colors.surface }]}
      >
        <Text style={[styles.logoutText, { color: colors.danger }]}>Log Out</Text>
      </TouchableOpacity>

      <Text style={[styles.version, { color: colors.textSecondary }]}>ChatApp v1.0.0</Text>

      <Modal
        visible={isLanguageModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsLanguageModalVisible(false)}
      >
        <View style={[styles.modalContainer, { backgroundColor: colors.background }]}>
          <View style={[styles.modalHeader, { 
            backgroundColor: colors.surface,
            borderBottomColor: colors.border,
            borderBottomWidth: StyleSheet.hairlineWidth,
          }]}>
            <TouchableOpacity
              onPress={() => setIsLanguageModalVisible(false)}
              style={styles.closeButton}
            >
              <Ionicons name="close" size={24} color={colors.primary} />
            </TouchableOpacity>
            <Text style={[styles.modalTitle, { color: colors.text }]}>
              App Language
            </Text>
            <View style={styles.closeButton} />
          </View>
          <FlatList
            data={LANGUAGES}
            renderItem={renderLanguageItem}
            keyExtractor={item => item.id}
            style={{ flex: 1 }}
          />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  settingsGroup: {
    marginTop: 24,
    borderRadius: 8,
    marginHorizontal: 16,
    overflow: 'hidden',
  },
  groupTitle: {
    fontSize: 14,
    fontWeight: '500',
    marginLeft: 16,
    marginBottom: 8,
    marginTop: 8,
  },
  section: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionIcon: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  sectionContent: {
    flex: 1,
    marginRight: 12,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
  sectionText: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  logoutButton: {
    marginTop: 24,
    marginHorizontal: 16,
    borderRadius: 8,
    paddingVertical: 16,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: '500',
  },
  version: {
    textAlign: 'center',
    fontSize: 14,
    marginTop: 16,
    marginBottom: 32,
    opacity: 0.7,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  modalContent: {
    borderRadius: 16,
    paddingVertical: 20,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  themeOption: {
    paddingVertical: 16,
    paddingHorizontal: 20,
  },
  themeOptionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  themeOptionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  themeOptionText: {
    marginLeft: 16,
    flex: 1,
  },
  themeOptionTitle: {
    fontSize: 17,
    fontWeight: '500',
    marginBottom: 2,
  },
  themeOptionSubtitle: {
    fontSize: 14,
  },
  modalContainer: {
    flex: 1,
    marginTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    overflow: 'hidden',
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  closeButton: {
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  languageItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  languageInfo: {
    flex: 1,
  },
  languageName: {
    fontSize: 16,
    marginBottom: 4,
  },
  languageLocal: {
    fontSize: 14,
  },
  autoDownloadSummary: {
    flex: 1,
    marginLeft: 8,
  },
  autoDownloadText: {
    fontSize: 13,
  },
});

export default SettingsScreen;