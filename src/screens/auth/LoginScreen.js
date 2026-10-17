import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../theme/colors';
import { STORAGE_KEYS, DEFAULT_API_URL } from '../../api/client';

export default function LoginScreen() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [apiUrl, setApiUrl] = useState(DEFAULT_API_URL);
  const [showConfig, setShowConfig] = useState(false);

  useEffect(() => {
    AsyncStorage.getItem(STORAGE_KEYS.API_URL).then((url) => {
      if (url) setApiUrl(url);
    });
  }, []);

  const handleLogin = async () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Required Fields', 'Please enter both email and password.');
      return;
    }
    setLoading(true);
    try {
      await login(email.trim(), password);
    } catch (err) {
      Alert.alert('Login Failed', err.message || 'Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const fillDemo = (demoEmail, demoPass) => {
    setEmail(demoEmail);
    setPassword(demoPass);
  };

  const saveApiUrl = async () => {
    await AsyncStorage.setItem(STORAGE_KEYS.API_URL, apiUrl.trim());
    setShowConfig(false);
    Alert.alert('Saved', 'API server URL updated.');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Brand Header */}
        <View style={styles.brandHeader}>
          <Text style={styles.logoIcon}>🎓</Text>
          <Text style={styles.brandTitle}>EduKids</Text>
          <Text style={styles.brandSubtitle}>Empowering Every Child's Learning Journey</Text>
        </View>

        {/* Login Card */}
        <View style={styles.card}>
          <Text style={styles.cardHeading}>Sign In</Text>
          <Text style={styles.cardSub}>Access your school dashboard</Text>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="e.g. arjun@greenvalley.edu"
              placeholderTextColor={Colors.textMuted}
              value={email}
              onChangeText={setEmail}
              autoCapitalize="none"
              keyboardType="email-address"
            />
          </View>

          <View style={styles.inputGroup}>
            <Text style={styles.inputLabel}>Password</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter password"
              placeholderTextColor={Colors.textMuted}
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>

          <TouchableOpacity
            style={[styles.submitBtn, loading && styles.submitBtnDisabled]}
            onPress={handleLogin}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.submitBtnText}>Sign In →</Text>
            )}
          </TouchableOpacity>

          {/* Quick Demo Credentials */}
          <Text style={styles.demoTitle}>🧪 Quick Demo Credentials</Text>
          <View style={styles.demoGrid}>
            <TouchableOpacity
              style={styles.demoChip}
              onPress={() => fillDemo('arjun@greenvalley.edu', 'student123')}
            >
              <Text style={styles.demoChipText}>🧒 Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.demoChip}
              onPress={() => fillDemo('priya@greenvalley.edu', 'teacher123')}
            >
              <Text style={styles.demoChipText}>🎓 Teacher</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.demoChip}
              onPress={() => fillDemo('admin@greenvalley.edu', 'admin123')}
            >
              <Text style={styles.demoChipText}>🛡️ Admin</Text>
            </TouchableOpacity>
          </View>

          {/* Server Config Toggle */}
          <TouchableOpacity
            style={styles.configToggle}
            onPress={() => setShowConfig(!showConfig)}
          >
            <Text style={styles.configToggleText}>
              ⚙️ {showConfig ? 'Hide Server Config' : 'Configure Server URL'}
            </Text>
          </TouchableOpacity>

          {showConfig && (
            <View style={styles.configBox}>
              <Text style={styles.inputLabel}>Backend API URL</Text>
              <TextInput
                style={styles.input}
                value={apiUrl}
                onChangeText={setApiUrl}
                placeholder="https://your-railway-app.railway.app/api"
                placeholderTextColor={Colors.textMuted}
                autoCapitalize="none"
              />
              <TouchableOpacity style={styles.saveUrlBtn} onPress={saveApiUrl}>
                <Text style={styles.saveUrlBtnText}>Save URL</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <Text style={styles.footerNote}>EduKids Mobile • Secure Android Platform</Text>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scroll: {
    padding: 24,
    justifyContent: 'center',
    minHeight: '100%',
  },
  brandHeader: {
    alignItems: 'center',
    marginBottom: 28,
  },
  logoIcon: {
    fontSize: 56,
    marginBottom: 8,
  },
  brandTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: '#fff',
    letterSpacing: 0.5,
  },
  brandSubtitle: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
    textAlign: 'center',
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeading: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  cardSub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginBottom: 20,
    marginTop: 4,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textSecondary,
    marginBottom: 6,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  input: {
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 14,
    color: '#fff',
    fontSize: 15,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  submitBtn: {
    backgroundColor: Colors.primary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: 'center',
    marginTop: 10,
    shadowColor: Colors.primary,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 4,
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '800',
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: Colors.textMuted,
    marginTop: 24,
    marginBottom: 10,
    textAlign: 'center',
  },
  demoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 8,
  },
  demoChip: {
    flex: 1,
    backgroundColor: Colors.surfaceHover,
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  demoChipText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#fff',
  },
  configToggle: {
    marginTop: 20,
    alignItems: 'center',
  },
  configToggleText: {
    fontSize: 12,
    color: Colors.primaryLight,
    fontWeight: '600',
  },
  configBox: {
    marginTop: 14,
    paddingTop: 14,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  saveUrlBtn: {
    backgroundColor: Colors.surfaceLight,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  saveUrlBtnText: {
    color: Colors.secondary,
    fontWeight: '700',
    fontSize: 13,
  },
  footerNote: {
    textAlign: 'center',
    fontSize: 11,
    color: Colors.textMuted,
    marginTop: 24,
  },
});
