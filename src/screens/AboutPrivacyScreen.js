import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const AboutPrivacyScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [selectedOption, setSelectedOption] = useState(route.params?.currentOption || 'Everyone');

  const privacyOptions = [
    {
      id: 'everyone',
      label: 'Everyone',
      description: 'Anyone can see your about text',
    },
    {
      id: 'contacts',
      label: 'My Contacts',
      description: 'Only contacts in your address book can see your about text',
    },
    {
      id: 'nobody',
      label: 'Nobody',
      description: 'No one can see your about text',
    },
  ];

  const handleSave = () => {
    navigation.navigate('Profile', { updatedAboutPrivacy: selectedOption });
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => navigation.goBack()}
        >
          <Ionicons name="chevron-back" size={28} color={colors.text} />
        </TouchableOpacity>
      ),
    });
  }, [navigation, colors]);

  return (
    <ScrollView 
      style={[styles.container, { backgroundColor: colors.background }]}
      contentContainerStyle={styles.scrollViewContent}
    >
      <Text style={[styles.description, { color: colors.textSecondary }]}>
        Choose who can see your about text
      </Text>

      {privacyOptions.map((option) => (
        <TouchableOpacity
          key={option.id}
          style={[
            styles.optionContainer,
            { 
              backgroundColor: colors.surface,
              borderColor: selectedOption === option.label ? colors.primary : colors.border,
            },
          ]}
          onPress={() => setSelectedOption(option.label)}
        >
          <View style={styles.optionContent}>
            <View style={styles.optionTextContainer}>
              <Text style={[styles.optionLabel, { color: colors.text }]}>
                {option.label}
              </Text>
              <Text style={[styles.optionDescription, { color: colors.textSecondary }]}>
                {option.description}
              </Text>
            </View>
            {selectedOption === option.label && (
              <Ionicons 
                name="checkmark-circle" 
                size={24} 
                color={colors.primary} 
              />
            )}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.saveButton, { backgroundColor: colors.primary }]}
        onPress={handleSave}
      >
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  description: {
    fontSize: 14,
    marginBottom: 20,
    textAlign: 'center',
  },
  optionContainer: {
    borderWidth: 2,
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
  },
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  optionTextContainer: {
    flex: 1,
    marginRight: 16,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
  },
  saveButton: {
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default AboutPrivacyScreen;
