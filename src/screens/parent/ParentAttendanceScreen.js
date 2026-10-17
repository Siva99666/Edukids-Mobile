import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Colors } from '../../theme/colors';

export default function ParentAttendanceScreen() {
  const records = [
    { date: 'Oct 15, 2026', day: 'Thursday', status: 'Present', time: '08:15 AM' },
    { date: 'Oct 14, 2026', day: 'Wednesday', status: 'Present', time: '08:20 AM' },
    { date: 'Oct 13, 2026', day: 'Tuesday', status: 'Present', time: '08:10 AM' },
    { date: 'Oct 12, 2026', day: 'Monday', status: 'Present', time: '08:14 AM' },
    { date: 'Oct 09, 2026', day: 'Friday', status: 'Excused', time: 'Medical leave' },
    { date: 'Oct 08, 2026', day: 'Thursday', status: 'Present', time: '08:12 AM' },
  ];

  const renderItem = ({ item }) => {
    const isPresent = item.status === 'Present';
    return (
      <View style={styles.card}>
        <View style={styles.left}>
          <Text style={styles.date}>{item.date}</Text>
          <Text style={styles.day}>{item.day} • In at {item.time}</Text>
        </View>
        <View style={[styles.badge, isPresent ? styles.badgePresent : styles.badgeLeave]}>
          <Text style={[styles.badgeText, isPresent ? styles.textPresent : styles.textLeave]}>
            {item.status}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Attendance History 📅</Text>
        <Text style={styles.headerSub}>Arjun Kumar (Class 5A)</Text>
      </View>

      <FlatList
        data={records}
        keyExtractor={(item) => item.date}
        renderItem={renderItem}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 54,
    paddingBottom: 16,
    backgroundColor: Colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
  },
  headerSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  list: {
    padding: 16,
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  left: {
    flex: 1,
  },
  date: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  day: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 3,
  },
  badge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 10,
  },
  badgePresent: {
    backgroundColor: 'rgba(74, 222, 128, 0.15)',
  },
  badgeLeave: {
    backgroundColor: 'rgba(255, 179, 71, 0.15)',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '700',
  },
  textPresent: {
    color: Colors.success,
  },
  textLeave: {
    color: Colors.accent,
  },
});
