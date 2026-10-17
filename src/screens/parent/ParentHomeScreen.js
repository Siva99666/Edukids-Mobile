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

export default function ParentHomeScreen({ navigation }) {
  const { user, logout } = useAuth();
  const [refreshing, setRefreshing] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Family Portal 👨‍👩‍👧</Text>
          <Text style={styles.userName}>{user?.name || 'Parent'}</Text>
          <View style={styles.childPill}>
            <Text style={styles.childText}>
              Child: {user?.linkedStudentId?.name || 'Arjun Kumar (Class 5A)'}
            </Text>
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
              setTimeout(() => setRefreshing(false), 800);
            }}
            tintColor={Colors.primary}
          />
        }
      >
        {/* Child Snapshot Card */}
        <View style={styles.childCard}>
          <View style={styles.childHeader}>
            <Text style={{ fontSize: 36 }}>🧒</Text>
            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.childName}>Arjun Kumar</Text>
              <Text style={styles.childMeta}>Roll #18 • Green Valley Academy</Text>
            </View>
            <View style={styles.standingBadge}>
              <Text style={styles.standingText}>Top 5%</Text>
            </View>
          </View>

          <View style={styles.childStats}>
            <View style={styles.statBox}>
              <Text style={styles.statNum}>96%</Text>
              <Text style={styles.statSub}>Attendance</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>A+</Text>
              <Text style={styles.statSub}>Average Grade</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNum}>100%</Text>
              <Text style={styles.statSub}>Homework Done</Text>
            </View>
          </View>
        </View>

        {/* Action Modules */}
        <Text style={styles.sectionTitle}>Family Monitoring</Text>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Attendance')}
        >
          <View style={[styles.iconWrap, { backgroundColor: 'rgba(0, 212, 170, 0.15)' }]}>
            <Text style={{ fontSize: 22 }}>📅</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Attendance History</Text>
            <Text style={styles.actionDesc}>Check daily attendance stamps & teacher notes</Text>
          </View>
          <Text style={styles.chevron}>›</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionCard}
          onPress={() => navigation.navigate('Homework')}
        >
          <View style={[styles.iconWrap, { backgroundColor: 'rgba(108, 99, 255, 0.15)' }]}>
            <Text style={{ fontSize: 22 }}>📝</Text>
          </View>
          <View style={{ flex: 1 }}>
            <Text style={styles.actionTitle}>Homework Verification</Text>
            <Text style={styles.actionDesc}>Review and sign off on completed school tasks</Text>
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
  childPill: {
    backgroundColor: 'rgba(0, 212, 170, 0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    marginTop: 6,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(0, 212, 170, 0.3)',
  },
  childText: {
    fontSize: 11,
    fontWeight: '700',
    color: Colors.secondary,
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
  childCard: {
    backgroundColor: Colors.surface,
    borderRadius: 22,
    padding: 20,
    borderWidth: 1,
    borderColor: Colors.borderBright,
    marginBottom: 24,
  },
  childHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  childName: {
    fontSize: 17,
    fontWeight: '800',
    color: '#fff',
  },
  childMeta: {
    fontSize: 12,
    color: Colors.textSecondary,
    marginTop: 2,
  },
  standingBadge: {
    backgroundColor: 'rgba(255, 179, 71, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.accent,
  },
  standingText: {
    fontSize: 11,
    fontWeight: '800',
    color: Colors.accent,
  },
  childStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: Colors.backgroundSecondary,
    borderRadius: 14,
    padding: 14,
  },
  statBox: {
    flex: 1,
    alignItems: 'center',
  },
  statNum: {
    fontSize: 18,
    fontWeight: '800',
    color: Colors.secondary,
  },
  statSub: {
    fontSize: 10,
    color: Colors.textMuted,
    marginTop: 2,
  },
  statDivider: {
    width: 1,
    backgroundColor: Colors.border,
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
