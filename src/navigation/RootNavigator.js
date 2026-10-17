import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { useAuth } from '../context/AuthContext';
import { Colors } from '../theme/colors';

import LoginScreen from '../screens/auth/LoginScreen';
import StudentTabs from './StudentTabs';
import ParentTabs from './ParentTabs';
import TeacherTabs from './TeacherTabs';
import AdminTabs from './AdminTabs';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          <Stack.Screen name="Login" component={LoginScreen} />
        ) : user.role === 'student' ? (
          <Stack.Screen name="StudentApp" component={StudentTabs} />
        ) : user.role === 'parent' ? (
          <Stack.Screen name="ParentApp" component={ParentTabs} />
        ) : user.role === 'teacher' ? (
          <Stack.Screen name="TeacherApp" component={TeacherTabs} />
        ) : (
          <Stack.Screen name="AdminApp" component={AdminTabs} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    backgroundColor: Colors.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
