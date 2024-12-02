import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';

const HelpScreen = ({ navigation }) => {
  const { colors } = useTheme();
  const [expandedSection, setExpandedSection] = useState(null);

  const helpSections = [
    {
      title: 'Getting Started',
      icon: 'rocket-outline',
      items: [
        {
          question: 'How do I create an account?',
          answer: `To create an account:
1. Open the app and tap "Sign Up"
2. Enter your phone number
3. Verify your number with the code sent via SMS
4. Set up your profile with name and photo (optional)`,
        },
        {
          question: 'How do I edit my profile?',
          answer: `To edit your profile:
1. Go to Settings
2. Tap on your profile at the top
3. Tap "Edit" to change your name, photo, or status
4. Save your changes`,
        },
      ],
    },
    {
      title: 'Messaging',
      icon: 'chatbubbles-outline',
      items: [
        {
          question: 'How do I start a new chat?',
          answer: `To start a new chat:
1. Tap the new message icon in the bottom right
2. Select a contact from your list
3. Or enter a phone number manually
4. Start typing your message`,
        },
        {
          question: 'Can I delete messages?',
          answer: `Yes, you can delete messages:
1. Long press the message you want to delete
2. Tap "Delete"
3. Choose "Delete for me" or "Delete for everyone"
Note: "Delete for everyone" only works within 1 hour of sending`,
        },
      ],
    },
    {
      title: 'Privacy & Security',
      icon: 'shield-checkmark-outline',
      items: [
        {
          question: 'Who can see my profile photo?',
          answer: `You can control who sees your profile photo:
1. Go to Settings > Privacy
2. Tap "Profile Photo"
3. Choose: Everyone, Contacts, or Nobody`,
        },
        {
          question: 'How do I block someone?',
          answer: `To block a contact:
1. Open the chat with the person
2. Tap their name at the top
3. Scroll down and tap "Block"
4. Confirm your choice`,
        },
      ],
    },
    {
      title: 'Media & Storage',
      icon: 'images-outline',
      items: [
        {
          question: 'How do I share photos and videos?',
          answer: `To share media:
1. Open a chat
2. Tap the + icon
3. Choose "Photo & Video"
4. Select items to share
5. Add a caption (optional)
6. Tap send`,
        },
        {
          question: 'How do I manage storage?',
          answer: `To manage storage:
1. Go to Settings > Storage and Data
2. View storage usage by chat
3. Clear specific chats or media types
4. Set auto-download preferences`,
        },
      ],
    },
    {
      title: 'Troubleshooting',
      icon: 'build-outline',
      items: [
        {
          question: 'App is running slow',
          answer: `If the app is slow:
1. Clear app cache
2. Check your internet connection
3. Ensure you have the latest version
4. Restart the app
If problems persist, contact support.`,
        },
        {
          question: 'Messages not sending',
          answer: `If messages won't send:
1. Check your internet connection
2. Verify the recipient hasn't blocked you
3. Try restarting the app
4. Check if the service is down`,
        },
      ],
    },
    {
      title: 'About',
      icon: 'information-circle-outline',
      items: [
        {
          question: 'App Version',
          answer: `ChatApp v1.0.0
• Latest update: January 2024
• Platform: React Native
• Supported OS: iOS and Android`,
        },
        {
          question: 'About ChatApp',
          answer: `ChatApp is a modern messaging application that allows you to stay connected with friends and family. Features include:
• Instant messaging
• Media sharing
• Theme customization
• End-to-end encryption
• Cross-platform support`,
        },
        {
          question: 'Credits',
          answer: `ChatApp is developed and maintained by the ChatApp Team.
• Design: ChatApp Design Team
• Development: ChatApp Engineering
• Support: ChatApp Customer Care
© 2024 ChatApp. All rights reserved.`,
        },
      ],
    },
  ];

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const renderHelpItem = ({ question, answer }) => (
    <View
      key={question}
      style={[styles.helpItem, { backgroundColor: colors.surface }]}
    >
      <Text style={[styles.question, { color: colors.text }]}>{question}</Text>
      <Text style={[styles.answer, { color: colors.textSecondary }]}>{answer}</Text>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Help Center</Text>
          <Text style={[styles.subtitle, { color: colors.textSecondary }]}>
            Find answers to common questions and learn how to use our app.
          </Text>
        </View>

        <TouchableOpacity
          style={[styles.supportButton, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('Contact')}
        >
          <Ionicons name="headset-outline" size={24} color="#FFFFFF" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>

        {helpSections.map((section, index) => (
          <View key={section.title} style={styles.section}>
            <TouchableOpacity
              style={[styles.sectionHeader, { backgroundColor: colors.surface }]}
              onPress={() => toggleSection(index)}
            >
              <View style={styles.sectionHeaderLeft}>
                <Ionicons name={section.icon} size={24} color={colors.primary} />
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  {section.title}
                </Text>
              </View>
              <Ionicons
                name={expandedSection === index ? 'chevron-up' : 'chevron-down'}
                size={24}
                color={colors.textSecondary}
              />
            </TouchableOpacity>
            {expandedSection === index && (
              <View style={styles.sectionContent}>
                {section.items.map(renderHelpItem)}
              </View>
            )}
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    lineHeight: 22,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
    padding: 16,
    borderRadius: 12,
  },
  supportButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 12,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    marginHorizontal: 16,
    borderRadius: 12,
  },
  sectionHeaderLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '600',
    marginLeft: 12,
  },
  sectionContent: {
    marginTop: 8,
  },
  helpItem: {
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 12,
  },
  question: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  answer: {
    fontSize: 15,
    lineHeight: 22,
  },
});

export default HelpScreen;
