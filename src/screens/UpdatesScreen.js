import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  Pressable,
  TextInput,
  ScrollView
} from 'react-native';
import { Ionicons, Feather } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const UpdatesScreen = () => {
  const { colors } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    header: {
      backgroundColor: colors.surface,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },
    headerTitle: {
      fontSize: 20,
      fontWeight: '700',
      color: colors.text,
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      margin: 16,
      borderRadius: 8,
      paddingHorizontal: 10,
      paddingVertical: 8,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 2,
    },
    searchInput: {
      flex: 1,
      color: colors.text,
      marginLeft: 8,
    },
    storyCarousel: {
      paddingVertical: 10,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
      backgroundColor: colors.surface,
      height: 50,
    },
    storyItem: {
      width: 80,
      alignItems: 'center',
      marginHorizontal: 8,
    },
    storyImage: {
      width: 80,
      height: 100,
      borderRadius: 20,
      marginBottom: 5,
      backgroundColor: colors.border,
    },
    storyName: {
      fontSize: 12,
      color: colors.text,
      marginBottom: 0,
    },
    updateList: {
      paddingHorizontal: 16,
      paddingTop: 10,
    },
    updateItem: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: 12,
      borderBottomWidth: 0.5,
      borderBottomColor: colors.border,
    },
    profileImage: {
      width: 60,
      height: 60,
      borderRadius: 30,
      marginRight: 15,
      backgroundColor: colors.border,
    },
    statusInfo: {
      flex: 1,
    },
    statusTitle: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.text,
    },
    timeText: {
      fontSize: 14,
      color: colors.textSecondary,
      marginTop: 2,
    },
    actionButton: {
      backgroundColor: colors.primary,
      borderRadius: 20,
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      marginHorizontal: 5,
    },
    actionButtonContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginVertical: 10,
    },
  });

  const stories = [
    { id: 1, name: 'John', image: 'https://via.placeholder.com/60' },
    { id: 2, name: 'Jane', image: 'https://via.placeholder.com/60' },
    { id: 3, name: 'Mike', image: 'https://via.placeholder.com/60' },
    { id: 4, name: 'Sarah', image: 'https://via.placeholder.com/60' },
  ];

  const updates = [
    { id: 1, name: 'John Doe', time: '10 minutes ago', image: 'https://via.placeholder.com/60' },
    { id: 2, name: 'Jane Smith', time: '25 minutes ago', image: 'https://via.placeholder.com/60' },
    { id: 3, name: 'Mike Johnson', time: '2 hours ago', image: 'https://via.placeholder.com/60' },
    { id: 4, name: 'Sarah Wilson', time: 'Today, 2:30 PM', image: 'https://via.placeholder.com/60' },
  ];

  const renderStoryItem = ({ item }) => (
    <View style={styles.storyItem} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.storyImage} />
      <Text style={styles.storyName}>{item.name}</Text>
    </View>
  );

  const renderUpdateItem = ({ item }) => (
    <Pressable style={styles.updateItem} android_ripple={{ color: colors.ripple }} key={item.id}>
      <Image source={{ uri: item.image }} style={styles.profileImage} />
      <View style={styles.statusInfo}>
        <Text style={styles.statusTitle}>{item.name}</Text>
        <Text style={styles.timeText}>{item.time}</Text>
      </View>
      <Ionicons 
        name="chevron-forward" 
        size={24} 
        color={colors.textSecondary}
        style={{ marginLeft: 'auto' }}
      />
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}></View>

      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color={colors.textSecondary} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search updates..."
          placeholderTextColor={colors.textSecondary}
        />
      </View>

      <ScrollView horizontal style={styles.storyCarousel} showsHorizontalScrollIndicator={false}>
        {stories.map(story => (
          <View key={story.id} style={styles.storyItem}>
            <Image source={{ uri: story.image }} style={styles.storyImage} />
            <Text style={styles.storyName}>{story.name}</Text>
          </View>
        ))}
      </ScrollView>

      <FlatList
        data={updates}
        renderItem={renderUpdateItem}
        keyExtractor={item => item.id.toString()}
        contentContainerStyle={styles.updateList}
      />

      <View style={styles.actionButtonContainer}>
        <Pressable style={styles.actionButton} android_ripple={{ color: colors.ripple }}>
          <Ionicons name="filter" size={20} color="white" />
        </Pressable>
        <Pressable style={styles.actionButton} android_ripple={{ color: colors.ripple }}>
          <Ionicons name="refresh" size={20} color="white" />
        </Pressable>
      </View>
    </View>
  );
};

export default UpdatesScreen;
