import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../theme/colors';
import { classesApi, homeworkApi } from '../../api/services';

export default function TeacherDashboardScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [classes, setClasses] = useState([]);
  const [hwCount, setHwCount] = useState(0);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [clsRes, hwRes] = await Promise.all([
        classesApi.getAll().catch(() => ({ classes: [] })),
        homeworkApi.getAll().catch(() => ({ homework: [] })),
      ]);
      setClasses(clsRes.classes || []);
      setHwCount((hwRes.homework || []).length);
    } catch (e) {
      console.warn('TeacherDashboard load error:', e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Teacher Portal 🎓</Text>
          <Text style={styles.userName}>{user?.name || 'Educator'}</Text>
          <View style={styles.rolePill}>
            <Text style={styles.roleText}>Faculty Member</Text>
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
        {/* KPI Tiles */}
        <View style={styles.statsRow}>
          <View style={[styles.statCard, { borderColor: Colors.primary }]}>
            <Text style={styles.statIcon}>🏫</Text>
            <Text style={styles.statVal}>{classes.length || 3}</Text>
            <Text style={styles.statLabel}>Assigned Classes</Text>
          </View>
          <View style={[styles.statCard, { borderColor: Colors.secondary }]}>
            <Text style={styles.statIcon}>📝</Text>
            <Text style={styles.statVal}>{hwCount || 8}</Text>
            <Text style={styles.statLabel}>Active Homework</Text>
          </View>
        </View>

        {/* Action Modules */}
        <Text style={styles.sectionTitle}>Teaching Operations</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Homework')}
        >
          <View style={[styles.iconWrap, { backgroundColor: 'rgba(108, 99, 255, 0.15)' }]}>
            <Text style={{ fontSize: 22 }}>📝</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Homework Manager</Text>
            <Text style={styles.actionDesc}>Publish new assignments & review submissions</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Attendance')}
        >
          <View style={[styles.iconWrap, { backgroundColor: 'rgba(0, 212, 170, 0.15)' }]}>
            <Text style={{ fontSize: 22 }}>✅</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Take Attendance</Text>
            <Text style={styles.actionDesc}>Mark daily student roll call with instant sync</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>
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
  rolePill: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(108, 99, 255, 0.4)',
  },
  roleText: {
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
  iconWrap: {
    width: 48,
    height: 48,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
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
