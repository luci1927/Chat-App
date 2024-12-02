import React, { useState, useLayoutEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ChangePhoneNumberScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [phoneNumber, setPhoneNumber] = useState(route.params?.currentPhone || '');
  const [countryCode, setCountryCode] = useState(route.params?.currentCountryCode || '+1');

  const handleSave = () => {
    // Basic phone number validation
    const cleanedPhoneNumber = phoneNumber.replace(/[^\d]/g, '');
    
    if (!cleanedPhoneNumber) {
      Alert.alert('Error', 'Please enter a valid phone number');
      return;
    }

    // Here you would typically validate and update the phone number in your backend/storage
    const fullPhoneNumber = `${countryCode}${cleanedPhoneNumber}`;
    navigation.navigate('Profile', { 
      updatedPhone: fullPhoneNumber 
    });
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView 
        style={[styles.container, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.scrollViewContent}
      >
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Country Code</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={countryCode}
            onChangeText={setCountryCode}
            placeholder="+1"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>Phone Number</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            placeholder="Enter your phone number"
            placeholderTextColor={colors.textSecondary}
            keyboardType="phone-pad"
            autoFocus
          />
        </View>

        <View style={styles.warningContainer}>
          <Text style={[styles.warningTitle, { color: colors.error }]}>
            <Ionicons name="warning" size={18} color={colors.error} /> Important Rules
          </Text>
          <Text style={[styles.warningText, { color: colors.textSecondary }]}>
            • Your phone number is used to verify your account and help you connect with others.
          </Text>
          <Text style={[styles.warningText, { color: colors.textSecondary }]}>
            • You can only change your phone number once every 30 days.
          </Text>
          <Text style={[styles.warningText, { color: colors.textSecondary }]}>
            • Changing your phone number will:
              - Transfer your account information and settings
              - Notify your contacts about the number change
              - Log you out of all linked devices
          </Text>
          <Text style={[styles.warningText, { color: colors.error, fontWeight: 'bold' }]}>
            • Be sure this is the correct number before saving
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 16,
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  warningContainer: {
    marginTop: 20,
    padding: 16,
    borderRadius: 8,
    backgroundColor: 'rgba(255, 0, 0, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 0, 0, 0.2)',
  },
  warningTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 12,
    alignItems: 'center',
  },
  warningText: {
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
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

export default ChangePhoneNumberScreen;
