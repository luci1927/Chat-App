import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Switch,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const SettingsScreen = ({ navigation }) => {
  const [isDarkMode, setIsDarkMode] = React.useState(false);
  const [notifications, setNotifications] = React.useState(true);

  const renderSettingsItem = (icon, title, value, onPress, showArrow = true) => (
    <TouchableOpacity 
      style={styles.settingsItem} 
      onPress={onPress}
    >
      <View style={styles.settingsItemLeft}>
        <Ionicons name={icon} size={24} color="#128C7E" style={styles.icon} />
        <Text style={styles.settingsItemText}>{title}</Text>
      </View>
      <View style={styles.settingsItemRight}>
        {typeof value === 'boolean' ? (
          <Switch
            value={value}
            onValueChange={onPress}
            trackColor={{ false: "#767577", true: "#128C7E" }}
            thumbColor={value ? "#fff" : "#f4f3f4"}
          />
        ) : (
          <>
            {value && <Text style={styles.settingsItemValue}>{value}</Text>}
            {showArrow && <Ionicons name="chevron-forward" size={20} color="#666" />}
          </>
        )}
      </View>
    </TouchableOpacity>
  );

  const settingsSections = [
    {
      title: 'General',
      items: [
        {
          icon: 'moon',
          title: 'Dark Mode',
          value: isDarkMode,
          onPress: () => setIsDarkMode(!isDarkMode),
        },
        {
          icon: 'notifications',
          title: 'Notifications',
          value: notifications,
          onPress: () => setNotifications(!notifications),
        },
        {
          icon: 'language',
          title: 'Language',
          value: 'English',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Privacy',
      items: [
        {
          icon: 'lock-closed',
          title: 'Privacy Settings',
          onPress: () => {},
        },
        {
          icon: 'eye-off',
          title: 'Last Seen',
          value: 'Everyone',
          onPress: () => {},
        },
      ],
    },
    {
      title: 'Help',
      items: [
        {
          icon: 'help-circle',
          title: 'Help Center',
          onPress: () => {},
        },
        {
          icon: 'information-circle',
          title: 'About',
          onPress: () => {},
        },
      ],
    },
  ];

  return (
    <ScrollView style={styles.container}>
      {settingsSections.map((section, index) => (
        <View key={index} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map((item, itemIndex) => (
              <React.Fragment key={itemIndex}>
                {renderSettingsItem(
                  item.icon,
                  item.title,
                  item.value,
                  item.onPress
                )}
                {itemIndex < section.items.length - 1 && (
                  <View style={styles.separator} />
                )}
              </React.Fragment>
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#128C7E',
    marginLeft: 20,
    marginBottom: 5,
  },
  sectionContent: {
    backgroundColor: '#fff',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: '#ccc',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
  },
  settingsItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingsItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginRight: 15,
  },
  settingsItemText: {
    fontSize: 16,
    color: '#000',
  },
  settingsItemValue: {
    fontSize: 16,
    color: '#666',
    marginRight: 10,
  },
  separator: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#ccc',
    marginLeft: 60,
  },
});

export default SettingsScreen;