import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';

import TeacherDashboardScreen from '../screens/teacher/TeacherDashboardScreen';
import StudentHomeworkScreen from '../screens/student/StudentHomeworkScreen';
import ParentAttendanceScreen from '../screens/parent/ParentAttendanceScreen';

const Tab = createBottomTabNavigator();

export default function TeacherTabs() {
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
        tabBarActiveTintColor: Colors.primaryLight,
        tabBarInactiveTintColor: Colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '700',
        },
      }}
    >
      <Tab.Screen
        name="Dashboard"
        component={TeacherDashboardScreen}
        options={{
          tabBarLabel: 'Dashboard',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🎓</Text>,
        }}
      />
      <Tab.Screen
        name="Homework"
        component={StudentHomeworkScreen}
        options={{
          tabBarLabel: 'Assignments',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📝</Text>,
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={ParentAttendanceScreen}
        options={{
          tabBarLabel: 'Roll Call',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>✅</Text>,
        }}
      />
    </Tab.Navigator>
  );
}
