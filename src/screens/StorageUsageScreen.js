import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ProgressBar,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const StorageUsageScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [selectedTab, setSelectedTab] = useState('all');

  // Mock data - replace with real data in production
  const storageData = {
    total: 128, // GB
    used: 95.5,  // GB
    available: 32.5, // GB
    breakdown: {
      photos: 45.2,
      videos: 28.7,
      documents: 12.3,
      audio: 6.8,
      other: 2.5,
    },
    recentItems: [
      { type: 'video', name: 'Family Vacation.mp4', size: 1.2, date: '2 hours ago' },
      { type: 'photo', name: 'IMG_1234.jpg', size: 0.8, date: 'Yesterday' },
      { type: 'document', name: 'Project Report.pdf', size: 2.5, date: '3 days ago' },
    ],
  };

  const tabs = [
    { id: 'all', label: 'All', icon: 'apps-outline' },
    { id: 'photos', label: 'Photos', icon: 'image-outline' },
    { id: 'videos', label: 'Videos', icon: 'videocam-outline' },
    { id: 'docs', label: 'Documents', icon: 'document-text-outline' },
  ];

  const getStorageColor = (percentage) => {
    if (percentage > 90) return '#FF3B30';
    if (percentage > 70) return '#FF9500';
    return colors.primary;
  };

  const formatSize = (size) => {
    if (size >= 1) return `${size.toFixed(1)} GB`;
    return `${(size * 1024).toFixed(0)} MB`;
  };

  const renderStorageOverview = () => {
    const usedPercentage = (storageData.used / storageData.total) * 100;
    const storageColor = getStorageColor(usedPercentage);

    return (
      <View style={[styles.overviewContainer, { backgroundColor: colors.surface }]}>
        <View style={styles.storageHeader}>
          <Ionicons name="server-outline" size={24} color={colors.primary} />
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Storage Overview</Text>
        </View>
        
        <View style={styles.storageInfo}>
          <View style={styles.storageRing}>
            <Text style={[styles.storagePercentage, { color: storageColor }]}>
              {Math.round(usedPercentage)}%
            </Text>
            <Text style={[styles.storageLabel, { color: colors.textSecondary }]}>Used</Text>
          </View>
          
          <View style={styles.storageSummary}>
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {formatSize(storageData.used)}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Used</Text>
            </View>
            <View style={styles.summaryDivider} />
            <View style={styles.summaryItem}>
              <Text style={[styles.summaryValue, { color: colors.text }]}>
                {formatSize(storageData.available)}
              </Text>
              <Text style={[styles.summaryLabel, { color: colors.textSecondary }]}>Free</Text>
            </View>
          </View>
        </View>

        <View style={[styles.progressBar, { backgroundColor: colors.border }]}>
          <View 
            style={[
              styles.progressFill,
              { 
                width: `${usedPercentage}%`,
                backgroundColor: storageColor,
              }
            ]} 
          />
        </View>
      </View>
    );
  };

  const renderCategoryTabs = () => (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      style={styles.tabsContainer}
      contentContainerStyle={styles.tabsContent}
    >
      {tabs.map(({ id, label, icon }) => (
        <TouchableOpacity
          key={id}
          style={[
            styles.tab,
            selectedTab === id && {
              backgroundColor: colors.primary + '20',
              borderColor: colors.primary,
            },
            { backgroundColor: colors.surface }
          ]}
          onPress={() => setSelectedTab(id)}
        >
          <Ionicons
            name={icon}
            size={22}
            color={selectedTab === id ? colors.primary : colors.text}
          />
          <Text
            style={[
              styles.tabLabel,
              { color: selectedTab === id ? colors.primary : colors.text },
            ]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );

  const renderStorageBreakdown = () => (
    <View style={[styles.breakdownContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.breakdownHeader}>
        <Ionicons name="pie-chart-outline" size={24} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Storage Breakdown</Text>
      </View>
      {Object.entries(storageData.breakdown).map(([category, size]) => (
        <View key={category} style={styles.breakdownItem}>
          <View style={styles.breakdownInfo}>
            <Ionicons
              name={
                category === 'photos' ? 'image-outline' :
                category === 'videos' ? 'videocam-outline' :
                category === 'documents' ? 'document-outline' :
                category === 'audio' ? 'musical-notes-outline' : 'folder-outline'
              }
              size={22}
              color={colors.primary}
            />
            <Text style={[styles.breakdownCategory, { color: colors.text }]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </View>
          <Text style={[styles.breakdownSize, { color: colors.text }]}>
            {formatSize(size)}
          </Text>
        </View>
      ))}
    </View>
  );

  const renderRecentItems = () => (
    <View style={[styles.recentContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.recentHeader}>
        <Ionicons name="time-outline" size={24} color={colors.primary} />
        <Text style={[styles.sectionTitle, { color: colors.text }]}>Recent Items</Text>
      </View>
      {storageData.recentItems.map((item, index) => (
        <TouchableOpacity 
          key={index}
          style={styles.recentItem}
          onPress={() => {/* Handle item press */}}
        >
          <View style={styles.recentInfo}>
            <Ionicons
              name={
                item.type === 'video' ? 'videocam-outline' :
                item.type === 'photo' ? 'image-outline' : 'document-outline'
              }
              size={22}
              color={colors.primary}
            />
            <View style={styles.recentDetails}>
              <Text style={[styles.recentName, { color: colors.text }]}>{item.name}</Text>
              <Text style={[styles.recentMeta, { color: colors.textSecondary }]}>
                {formatSize(item.size)} • {item.date}
              </Text>
            </View>
          </View>
          <TouchableOpacity
            style={[styles.deleteButton, { backgroundColor: colors.primary + '20' }]}
            onPress={() => {/* Handle delete */}}
          >
            <Ionicons name="trash-outline" size={18} color={colors.primary} />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {renderStorageOverview()}
      {renderCategoryTabs()}
      {renderStorageBreakdown()}
      {renderRecentItems()}

      <TouchableOpacity
        style={[styles.cleanupButton, { backgroundColor: colors.primary }]}
        activeOpacity={0.7}
      >
        <Ionicons name="trash-outline" size={22} color="#FFF" />
        <Text style={styles.cleanupButtonText}>Clean Up Storage</Text>
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
  overviewContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  storageHeader: {
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
  storageInfo: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
  },
  storageRing: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 8,
    borderColor: '#E5E5EA',
    marginRight: 16,
  },
  storagePercentage: {
    fontSize: 24,
    fontWeight: '700',
  },
  storageLabel: {
    fontSize: 14,
    marginTop: 4,
  },
  storageSummary: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
  },
  summaryDivider: {
    width: 1,
    backgroundColor: '#E5E5EA',
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
    overflow: 'hidden',
    marginHorizontal: 16,
    marginBottom: 16,
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  tabsContainer: {
    marginBottom: 16,
  },
  tabsContent: {
    paddingHorizontal: 16,
  },
  tab: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  tabLabel: {
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
  breakdownContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  breakdownHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  breakdownItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  breakdownInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breakdownCategory: {
    fontSize: 16,
    marginLeft: 12,
  },
  breakdownSize: {
    fontSize: 16,
    fontWeight: '500',
  },
  recentContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  recentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  recentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  recentInfo: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 16,
  },
  recentDetails: {
    marginLeft: 12,
  },
  recentName: {
    fontSize: 16,
    marginBottom: 4,
  },
  recentMeta: {
    fontSize: 14,
  },
  deleteButton: {
    padding: 8,
    borderRadius: 8,
  },
  cleanupButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 16,
    padding: 16,
    borderRadius: 12,
  },
  cleanupButtonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default StorageUsageScreen;
