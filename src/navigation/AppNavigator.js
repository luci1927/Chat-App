import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Ionicons } from "@expo/vector-icons";
import { View, TouchableOpacity } from 'react-native';
import { useTheme } from '../context/ThemeContext';
import HeaderMenu from '../components/HeaderMenu';

// Import screens
import ChatListScreen from "../screens/ChatListScreen";
import ProfileScreen from "../screens/ProfileScreen";
import SingleChatScreen from "../screens/SingleChatScreen";
import FriendProfileScreen from "../screens/FriendProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import ContactScreen from '../screens/ContactScreen';
import PrivacyPolicyScreen from '../screens/PrivacyPolicyScreen';
import TermsOfServiceScreen from '../screens/TermsOfServiceScreen';
import HelpScreen from '../screens/HelpScreen';
import StorageUsageScreen from '../screens/StorageUsageScreen';
import NetworkUsageScreen from '../screens/NetworkUsageScreen';
import AutoDownloadScreen from '../screens/AutoDownloadScreen';
import StoriesScreen from "../screens/StoriesScreen";
import UpdatesScreen from "../screens/UpdatesScreen";
import NewChatScreen from '../screens/NewChatScreen';
import ChangeNameScreen from '../screens/ChangeNameScreen';
import ChangeAboutScreen from '../screens/ChangeAboutScreen';
import ChangePhoneNumberScreen from '../screens/ChangePhoneNumberScreen';
import LastSeenPrivacyScreen from '../screens/LastSeenPrivacyScreen';
import ProfilePhotoPrivacyScreen from '../screens/ProfilePhotoPrivacyScreen';
import AboutPrivacyScreen from '../screens/AboutPrivacyScreen';
import BlockedContactsScreen from '../screens/BlockedContactsScreen';
import FaceIDScreen from '../screens/FaceIDScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  const { colors } = useTheme();

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === "Chats") {
            iconName = focused ? "chatbubbles" : "chatbubbles-outline";
          } else if (route.name === "Updates") {
            iconName = focused ? "radio-button-on" : "radio-button-off";
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline";
          } else if (route.name === "Settings") {
            iconName = focused ? "settings" : "settings-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTitleStyle: {
          color: colors.text,
        },
        headerTintColor: colors.text,
      })}
    >
      <Tab.Screen
        name="Chats"
        component={ChatListScreen}
        options={{
          headerShown: true,
          title: "ChatApp",
          headerStyle: {
            backgroundColor: colors.primary,
            elevation: 0,
            shadowOpacity: 0,
          },
          headerTitleStyle: {
            color: '#fff',
            fontSize: 30,
            fontWeight: 'bold',
            marginBottom: 20,
          },
          headerRight: () => (
            <View style={{ flexDirection: 'row', marginRight: 10 }}>
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <Ionicons name="camera-outline" size={22} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity style={{ marginHorizontal: 10 }}>
                <Ionicons name="search" size={22} color="#fff" />
              </TouchableOpacity>
              <HeaderMenu />
            </View>
          ),
          headerTitleAlign: 'left',
          headerShadowVisible: false,
        }}
      />
      <Tab.Screen 
        name="Updates" 
        component={UpdatesScreen}
        options={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
          },
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: "#fff",
          headerTitleStyle: {
            fontWeight: 'bold',
            fontSize: 21,
          },
        }}
      />
    </Tab.Navigator>
  );
};

const AppNavigator = () => {
  const { colors, isDarkMode } = useTheme();

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: isDarkMode ? colors.background : colors.surface,
        },
        headerTintColor: colors.text,
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="MainTabs" 
        component={TabNavigator} 
        options={{ headerShown: false }} 
      />
      <Stack.Screen
        name="SingleChat"
        component={SingleChatScreen}
        options={({ route }) => ({
          title: route.params?.name || "Chat",
          headerStyle: {
            backgroundColor: colors.primary,
          },
        })}
      />
      <Stack.Screen
        name="NewChat"
        component={NewChatScreen}
        options={{
          title: "New Chat",
          headerBackTitle: "Home",
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen
        name="FriendProfile"
        component={FriendProfileScreen}
        options={{ 
          headerShown: true,
          headerStyle: {
            backgroundColor: colors.surface,
          },
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={({ navigation }) => ({
          title: 'Contact Us',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={({ navigation }) => ({
          title: 'Privacy Policy',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="TermsOfService"
        component={TermsOfServiceScreen}
        options={({ navigation }) => ({
          title: 'Terms of Service',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="Help"
        component={HelpScreen}
        options={({ navigation }) => ({
          title: 'Help Center',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="StorageUsage"
        component={StorageUsageScreen}
        options={({ navigation }) => ({
          title: 'Storage Usage',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="NetworkUsage"
        component={NetworkUsageScreen}
        options={({ navigation }) => ({
          title: 'Network Usage',
          headerLeft: () => (
            <TouchableOpacity
              style={{ marginLeft: 16 }}
              onPress={() => navigation.goBack()}
            >
              <Ionicons name="arrow-back" size={24} color={colors.text} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen 
        name="AutoDownload" 
        component={AutoDownloadScreen}
        options={{
          title: "Auto-Download",
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
        }}
      />
      <Stack.Screen 
        name="ChangeName" 
        component={ChangeNameScreen} 
        options={{ title: 'Change Name' }}
      />
      <Stack.Screen 
        name="ChangeAbout" 
        component={ChangeAboutScreen} 
        options={{ title: 'Change About' }}
      />
      <Stack.Screen 
        name="ChangePhoneNumber" 
        component={ChangePhoneNumberScreen} 
        options={{ title: 'Change Phone Number' }}
      />
      <Stack.Screen 
        name="LastSeenPrivacy" 
        component={LastSeenPrivacyScreen} 
        options={{ title: 'Last Seen Privacy' }}
      />
      <Stack.Screen 
        name="ProfilePhotoPrivacy" 
        component={ProfilePhotoPrivacyScreen} 
        options={{ title: 'Profile Photo Privacy' }}
      />
      <Stack.Screen 
        name="AboutPrivacy" 
        component={AboutPrivacyScreen} 
        options={{ title: 'About Privacy' }}
      />
      <Stack.Screen 
        name="BlockedContacts" 
        component={BlockedContactsScreen} 
        options={{ title: 'Blocked Contacts' }} 
      />
      <Stack.Screen 
        name="FaceID" 
        component={FaceIDScreen} 
        options={{ title: 'Face ID Settings' }} 
      />
    </Stack.Navigator>
  );
};

export default AppNavigator;
