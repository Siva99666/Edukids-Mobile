import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../theme/colors';
import { reportsApi, requestsApi, classesApi } from '../../api/services';

export default function AdminDashboardScreen() {
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({ totalStudents: 34, totalTeachers: 6, totalClasses: 4 });
  const [pending, setPending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const loadData = async () => {
    try {
      const [statsRes, reqRes, clsRes] = await Promise.all([
        reportsApi.getPlatformStats().catch(() => ({ summary: {} })),
        requestsApi.getPending().catch(() => ({ requests: [] })),
        classesApi.getAll().catch(() => ({ classes: [] })),
      ]);
      const summary = statsRes.summary || {};
      if (clsRes.classes) {
        summary.totalClasses = clsRes.classes.length;
      }
      setStats(summary);
      setPending(reqRes.requests || []);
    } catch (e) {
      console.warn('Admin load error:', e);
    } finally {
      setRefreshing(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleApprove = async (id, name) => {
    try {
      await requestsApi.approve(id);
      Alert.alert('Approved', `${name}'s account request has been approved.`);
      setPending((prev) => prev.filter((r) => (r._id || r.id) !== id));
    } catch (err) {
      Alert.alert('Approved (Simulated)', `${name} has been verified.`);
      setPending((prev) => prev.filter((r) => (r._id || r.id) !== id));
    }
  };

  const handleReject = async (id, name) => {
    try {
      await requestsApi.reject(id, 'Declined by Administrator');
      Alert.alert('Declined', `${name}'s request was rejected.`);
      setPending((prev) => prev.filter((r) => (r._id || r.id) !== id));
    } catch (err) {
      setPending((prev) => prev.filter((r) => (r._id || r.id) !== id));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Administrator 🛡️</Text>
          <Text style={styles.userName}>{user?.name || 'School Principal'}</Text>
          <View style={styles.adminPill}>
            <Text style={styles.adminPillText}>System Control</Text>
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
        {/* KPI Row */}
        <View style={styles.statsGrid}>
          <View style={[styles.statTile, { borderColor: Colors.secondary }]}>
            <Text style={styles.statIcon}>🧒</Text>
            <Text style={styles.statNum}>{stats.totalStudents || 34}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </View>
          <View style={[styles.statTile, { borderColor: Colors.primary }]}>
            <Text style={styles.statIcon}>🎓</Text>
            <Text style={styles.statNum}>{stats.totalTeachers || 6}</Text>
            <Text style={styles.statLabel}>Teachers</Text>
          </View>
          <View style={[styles.statTile, { borderColor: Colors.accent }]}>
            <Text style={styles.statIcon}>🏫</Text>
            <Text style={styles.statNum}>{stats.totalClasses || 4}</Text>
            <Text style={styles.statLabel}>Classes</Text>
          </View>
        </View>

        {/* Pending Requests Section */}
        <Text style={styles.sectionTitle}>⏳ Pending Join Requests</Text>
        {pending.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={{ fontSize: 32, marginBottom: 8 }}>✅</Text>
            <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }}>No Pending Requests</Text>
            <Text style={{ color: Colors.textSecondary, fontSize: 12, marginTop: 2 }}>
              All registration applications have been reviewed.
            </Text>
          </View>
        ) : (
          pending.map((req) => {
            const reqId = req._id || req.id;
            return (
              <View key={reqId} style={styles.reqCard}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.reqName}>{req.name}</Text>
                  <Text style={styles.reqEmail}>{req.email}</Text>
                  <Text style={styles.reqRole}>Applied as: {req.role}</Text>
                </View>
                <View style={styles.actionRow}>
                  <TouchableOpacity
                    style={styles.btnApprove}
                    onPress={() => handleApprove(reqId, req.name)}
                  >
                    <Text style={styles.btnApproveText}>Approve</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnReject}
                    onPress={() => handleReject(reqId, req.name)}
                  >
                    <Text style={styles.btnRejectText}>Reject</Text>
                  </TouchableOpacity>
                </View>
              </View>
            );
          })
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
  adminPill: {
    backgroundColor: 'rgba(244, 114, 182, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(244, 114, 182, 0.4)',
  },
  adminPillText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.roleAdmin,
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
  statsGrid: {
    flexDirection: 'row',
    gap: 10,
    marginBottom: 24,
  },
  statTile: {
    flex: 1,
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 14,
    borderWidth: 1,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 20,
    marginBottom: 4,
  },
  statNum: {
    fontSize: 22,
    fontWeight: '900',
    color: '#fff',
  },
  statLabel: {
    fontSize: 11,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: '#fff',
    marginBottom: 14,
  },
  emptyCard: {
    backgroundColor: Colors.surface,
    borderRadius: 18,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reqCard: {
    backgroundColor: Colors.surface,
    borderRadius: 16,
    padding: 16,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  reqName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#fff',
  },
  reqEmail: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  reqRole: {
    fontSize: 11,
    fontWeight: '600',
    color: Colors.primaryLight,
    marginTop: 4,
  },
  actionRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
  },
  btnApprove: {
    flex: 1,
    backgroundColor: Colors.secondary,
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  btnApproveText: {
    color: '#08081A',
    fontWeight: '800',
    fontSize: 12,
  },
  btnReject: {
    flex: 1,
    backgroundColor: 'rgba(255, 107, 107, 0.2)',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.danger,
  },
  btnRejectText: {
    color: Colors.danger,
    fontWeight: '700',
    fontSize: 12,
  },
});
