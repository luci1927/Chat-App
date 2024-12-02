import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme, Appearance, View } from 'react-native';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemColorScheme = useColorScheme();
  const [themeMode, setThemeMode] = useState('system');
  const [isDarkMode, setIsDarkMode] = useState(systemColorScheme === 'dark');
  const [currentColors, setCurrentColors] = useState(isDarkMode ? darkColors : lightColors);

  useEffect(() => {
    loadTheme();

    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      if (themeMode === 'system') {
        const shouldBeDark = colorScheme === 'dark';
        setIsDarkMode(shouldBeDark);
      }
    });

    return () => {
      subscription.remove();
    };
  }, [themeMode]);

  useEffect(() => {
    // Update colors when isDarkMode changes
    const newColors = isDarkMode ? darkColors : lightColors;
    setCurrentColors(newColors);
  }, [isDarkMode]);

  const loadTheme = async () => {
    try {
      const savedThemeMode = await AsyncStorage.getItem('themeMode');
      if (savedThemeMode !== null) {
        setThemeMode(savedThemeMode);
        if (savedThemeMode === 'system') {
          setIsDarkMode(systemColorScheme === 'dark');
        } else {
          setIsDarkMode(savedThemeMode === 'dark');
        }
      }
    } catch (error) {
      console.error('Error loading theme:', error);
    }
  };

  const setThemePreference = async (mode) => {
    try {
      setThemeMode(mode);
      await AsyncStorage.setItem('themeMode', mode);
      
      const newIsDarkMode = mode === 'system' ? systemColorScheme === 'dark' : mode === 'dark';
      setIsDarkMode(newIsDarkMode);
    } catch (error) {
      console.error('Error saving theme:', error);
    }
  };

  const toggleTheme = async () => {
    try {
      if (themeMode === 'system') {
        const newMode = systemColorScheme === 'dark' ? 'light' : 'dark';
        await setThemePreference(newMode);
      } else {
        const newMode = themeMode === 'dark' ? 'light' : 'dark';
        await setThemePreference(newMode);
      }
    } catch (error) {
      console.error('Error toggling theme:', error);
    }
  };

  const theme = {
    isDarkMode,
    themeMode,
    colors: currentColors,
    toggleTheme,
    setThemePreference,
  };

  return (
    <ThemeContext.Provider value={theme}>
      <View 
        style={{ 
          flex: 1,
          backgroundColor: currentColors.background,
        }}
      >
        {children}
      </View>
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const lightColors = {
  primary: '#128C7E',
  background: '#F0F2F5',
  surface: '#FFFFFF',
  text: '#000000',
  textSecondary: '#8E8E93',
  border: '#E5E5E5',
  danger: '#FF3B30',
  success: '#34C759',
  messageBubble: '#E7FFDB',
  messageText: '#000000',
};

export const darkColors = {
  primary: '#128C7E',
  background: '#121212',
  surface: '#1E1E1E',
  text: '#FFFFFF',
  textSecondary: '#8E8E93',
  border: '#2C2C2C',
  danger: '#FF453A',
  success: '#32D74B',
  messageBubble: '#056162',
  messageText: '#FFFFFF',
};
