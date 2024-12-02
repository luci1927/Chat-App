import React, { useState } from 'react';
import { View, Modal, Text, TouchableOpacity, StyleSheet, Pressable } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from "@expo/vector-icons";

const HeaderMenu = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { colors, isDarkMode } = useTheme();
  const navigation = useNavigation();

  const menuItems = [
    {
      icon: 'checkbox-outline',
      title: 'Select chats',
      onPress: () => {
        setModalVisible(false);
        // Handle select chats
      }
    },
    {
      icon: 'settings-outline',
      title: 'Settings',
      onPress: () => {
        setModalVisible(false);
        navigation.navigate('Settings');
      }
    },
    {
      icon: 'information-circle-outline',
      title: 'About',
      onPress: () => {
        setModalVisible(false);
        // Navigate to About screen
      }
    },
    {
      icon: 'help-circle-outline',
      title: 'FAQ',
      onPress: () => {
        setModalVisible(false);
        // Navigate to FAQ screen
      }
    }
  ];

  return (
    <View>
      <TouchableOpacity 
        style={{ marginHorizontal: 10 }}
        onPress={() => setModalVisible(true)}
      >
        <Ionicons 
          name="ellipsis-vertical" 
          size={24} 
          color={isDarkMode ? '#fff' : '#000000'} 
        />
      </TouchableOpacity>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable 
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View 
            style={[
              styles.menuContainer, 
              { 
                backgroundColor: colors.surface,
                borderColor: colors.border
              }
            ]}
          >
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.menuItem,
                  index < menuItems.length - 1 && { borderBottomWidth: StyleSheet.hairlineWidth, borderBottomColor: colors.border }
                ]}
                onPress={item.onPress}
              >
                <Ionicons name={item.icon} size={20} color={colors.text} style={styles.menuIcon} />
                <Text style={[styles.menuText, { color: colors.text }]}>{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  menuContainer: {
    position: 'absolute',
    top: 50,
    right: 10,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    minWidth: 180,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
  },
  menuIcon: {
    marginRight: 10,
  },
  menuText: {
    fontSize: 16,
  },
});

export default HeaderMenu;
