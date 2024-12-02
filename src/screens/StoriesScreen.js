import React, { useRef, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  TouchableOpacity, 
  Image, 
  Dimensions,
  Animated,
  Platform,
  Pressable 
} from 'react-native';
import { Ionicons, MaterialCommunityIcons, Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { LinearGradient } from 'expo-linear-gradient';

const StoriesScreen = () => {
  const { colors, isDarkMode } = useTheme();
  const windowWidth = Dimensions.get('window').width;
  const scrollY = useRef(new Animated.Value(0)).current;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    scrollView: {
      flex: 1,
    },
    section: {
      marginBottom: 8,
    },
    sectionHeader: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    sectionTitle: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
      letterSpacing: 0.5,
      textTransform: 'uppercase',
    },
    myStatus: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.surface,
      marginBottom: 1,
    },
    profileImageContainer: {
      position: 'relative',
      marginRight: 15,
    },
    profileImage: {
      width: 56,
      height: 56,
      borderRadius: 28,
      backgroundColor: isDarkMode ? colors.border : '#f0f0f0',
    },
    addButton: {
      position: 'absolute',
      bottom: -4,
      right: -4,
      backgroundColor: colors.primary,
      borderRadius: 16,
      width: 28,
      height: 28,
      justifyContent: 'center',
      alignItems: 'center',
      borderWidth: 3,
      borderColor: colors.surface,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    statusInfo: {
      flex: 1,
    },
    statusTitle: {
      fontSize: 17,
      fontWeight: '600',
      color: colors.text,
      marginBottom: 3,
      letterSpacing: 0.1,
    },
    statusSubtitle: {
      fontSize: 14,
      color: colors.textSecondary,
      letterSpacing: 0.1,
    },
    updateItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
    },
    statusRing: {
      width: 60,
      height: 60,
      borderRadius: 30,
      padding: 2,
      marginRight: 15,
    },
    statusRingGradient: {
      width: '100%',
      height: '100%',
      borderRadius: 30,
      padding: 2,
      justifyContent: 'center',
      alignItems: 'center',
    },
    viewedStatusRing: {
      backgroundColor: colors.textSecondary,
      opacity: 0.3,
    },
    channelSection: {
      marginTop: 20,
    },
    channelHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 16,
      paddingVertical: 12,
      backgroundColor: colors.background,
    },
    channelHeaderLeft: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    channelTitle: {
      fontSize: 14,
      color: colors.textSecondary,
      fontWeight: '600',
      letterSpacing: 0.5,
      marginRight: 8,
      textTransform: 'uppercase',
    },
    channelBadge: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 3,
      borderRadius: 12,
    },
    channelBadgeText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
      letterSpacing: 0.5,
    },
    findMore: {
      color: colors.primary,
      fontSize: 14,
      fontWeight: '600',
      letterSpacing: 0.3,
    },
    channelItem: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.surface,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
    },
    channelIcon: {
      width: 56,
      height: 56,
      borderRadius: 28,
      marginRight: 15,
      justifyContent: 'center',
      alignItems: 'center',
    },
    channelIconGradient: {
      width: '100%',
      height: '100%',
      borderRadius: 28,
      justifyContent: 'center',
      alignItems: 'center',
    },
    divider: {
      height: 8,
      backgroundColor: colors.background,
    },
    actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      backgroundColor: colors.surface,
    },
    actionButtonText: {
      marginLeft: 12,
      color: colors.primary,
      fontSize: 16,
      fontWeight: '500',
      letterSpacing: 0.3,
    },
    timeText: {
      fontSize: 13,
      color: colors.textSecondary,
      marginTop: 2,
      letterSpacing: 0.1,
    },
    updateCount: {
      backgroundColor: colors.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 10,
      marginLeft: 'auto',
    },
    updateCountText: {
      color: '#fff',
      fontSize: 12,
      fontWeight: '600',
    },
    ripple: {
      color: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
    },
  });

  const recentUpdates = [
    { id: 1, name: 'John Doe', time: '10 minutes ago', updates: 2 },
    { id: 2, name: 'Jane Smith', time: '25 minutes ago', updates: 1 },
  ];

  const viewedUpdates = [
    { id: 3, name: 'Mike Johnson', time: '2 hours ago', updates: 3 },
    { id: 4, name: 'Sarah Wilson', time: 'Today, 2:30 PM', updates: 1 },
  ];

  const channels = [
    { 
      id: 1, 
      name: 'Tech News Daily', 
      followers: '1.2M followers', 
      isOfficial: true,
      gradient: ['#FF6B6B', '#FF8E53']
    },
    { 
      id: 2, 
      name: 'Sports Updates', 
      followers: '856K followers', 
      isOfficial: true,
      gradient: ['#4E65FF', '#92EFFD']
    },
  ];

  const renderStatusItem = (item, isViewed = false) => (
    <Pressable 
      key={item.id} 
      style={styles.updateItem}
      android_ripple={styles.ripple}
    >
      <View style={[styles.statusRing]}>
        {!isViewed ? (
          <LinearGradient
            colors={['#FF5F6D', '#FFC371']}
            style={styles.statusRingGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <View style={styles.profileImage} />
          </LinearGradient>
        ) : (
          <View style={[styles.statusRingGradient, styles.viewedStatusRing]}>
            <View style={styles.profileImage} />
          </View>
        )}
      </View>
      <View style={styles.statusInfo}>
        <Text style={styles.statusTitle}>{item.name}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      {item.updates > 1 && (
        <View style={styles.updateCount}>
          <Text style={styles.updateCountText}>{item.updates}</Text>
        </View>
      )}
    </Pressable>
  );

  const renderChannelItem = (channel) => (
    <Pressable 
      key={channel.id} 
      style={styles.channelItem}
      android_ripple={styles.ripple}
    >
      <View style={styles.channelIcon}>
        <LinearGradient
          colors={channel.gradient}
          style={styles.channelIconGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <MaterialCommunityIcons name="newspaper-variant-outline" size={24} color="white" />
        </LinearGradient>
      </View>
      <View style={styles.statusInfo}>
        <Text style={styles.statusTitle}>{channel.name}</Text>
        <Text style={styles.statusSubtitle}>{channel.followers}</Text>
      </View>
      {channel.isOfficial && (
        <Ionicons 
          name="checkmark-circle" 
          size={24} 
          color={colors.primary} 
          style={{ marginLeft: 'auto' }}
        />
      )}
    </Pressable>
  );

  return (
    <Animated.ScrollView 
      style={styles.container}
      contentContainerStyle={styles.scrollView}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true }
      )}
      scrollEventThrottle={16}
    >
      <View style={styles.section}>
        <Pressable 
          style={styles.myStatus}
          android_ripple={styles.ripple}
        >
          <View style={styles.profileImageContainer}>
            <View style={styles.profileImage} />
            <View style={styles.addButton}>
              <Feather name="plus" size={16} color="white" />
            </View>
          </View>
          <View style={styles.statusInfo}>
            <Text style={styles.statusTitle}>My status</Text>
            <Text style={styles.statusSubtitle}>Tap to add status update</Text>
          </View>
          <Ionicons 
            name="camera-outline" 
            size={24} 
            color={colors.primary}
            style={{ marginLeft: 'auto' }}
          />
        </Pressable>
      </View>

      {recentUpdates.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Recent updates</Text>
          </View>
          {recentUpdates.map(item => renderStatusItem(item))}
        </View>
      )}

      {viewedUpdates.length > 0 && (
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Viewed updates</Text>
          </View>
          {viewedUpdates.map(item => renderStatusItem(item, true))}
        </View>
      )}

      <View style={styles.channelSection}>
        <View style={styles.channelHeader}>
          <View style={styles.channelHeaderLeft}>
            <Text style={styles.channelTitle}>Channels</Text>
            <View style={styles.channelBadge}>
              <Text style={styles.channelBadgeText}>NEW</Text>
            </View>
          </View>
          <Pressable android_ripple={styles.ripple}>
            <Text style={styles.findMore}>Find more</Text>
          </Pressable>
        </View>
        {channels.map(channel => renderChannelItem(channel))}
      </View>

      <View style={styles.divider} />

      <Pressable 
        style={styles.actionButton}
        android_ripple={styles.ripple}
      >
        <Ionicons name="lock-closed-outline" size={24} color={colors.primary} />
        <Text style={styles.actionButtonText}>Status privacy</Text>
      </Pressable>
    </Animated.ScrollView>
  );
};

export default StoriesScreen;
