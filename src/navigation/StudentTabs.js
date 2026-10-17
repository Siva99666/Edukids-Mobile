import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';

import StudentHomeScreen from '../screens/student/StudentHomeScreen';
import StudentHomeworkScreen from '../screens/student/StudentHomeworkScreen';
import StudentTestsScreen from '../screens/student/StudentTestsScreen';
import StudentReportScreen from '../screens/student/StudentReportScreen';

const Tab = createBottomTabNavigator();

export default function StudentTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: Colors.backgroundSecondary,
          borderTopColor: Colors.border,
          height: 64,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: Colors.secondary,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Home"
        component={StudentHomeScreen}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🏠</Text>,
        }}
      />
      <Tab.Screen
        name="Homework"
        component={StudentHomeworkScreen}
        options={{
          tabBarLabel: 'Homework',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📝</Text>,
        }}
      />
      <Tab.Screen
        name="Tests"
        component={StudentTestsScreen}
        options={{
          tabBarLabel: 'Tests',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📋</Text>,
        }}
      />
      <Tab.Screen
        name="Reports"
        component={StudentReportScreen}
        options={{
          tabBarLabel: 'Reports',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📈</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
