import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Switch,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import * as LocalAuthentication from 'expo-local-authentication';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FaceIDScreen = ({ navigation }) => {
  const { colors, isDarkMode } = useTheme();
  const [isFaceIDEnabled, setIsFaceIDEnabled] = useState(false);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState(false);
  const [biometricType, setBiometricType] = useState(null);
  const [faceIDSettings, setFaceIDSettings] = useState({
    unlockApp: false,
    hideMessagePreview: false,
    authenticatePayments: false,
  });

  useEffect(() => {
    checkBiometricAvailability();
    loadFaceIDSettings();
  }, []);

  const checkBiometricAvailability = async () => {
    const compatible = await LocalAuthentication.hasHardwareAsync();
    const types = await LocalAuthentication.supportedAuthenticationTypesAsync();
    
    setIsBiometricAvailable(compatible);
    
    if (types.includes(LocalAuthentication.AuthenticationType.FACIAL_RECOGNITION)) {
      setBiometricType('Face ID');
    } else if (types.includes(LocalAuthentication.AuthenticationType.FINGERPRINT)) {
      setBiometricType('Fingerprint');
    }
  };

  const loadFaceIDSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem('faceIDSettings');
      const storedStatus = await AsyncStorage.getItem('isFaceIDEnabled');
      
      if (storedSettings) {
        setFaceIDSettings(JSON.parse(storedSettings));
      }
      
      if (storedStatus) {
        setIsFaceIDEnabled(JSON.parse(storedStatus));
      }
    } catch (error) {
      console.error('Error loading Face ID settings', error);
    }
  };

  const saveFaceIDSettings = async (newSettings) => {
    try {
      await AsyncStorage.setItem('faceIDSettings', JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving Face ID settings', error);
    }
  };

  const authenticateBiometrics = async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Authenticate to enable Face ID',
        fallbackLabel: 'Use passcode',
        cancelLabel: 'Cancel',
      });

      return result.success;
    } catch (error) {
      console.error('Authentication error', error);
      return false;
    }
  };

  const toggleFaceID = async () => {
    if (!isBiometricAvailable) {
      Alert.alert(
        'Biometric Authentication Unavailable', 
        'Your device does not support biometric authentication.'
      );
      return;
    }

    if (!isFaceIDEnabled) {
      // Attempt to authenticate when enabling
      const authenticated = await authenticateBiometrics();
      if (!authenticated) {
        return;
      }
    }

    const newStatus = !isFaceIDEnabled;
    setIsFaceIDEnabled(newStatus);
    
    // Save status to AsyncStorage
    await AsyncStorage.setItem('isFaceIDEnabled', JSON.stringify(newStatus));

    // Reset all settings if Face ID is disabled
    if (!newStatus) {
      const resetSettings = {
        unlockApp: false,
        hideMessagePreview: false,
        authenticatePayments: false,
      };
      setFaceIDSettings(resetSettings);
      await saveFaceIDSettings(resetSettings);
    }
  };

  const toggleSetting = async (setting) => {
    // Only allow toggling if Face ID is enabled
    if (isFaceIDEnabled) {
      const authenticated = await authenticateBiometrics();
      if (!authenticated) return;

      const newSettings = {
        ...faceIDSettings,
        [setting]: !faceIDSettings[setting]
      };
      
      setFaceIDSettings(newSettings);
      await saveFaceIDSettings(newSettings);
    }
  };

  const renderSettingItem = (label, setting) => (
    <View 
      style={[
        styles.settingItem, 
        { 
          backgroundColor: colors.surface,
          borderBottomColor: colors.border,
        }
      ]}
    >
      <Text style={[styles.settingLabel, { color: colors.text }]}>
        {label}
      </Text>
      <Switch
        trackColor={{ 
          false: colors.disabled, 
          true: colors.primary 
        }}
        thumbColor={isFaceIDEnabled ? colors.background : colors.textSecondary}
        ios_backgroundColor={colors.disabled}
        onValueChange={() => toggleSetting(setting)}
        value={isFaceIDEnabled && faceIDSettings[setting]}
        disabled={!isFaceIDEnabled}
      />
    </View>
  );

  return (
    <ScrollView 
      style={[
        styles.container, 
        { backgroundColor: colors.background }
      ]}
    >
      <View style={styles.headerContainer}>
        <View 
          style={[
            styles.faceIDHeader, 
            { backgroundColor: colors.surface }
          ]}
        >
          <Ionicons 
            name="scan-circle" 
            size={64} 
            color={isFaceIDEnabled ? colors.primary : colors.disabled} 
          />
          <Text 
            style={[
              styles.faceIDTitle, 
              { color: colors.text }
            ]}
          >
            {biometricType || 'Biometric Authentication'}
          </Text>
          <Text 
            style={[
              styles.faceIDSubtitle, 
              { color: colors.textSecondary }
            ]}
          >
            {isFaceIDEnabled ? 'Enabled' : 'Disabled'}
          </Text>
          
          <View style={styles.switchContainer}>
            <Text style={[styles.switchLabel, { color: colors.text }]}>
              Enable {biometricType || 'Biometric'}
            </Text>
            <Switch
              trackColor={{ 
                false: colors.disabled, 
                true: colors.primary 
              }}
              thumbColor={isFaceIDEnabled ? colors.background : colors.textSecondary}
              ios_backgroundColor={colors.disabled}
              onValueChange={toggleFaceID}
              value={isFaceIDEnabled}
            />
          </View>
        </View>

        {isBiometricAvailable ? (
          <View 
            style={[
              styles.settingsContainer, 
              { backgroundColor: colors.surface }
            ]}
          >
            <Text 
              style={[
                styles.settingsSectionTitle, 
                { color: colors.textSecondary }
              ]}
            >
              Use {biometricType || 'Biometric'} for
            </Text>
            
            {renderSettingItem('Unlock App', 'unlockApp')}
            {renderSettingItem('Hide Message Previews', 'hideMessagePreview')}
            {renderSettingItem('Authenticate Payments', 'authenticatePayments')}
          </View>
        ) : (
          <View 
            style={[
              styles.unavailableContainer, 
              { backgroundColor: colors.surface }
            ]}
          >
            <Text 
              style={[
                styles.unavailableText, 
                { color: colors.textSecondary }
              ]}
            >
              Biometric authentication is not available on this device.
            </Text>
          </View>
        )}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    paddingVertical: 20,
  },
  faceIDHeader: {
    alignItems: 'center',
    paddingVertical: 24,
    marginHorizontal: 16,
    borderRadius: 12,
    marginBottom: 16,
  },
  faceIDTitle: {
    fontSize: 22,
    fontWeight: '600',
    marginTop: 12,
  },
  faceIDSubtitle: {
    fontSize: 16,
    marginBottom: 16,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    width: '100%',
  },
  switchLabel: {
    fontSize: 16,
  },
  settingsContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
  },
  settingsSectionTitle: {
    paddingHorizontal: 16,
    paddingTop: 16,
    fontSize: 14,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  settingLabel: {
    fontSize: 16,
  },
  unavailableContainer: {
    marginHorizontal: 16,
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
  },
  unavailableText: {
    fontSize: 16,
    textAlign: 'center',
  },
});

export default FaceIDScreen;
