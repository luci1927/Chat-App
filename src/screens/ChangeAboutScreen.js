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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const ChangeAboutScreen = ({ navigation, route }) => {
  const { colors } = useTheme();
  const [about, setAbout] = useState(route.params?.currentAbout || 'Hey there! I am using ChatApp');

  const handleSave = () => {
    if (!about.trim()) {
      Alert.alert('Error', 'Please enter your about text');
      return;
    }

    // Here you would typically update the about in your backend/storage
    navigation.navigate('Profile', { updatedAbout: about.trim() });
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
      <View style={[styles.container, { backgroundColor: colors.background }]}>
        <View style={styles.inputContainer}>
          <Text style={[styles.label, { color: colors.text }]}>About</Text>
          <TextInput
            style={[
              styles.input,
              {
                color: colors.text,
                backgroundColor: colors.surface,
                borderColor: colors.border,
                height: 120,
                textAlignVertical: 'top',
              },
            ]}
            value={about}
            onChangeText={setAbout}
            placeholder="Enter your about text"
            placeholderTextColor={colors.textSecondary}
            multiline
            maxLength={140}
            autoFocus
          />
          <Text style={[styles.charCount, { color: colors.textSecondary }]}>
            {140 - about.length} characters remaining
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.saveButton, { backgroundColor: colors.primary }]}
          onPress={handleSave}
        >
          <Text style={styles.saveButtonText}>Save</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 16,
  },
  charCount: {
    marginTop: 8,
    fontSize: 12,
    alignSelf: 'flex-end',
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

export default ChangeAboutScreen;
