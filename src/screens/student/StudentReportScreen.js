import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../theme/colors';

export default function StudentReportScreen() {
  const { user } = useAuth();

  const subjects = [
    { name: 'Mathematics', score: 92, grade: 'A+' },
    { name: 'Science', score: 88, grade: 'A' },
    { name: 'English Language', score: 95, grade: 'A+' },
    { name: 'Social Studies', score: 84, grade: 'B+' },
    { name: 'Arts & Design', score: 96, grade: 'A+' },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academic Progress 📈</Text>
        <Text style={styles.headerSub}>Report card & subject mastery</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scroll}>
        {/* Overall Score Card */}
        <View style={styles.kpiCard}>
          <View style={styles.kpiLeft}>
            <Text style={styles.kpiVal}>91.0%</Text>
            <Text style={styles.kpiLabel}>Cumulative GPA / Score</Text>
          </View>
          <View style={styles.gradeCircle}>
            <Text style={styles.gradeCircleText}>A+</Text>
          </View>
        </View>

        {/* Attendance Banner */}
        <View style={styles.attBanner}>
          <Text style={{ fontSize: 24, marginRight: 12 }}>📅</Text>
          <View>
            <Text style={styles.attVal}>96.4% Attendance Rate</Text>
            <Text style={styles.attSub}>108 of 112 days attended • High Standing</Text>
          </View>
        </View>

        {/* Subject Breakdown */}
        <Text style={styles.sectionTitle}>Subject Performance</Text>
        {subjects.map((s, idx) => (
          <View key={idx} style={styles.subjectRow}>
            <View style={{ flex: 1 }}>
              <Text style={styles.subName}>{s.name}</Text>
              <View style={styles.progressBarBg}>
                <View style={[styles.progressBarFill, { width: `${s.score}%` }]} />
              </View>
            </View>
            <View style={styles.scoreBadge}>
              <Text style={styles.scoreText}>{s.score}%</Text>
              <Text style={styles.gradeSubText}>{s.grade}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
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
  scroll: {
    padding: 20,
  },
  kpiCard: {
    backgroundColor: Colors.surface,
    borderRadius: 20,
    padding: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.borderBright,
    marginBottom: 16,
  },
  kpiLeft: {
    flex: 1,
  },
  kpiVal: {
    fontSize: 36,
    fontWeight: '900',
    color: Colors.secondary,
  },
  kpiLabel: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  gradeCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  gradeCircleText: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },
  attBanner: {
    backgroundColor: Colors.surfaceHover,
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 24,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  attVal: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  attSub: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
  },
  subjectRow: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    padding: 14,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
    gap: 16,
  },
  subName: {
    fontSize: 14,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 8,
  },
  progressBarBg: {
    height: 6,
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: Colors.primary,
    borderRadius: 3,
  },
  scoreBadge: {
    alignItems: 'flex-end',
  },
  scoreText: {
    fontSize: 15,
    fontWeight: '800',
    color: Colors.secondary,
  },
  gradeSubText: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.textMuted,
  },
});
