import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../theme/colors';
import { homeworkApi, examsApi } from '../../api/services';

export default function StudentHomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [hwCount, setHwCount] = useState(0);
  const [examCount, setExamCount] = useState(0);

  const loadData = async () => {
    try {
      const [hwRes, examRes] = await Promise.all([
        homeworkApi.getAll().catch(() => ({ homework: [] })),
        examsApi.getAll().catch(() => ({ exams: [] })),
      ]);
      const list = hwRes.homework || [];
      const pending = list.filter(
        (h) => !(h.completions || []).some((c) => c.studentId === user?._id || c.studentId === user?.id)
      );
      setHwCount(pending.length);
      setExamCount((examRes.exams || []).length);
    } catch (e) {
      console.warn('StudentHome load error:', e);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      {/* Top Header */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Welcome back 👋</Text>
          <Text style={styles.userName}>{user?.name || 'Student'}</Text>
          <View style={styles.gradeBadge}>
            <Text style={styles.gradeText}>Grade: {user?.grade || 'Class 5A'}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.logoutBtn} onPress={logout}>
          <Text style={styles.logoutText}>🚪 Exit</Text>
        </TouchableOpacity>
      </View>

      <ScrollView
        contentContainerStyle={styles.scroll}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              setRefreshing(true);
              loadData();
            }}
            tintColor={Colors.primary}
          />
        }
      >
        {loading ? (
          <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
        ) : (
          <>
            {/* KPI Stat Cards */}
            <View style={styles.statsRow}>
              <View style={[styles.statCard, { borderColor: Colors.primary }]}>
                <Text style={styles.statIcon}>📝</Text>
                <Text style={styles.statVal}>{hwCount}</Text>
                <Text style={styles.statLabel}>Pending Homework</Text>
              </View>

              <View style={[styles.statCard, { borderColor: Colors.secondary }]}>
                <Text style={styles.statIcon}>📄</Text>
                <Text style={styles.statVal}>{examCount}</Text>
                <Text style={styles.statLabel}>Scheduled Exams</Text>
              </View>
            </View>

            {/* Quick Action Navigation */}
            <Text style={styles.sectionTitle}>📚 Learning Modules</Text>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Homework')}
            >
              <View style={styles.actionIconWrap}>
                <Text style={styles.actionIcon}>📝</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Daily Homework</Text>
                <Text style={styles.actionDesc}>View assigned tasks, due dates and submissions</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Tests')}
            >
              <View style={[styles.actionIconWrap, { backgroundColor: 'rgba(0, 212, 170, 0.15)' }]}>
                <Text style={styles.actionIcon}>📋</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Weekly Tests</Text>
                <Text style={styles.actionDesc}>Interactive quizzes and knowledge evaluations</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.actionCard}
              onPress={() => navigation.navigate('Reports')}
            >
              <View style={[styles.actionIconWrap, { backgroundColor: 'rgba(255, 179, 71, 0.15)' }]}>
                <Text style={styles.actionIcon}>📈</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.actionTitle}>Academic Progress</Text>
                <Text style={styles.actionDesc}>Exam scores, subject breakdown & attendance</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </>
        )}
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
    paddingBottom: 20,
    backgroundColor: Colors.backgroundSecondary,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 13,
    color: Colors.textSecondary,
    fontWeight: '600',
  },
  userName: {
    fontSize: 22,
    fontWeight: '800',
    color: '#fff',
    marginTop: 2,
  },
  gradeBadge: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.4)',
  },
  gradeText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.primaryLight,
  },
  logoutBtn: {
    backgroundColor: Colors.surfaceHover,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logoutText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '700',
  },
  scroll: {
    padding: 20,
  },
  statsRow: {
    flexDirection: 'row',
    gap: 12,
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
  },
  statIcon: {
    fontSize: 24,
    marginBottom: 8,
  },
  statVal: {
    fontSize: 28,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
  },
  actionCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 16,
    borderWidth: 1,
    borderColor: Colors.border,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: 12,
  },
  actionIconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: 'rgba(108, 99, 255, 0.15)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionIcon: {
    fontSize: 22,
  },
  actionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  actionDesc: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  chevron: {
    fontSize: 24,
    color: Colors.textMuted,
  },
});
