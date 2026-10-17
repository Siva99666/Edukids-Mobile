import React from 'react';
import { Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Colors } from '../theme/colors';

import ParentHomeScreen from '../screens/parent/ParentHomeScreen';
import ParentAttendanceScreen from '../screens/parent/ParentAttendanceScreen';
import StudentHomeworkScreen from '../screens/student/StudentHomeworkScreen';

const Tab = createBottomTabNavigator();

export default function ParentTabs() {
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
        name="Overview"
        component={ParentHomeScreen}
        options={{
          tabBarLabel: 'Child',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>🧒</Text>,
        }}
      />
      <Tab.Screen
        name="Attendance"
        component={ParentAttendanceScreen}
        options={{
          tabBarLabel: 'Attendance',
          tabBarIcon: () => <Text style={{ fontSize: 18 }}>📅</Text>,
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
    </Tab.Navigator>
  );
}
