import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Linking,
  SafeAreaView,
} from 'react-native';
import { useTheme } from '../context/ThemeContext';

const TermsOfServiceScreen = () => {
  const { colors } = useTheme();

  const sections = [
    {
      title: 'Acceptance of Terms',
      content: `By accessing or using our chat application, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, you may not access our service.`,
    },
    {
      title: "User's Rights",
      content: `You have the right to:
• Access and modify your account information
• Delete your account and data
• Opt-out of communications
• Report violations`,
    },
    {
      title: 'User Registration',
      content: `To use our service, you must:
• Be at least 13 years old
• Register with accurate information
• Maintain the security of your account
• Notify us of any unauthorized use
• Accept responsibility for all activities under your account`,
    },
    {
      title: 'User Conduct',
      content: `You agree not to:
• Violate any laws or regulations
• Impersonate others or provide false information
• Share harmful or malicious content
• Interfere with the service's operation
• Attempt to gain unauthorized access
• Use the service for spam or harassment`,
    },
    {
      title: 'Content',
      content: `You are responsible for all content you share through our service. You retain ownership of your content, but grant us license to use it for providing our services. We may remove any content that violates these terms.`,
    },
    {
      title: 'Intellectual Property',
      content: `The service and its original content (excluding user-generated content) are and will remain the exclusive property of ChatApp and its licensors. Our trademarks and trade dress may not be used without our prior written permission.`,
    },
    {
      title: 'Service Modifications',
      content: `We reserve the right to:
• Modify or discontinue any part of our service
• Change our terms or pricing at any time
• Limit service availability by region
We will notify users of significant changes.`,
    },
    {
      title: 'Termination',
      content: `We may terminate or suspend your account and access to our service immediately, without prior notice, for conduct that we believe violates these Terms or is harmful to other users, us, or third parties, or for any other reason.`,
    },
    {
      title: 'Limitation of Liability',
      content: `To the maximum extent permitted by law, we shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the service.`,
    },
    {
      title: 'Governing Law',
      content: `These Terms shall be governed by and construed in accordance with the laws of the United States, without regard to its conflict of law provisions.`,
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Terms of Service</Text>
          <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
            Last Updated: January 2024
          </Text>
        </View>

        <Text style={[styles.introduction, { color: colors.text }]}>
          Please read these Terms of Service carefully before using our chat application.
          These terms govern your use of our service and form a binding legal agreement
          between you and ChatApp.
        </Text>

        {sections.map((section, index) => (
          <View key={index} style={[styles.section, { backgroundColor: colors.surface }]}>
            <Text style={[styles.sectionTitle, { color: colors.text }]}>
              {section.title}
            </Text>
            <Text style={[styles.sectionContent, { color: colors.textSecondary }]}>
              {section.content}
            </Text>
          </View>
        ))}

        <TouchableOpacity
          style={styles.contactButton}
          onPress={() => Linking.openURL('mailto:legal@chatapp.com')}
        >
          <Text style={[styles.contactButtonText, { color: colors.primary }]}>
            Contact Legal Team
          </Text>
        </TouchableOpacity>
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
  lastUpdated: {
    fontSize: 14,
    marginBottom: 16,
  },
  introduction: {
    fontSize: 16,
    lineHeight: 24,
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  section: {
    marginHorizontal: 16,
    marginBottom: 16,
    padding: 16,
    borderRadius: 12,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  sectionContent: {
    fontSize: 15,
    lineHeight: 22,
  },
  contactButton: {
    margin: 20,
    padding: 16,
    alignItems: 'center',
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default TermsOfServiceScreen;
