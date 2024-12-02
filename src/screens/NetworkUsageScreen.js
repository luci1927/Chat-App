import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const NetworkUsageScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const [timeRange, setTimeRange] = useState('month'); // 'week', 'month', 'year'

  const usageData = {
    total: {
      sent: 5.8, // GB
      received: 8.2, // GB
    },
    breakdown: {
      messages: 0.5,
      media: 8.9,
      calls: 3.8,
      status: 0.8,
    },
    history: [
      { month: 'Jan', data: 12.5 },
      { month: 'Feb', data: 8.7 },
      { month: 'Mar', data: 15.2 },
      { month: 'Apr', data: 10.1 },
      { month: 'May', data: 14.3 },
      { month: 'Jun', data: 9.8 },
    ],
  };

  const renderTimeRangeSelector = () => (
    <View style={[styles.timeRangeContainer, { backgroundColor: colors.surface }]}>
      {['week', 'month', 'year'].map((range) => (
        <TouchableOpacity
          key={range}
          style={[
            styles.timeRangeButton,
            timeRange === range && { 
              backgroundColor: colors.primary + '20',
              borderColor: colors.primary,
            },
          ]}
          onPress={() => setTimeRange(range)}
        >
          <Text style={[
            styles.timeRangeText,
            { color: timeRange === range ? colors.primary : colors.text },
          ]}>
            {range.charAt(0).toUpperCase() + range.slice(1)}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );

  const renderTotalUsage = () => (
    <View style={[styles.statsContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.statsHeader}>
        <Ionicons name="bar-chart-outline" size={24} color={colors.primary} />
        <Text style={[styles.statsTitle, { color: colors.text }]}>Total Usage</Text>
      </View>
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>{usageData.total.sent} GB</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Sent</Text>
          <Ionicons name="arrow-up" size={20} color={colors.primary} />
        </View>
        <View style={[styles.statDivider, { backgroundColor: colors.border }]} />
        <View style={styles.statItem}>
          <Text style={[styles.statValue, { color: colors.text }]}>{usageData.total.received} GB</Text>
          <Text style={[styles.statLabel, { color: colors.textSecondary }]}>Received</Text>
          <Ionicons name="arrow-down" size={20} color={colors.primary} />
        </View>
      </View>
    </View>
  );

  const renderUsageBreakdown = () => (
    <View style={[styles.breakdownContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.breakdownHeader}>
        <Ionicons name="pie-chart-outline" size={24} color={colors.primary} />
        <Text style={[styles.breakdownTitle, { color: colors.text }]}>Usage Breakdown</Text>
      </View>
      {Object.entries(usageData.breakdown).map(([category, amount]) => (
        <View key={category} style={styles.breakdownItem}>
          <View style={styles.breakdownInfo}>
            <Ionicons 
              name={
                category === 'messages' ? 'chatbubble-outline' :
                category === 'media' ? 'image-outline' :
                category === 'calls' ? 'call-outline' : 'time-outline'
              } 
              size={20} 
              color={colors.primary} 
            />
            <Text style={[styles.breakdownCategory, { color: colors.text }]}>
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </Text>
          </View>
          <Text style={[styles.breakdownAmount, { color: colors.text }]}>
            {amount} GB
          </Text>
        </View>
      ))}
    </View>
  );

  const renderUsageHistory = () => (
    <View style={[styles.historyContainer, { backgroundColor: colors.surface }]}>
      <View style={styles.historyHeader}>
        <Ionicons name="trending-up-outline" size={24} color={colors.primary} />
        <Text style={[styles.historyTitle, { color: colors.text }]}>Usage History</Text>
      </View>
      <View style={styles.historyChart}>
        {usageData.history.map((item, index) => (
          <View key={index} style={styles.historyBar}>
            <View 
              style={[
                styles.historyBarFill, 
                { 
                  height: `${(item.data / 20) * 100}%`,
                  backgroundColor: colors.primary,
                },
              ]} 
            />
            <Text style={[styles.historyLabel, { color: colors.textSecondary }]}>
              {item.month}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.contentContainer}
    >
      {renderTimeRangeSelector()}
      {renderTotalUsage()}
      {renderUsageBreakdown()}
      {renderUsageHistory()}

      <TouchableOpacity
        style={[styles.resetButton, { 
          backgroundColor: colors.surface,
          borderColor: colors.border,
        }]}
        activeOpacity={0.7}
      >
        <Text style={[styles.resetButtonText, { color: '#FF3B30' }]}>
          Reset Usage Statistics
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
  timeRangeContainer: {
    flexDirection: 'row',
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    padding: 4,
  },
  timeRangeButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: 'transparent',
    marginHorizontal: 4,
  },
  timeRangeText: {
    fontSize: 14,
    fontWeight: '600',
  },
  statsContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  statsHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  statsTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
  },
  statsGrid: {
    flexDirection: 'row',
    padding: 16,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
    marginBottom: 4,
  },
  statDivider: {
    width: StyleSheet.hairlineWidth,
    marginHorizontal: 16,
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
  breakdownTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
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
  breakdownAmount: {
    fontSize: 16,
    fontWeight: '500',
  },
  historyContainer: {
    margin: 16,
    borderRadius: 12,
    overflow: 'hidden',
  },
  historyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  historyTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
  },
  historyChart: {
    flexDirection: 'row',
    height: 200,
    padding: 16,
    alignItems: 'flex-end',
  },
  historyBar: {
    flex: 1,
    alignItems: 'center',
    height: '100%',
    justifyContent: 'flex-end',
  },
  historyBarFill: {
    width: 8,
    borderRadius: 4,
    marginBottom: 8,
  },
  historyLabel: {
    fontSize: 12,
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

export default NetworkUsageScreen;
