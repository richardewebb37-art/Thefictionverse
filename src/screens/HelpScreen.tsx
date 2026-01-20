import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const HelpScreen = () => {
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [expandedFAQ, setExpandedFAQ] = useState<number | null>(null);

  const faqs = [
    { id: 1, question: 'How do I reset my password?', answer: 'Go to Settings > Security > Reset Password' },
    { id: 2, question: 'How do I contact support?', answer: 'Use the contact form below or email support@fictionverse.com' },
    { id: 3, question: 'Where can I find my trip history?', answer: 'Navigate to the Trip screen to view all your trips' },
    { id: 4, question: 'How do I add an expense?', answer: 'Go to Expenses screen and tap "+ Add Expense"' },
  ];

  const toggleFAQ = (id: number) => {
    setExpandedFAQ(expandedFAQ === id ? null : id);
  };

  const submitSupport = () => {
    // Submit support request
    alert('Support request submitted!');
    setContactForm({ name: '', email: '', message: '' });
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.title}>Help & Support</Text>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqs.map(faq => (
            <TouchableOpacity 
              key={faq.id} 
              style={styles.faqItem}
              onPress={() => toggleFAQ(faq.id)}
            >
              <View style={styles.faqQuestion}>
                <Text style={styles.faqQuestionText}>{faq.question}</Text>
                <Text style={styles.faqToggle}>{expandedFAQ === faq.id ? '−' : '+'}</Text>
              </View>
              {expandedFAQ === faq.id && (
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              )}
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Support</Text>
          <TextInput
            style={styles.input}
            placeholder="Your Name"
            placeholderTextColor="#666"
            value={contactForm.name}
            onChangeText={(text) => setContactForm({ ...contactForm, name: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Email Address"
            placeholderTextColor="#666"
            keyboardType="email-address"
            value={contactForm.email}
            onChangeText={(text) => setContactForm({ ...contactForm, email: text })}
          />
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="How can we help?"
            placeholderTextColor="#666"
            multiline
            numberOfLines={4}
            value={contactForm.message}
            onChangeText={(text) => setContactForm({ ...contactForm, message: text })}
          />
          <TouchableOpacity style={styles.submitButton} onPress={submitSupport}>
            <Text style={styles.submitButtonText}>Submit Request</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('https://fictionverse.com/docs')}>
            <Text style={styles.linkText}>📚 Documentation</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('https://fictionverse.com/privacy')}>
            <Text style={styles.linkText}>🔒 Privacy Policy</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('https://fictionverse.com/terms')}>
            <Text style={styles.linkText}>📄 Terms of Service</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.linkItem} onPress={() => Linking.openURL('https://fictionverse.com/faq')}>
            <Text style={styles.linkText}>❓ Full FAQ</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Version 1.0.0</Text>
          <Text style={styles.footerText}>© 2024 The Fictionverse</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  scrollContent: {
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 25,
  },
  section: {
    backgroundColor: '#1a1a1a',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 15,
  },
  faqItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 15,
  },
  faqQuestionText: {
    fontSize: 16,
    color: '#fff',
    flex: 1,
  },
  faqToggle: {
    fontSize: 24,
    color: '#007aff',
    fontWeight: 'bold',
  },
  faqAnswer: {
    fontSize: 14,
    color: '#999',
    paddingBottom: 15,
    paddingLeft: 5,
  },
  input: {
    backgroundColor: '#000',
    color: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#007aff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linkItem: {
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  linkText: {
    fontSize: 16,
    color: '#007aff',
  },
  footer: {
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
});

export default HelpScreen;