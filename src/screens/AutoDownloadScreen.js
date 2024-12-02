import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
  Animated,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const AutoDownloadScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('mobile');

  const [settings, setSettings] = useState({
    mobile: {
      photos: true,
      audio: true,
      videos: false,
      documents: true,
      maxSize: 15, // MB
      autoPlayVideos: true,
      highQualityPreview: false,
    },
    wifi: {
      photos: true,
      audio: true,
      videos: true,
      documents: true,
      maxSize: 50, // MB
      autoPlayVideos: true,
      highQualityPreview: true,
    },
    roaming: {
      photos: false,
      audio: false,
      videos: false,
      documents: false,
      maxSize: 5, // MB
      autoPlayVideos: false,
      highQualityPreview: false,
    },
  });

  const networkTypes = [
    { id: 'mobile', icon: 'cellular-outline', label: 'Mobile Data' },
    { id: 'wifi', icon: 'wifi-outline', label: 'Wi-Fi' },
    { id: 'roaming', icon: 'airplane-outline', label: 'Roaming' },
  ];

  const mediaTypes = [
    { id: 'photos', icon: 'image-outline', label: 'Photos', description: 'Images and profile pictures' },
    { id: 'audio', icon: 'musical-notes-outline', label: 'Audio', description: 'Voice messages and audio files' },
    { id: 'videos', icon: 'videocam-outline', label: 'Videos', description: 'Video messages and shared videos' },
    { id: 'documents', icon: 'document-outline', label: 'Documents', description: 'PDF, DOC, and other files' },
  ];

  const toggleSetting = (type, setting) => {
    setSettings(prev => ({
      ...prev,
      [activeTab]: {
        ...prev[activeTab],
        [setting]: !prev[activeTab][setting],
      },
    }));
  };

  const renderNetworkTabs = () => (
    <View style={[styles.tabContainer, { backgroundColor: colors.surface }]}>
      {networkTypes.map(({ id, icon, label }) => (
        <TouchableOpacity
          key={id}
          style={[
            styles.tab,
            activeTab === id && {
              backgroundColor: colors.primary + '20',
              borderColor: colors.primary,
            },
          ]}
          onPress={() => setActiveTab(id)}
        >
          <Ionicons
            name={icon}
            size={22}
            color={activeTab === id ? colors.primary : colors.text}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: activeTab === id ? colors.primary : colors.text },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderQuickSettings = () => (
    <View style={[styles.quickSettingsContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.quickSettingsHeader}>
        <Ionicons name="flash-outline" size={22} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Quick Settings</Text>
      </View>
      <View style={styles.quickSettingsContent}>
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>Auto-Play Videos</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Automatically play videos in chat
            </Text>
          </View>
          <Switch
            value={settings[activeTab].autoPlayVideos}
            onValueChange={() => toggleSetting(activeTab, 'autoPlayVideos')}
          />
        </View>
        <View style={[styles.settingDivider, { backgroundColor: colors.border }]} />
        <View style={styles.settingRow}>
          <View style={styles.settingInfo}>
            <Text style={[styles.settingLabel, { color: colors.text }]}>High Quality Preview</Text>
            <Text style={[styles.settingDescription, { color: colors.textSecondary }]}>
              Show higher quality media previews
            </Text>
          </View>
          <Switch
            value={settings[activeTab].highQualityPreview}
            onValueChange={() => toggleSetting(activeTab, 'highQualityPreview')}
          />
        </View>
      </View>
    </View>
  );

  const renderMediaTypeSettings = () => (
    <View style={[styles.mediaSettingsContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.mediaSettingsHeader}>
        <Ionicons name="download-outline" size={22} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Media Auto-Download</Text>
      </View>
      {mediaTypes.map(({ id, icon, label, description }) => (
        <View key={id} style={styles.mediaSettingRow}>
          <View style={styles.mediaSettingInfo}>
            <View style={styles.mediaSettingHeader}>
              <Ionicons name={icon} size={22} color={colors.primary} />
              <Text style={[styles.mediaSettingLabel, { color: colors.text }]}>{label}</Text>
            </View>
            <Text style={[styles.mediaSettingDescription, { color: colors.textSecondary }]}>
              {description}
            </Text>
          </View>
          <Switch
            value={settings[activeTab][id]}
            onValueChange={() => toggleSetting(activeTab, id)}
          />
        </View>
      ))}
    </View>
  );

  const renderSizeLimit = () => (
    <View style={[styles.sizeLimitContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.sizeLimitHeader}>
        <Ionicons name="resize-outline" size={22} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Size Limit</Text>
      </View>
      <View style={styles.sizeLimitContent}>
        <Text style={[styles.sizeLimitValue, { color: colors.text }]}>
          {settings[activeTab].maxSize} MB
        </Text>
        <Text style={[styles.sizeLimitDescription, { color: colors.textSecondary }]}>
          Maximum size for auto-downloading media
        </Text>
      </View>
    </View>
  );

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {renderNetworkTabs()}
      {renderQuickSettings()}
      {renderMediaTypeSettings()}
      {renderSizeLimit()}

      <TouchableOpacity
        style={[styles.resetButton, {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }]}
        activeOpacity={0.7}
      >
        <Text style={[styles.resetButtonText, { color: '#FF3B30' }]}>
          Reset to Default Settings
        </Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 24,
  },
  tabContainer: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    padding: 8,
  },
  tab: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginHorizontal: 4,
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  quickSettingsContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  quickSettingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  quickSettingsContent: {
    padding: 16,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  settingDescription: {
    fontSize: 14,
    lineHeight: 18,
  },
  settingDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 16,
  },
  mediaSettingsContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  mediaSettingsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
  },
  mediaSettingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  mediaSettingInfo: {
    flex: 1,
    marginRight: 16,
  },
  mediaSettingHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  mediaSettingLabel: {
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 12,
  },
  mediaSettingDescription: {
    fontSize: 14,
    lineHeight: 18,
    marginLeft: 34,
  },
  sizeLimitContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  sizeLimitHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  sizeLimitContent: {
    padding: 16,
    alignItems: 'center',
  },
  sizeLimitValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 8,
  },
  sizeLimitDescription: {
    fontSize: 14,
    textAlign: 'center',
  },
  resetButton: {
    marginHorizontal: 16,
    marginTop: 8,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: StyleSheet.hairlineWidth,
  },
  resetButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AutoDownloadScreen;
