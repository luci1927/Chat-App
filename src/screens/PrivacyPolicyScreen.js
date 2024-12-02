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

const PrivacyPolicyScreen = () => {
  const { colors } = useTheme();

  const sections = [
    {
      title: 'Information We Collect',
      content: `We collect information that you provide directly to us, including:
• Profile Information: Your name, phone number, and profile picture
• Communications: Messages, photos, and files you share through our service
• Contact Information: Your device's address book (with your permission)
• Usage Data: How you interact with our services, device information, and log data`,
    },
    {
      title: 'How We Use Your Information',
      content: `We use the information we collect to:
• Provide, maintain, and improve our services
• Communicate with you about our services
• Personalize your experience
• Ensure safety and security of our platform
• Comply with legal obligations`,
    },
    {
      title: 'Information Sharing',
      content: `We do not sell your personal information. We may share your information:
• With other users as part of normal service operation
• With service providers who assist in our operations
• When required by law or to protect rights
• In connection with business transfers`,
    },
    {
      title: 'Data Security',
      content: `We implement appropriate technical and organizational measures to protect your information, including:
• End-to-end encryption for messages
• Secure data storage and transmission
• Regular security audits
• Access controls for our systems`,
    },
    {
      title: 'Your Rights',
      content: `You have the right to:
• Access your personal information
• Correct inaccurate data
• Request deletion of your data
• Object to processing of your data
• Export your data`,
    },
    {
      title: "Children's Privacy",
      content: "Our service is not directed to children under 13. We do not knowingly collect information from children under 13. If we discover we have collected information from a child under 13, we will delete it.",
    },
    {
      title: 'Changes to Privacy Policy',
      content: 'We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.',
    },
    {
      title: 'Contact Us',
      content: 'If you have any questions about this Privacy Policy, please contact us through the Contact Support section in the app settings.',
    },
  ];

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: colors.background }]}>
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title, { color: colors.text }]}>Privacy Policy</Text>
          <Text style={[styles.lastUpdated, { color: colors.textSecondary }]}>
            Last Updated: January 2024
          </Text>
        </View>

        <Text style={[styles.introduction, { color: colors.text }]}>
          Your privacy is important to us. This Privacy Policy explains how we collect,
          use, disclose, and safeguard your information when you use our chat application.
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
          onPress={() => Linking.openURL('mailto:privacy@chatapp.com')}
        >
          <Text style={[styles.contactButtonText, { color: colors.primary }]}>
            Contact Privacy Team
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

export default PrivacyPolicyScreen;
