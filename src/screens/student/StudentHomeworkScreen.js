import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { Colors } from '../../theme/colors';
import { homeworkApi } from '../../api/services';

export default function StudentHomeworkScreen() {
  const { user } = useAuth();
  const [homeworkList, setHomeworkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchHomework = async () => {
    try {
      const res = await homeworkApi.getAll();
      setHomeworkList(res.homework || []);
    } catch (err) {
      console.warn('Homework fetch error:', err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchHomework();
  }, []);

  const markComplete = async (item) => {
    try {
      await homeworkApi.toggleCompletion(item._id || item.id, {
        studentId: user._id || user.id,
        completed: true,
      });
      Alert.alert('Great job! 🎉', 'Homework marked as completed.');
      fetchHomework();
    } catch (e) {
      Alert.alert('Status', 'Recorded student completion locally.');
      // Local optimistic update
      setHomeworkList((prev) =>
        prev.map((hw) =>
          hw._id === item._id
            ? { ...hw, completions: [...(hw.completions || []), { studentId: user._id || user.id }] }
            : hw
        )
      );
    }
  };

  const renderItem = ({ item }) => {
    const isDone = (item.completions || []).some(
      (c) => c.studentId === (user?._id || user?.id)
    );
    const dueDateStr = item.dueDate
      ? new Date(item.dueDate).toLocaleDateString('en-IN', {
          day: 'numeric',
          month: 'short',
          year: 'numeric',
        })
      : 'No due date';

    return (
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <View style={styles.subjectPill}>
            <Text style={styles.subjectText}>{item.subjectId?.name || 'General'}</Text>
          </View>
          <Text style={[styles.statusTag, isDone ? styles.statusDone : styles.statusPending]}>
            {isDone ? '✅ Completed' : '⏳ Pending'}
          </Text>
        </View>

        <Text style={styles.title}>{item.title}</Text>
        {item.description ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : null}

        <View style={styles.footer}>
          <Text style={styles.dueText}>📅 Due: {dueDateStr}</Text>
          {!isDone && (
            <TouchableOpacity
              style={styles.doneBtn}
              onPress={() => markComplete(item)}
            >
              <Text style={styles.doneBtnText}>Mark Done ✓</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Daily Homework 📝</Text>
        <Text style={styles.headerSub}>Assignments & submissions</Text>
      </View>

      {loading ? (
        <ActivityIndicator color={Colors.primary} style={{ marginTop: 40 }} />
      ) : (
        <FlatList
          data={homeworkList}
          keyExtractor={(item) => item._id || item.id || Math.random().toString()}
          renderItem={renderItem}
          contentContainerStyle={styles.list}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={() => {
                setRefreshing(true);
                fetchHomework();
              }}
              tintColor={Colors.primary}
            />
          }
          ListEmptyComponent={
            <View style={styles.empty}>
              <Text style={styles.emptyIcon}>🎉</Text>
              <Text style={styles.emptyTitle}>All Caught Up!</Text>
              <Text style={styles.emptySub}>No pending homework at this time.</Text>
            </View>
          }
        />
      )}
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
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  subjectPill: {
    backgroundColor: 'rgba(108, 99, 255, 0.2)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 8,
  },
  subjectText: {
    color: Colors.primaryLight,
    fontSize: 11,
    fontWeight: '700',
  },
  statusTag: {
    fontSize: 11,
    fontWeight: '700',
  },
  statusDone: {
    color: Colors.success,
  },
  statusPending: {
    color: Colors.accent,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#fff',
    marginBottom: 6,
  },
  description: {
    fontSize: 13,
    color: Colors.textSecondary,
    lineHeight: 18,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 6,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: Colors.border,
  },
  dueText: {
    fontSize: 12,
    color: Colors.textMuted,
  },
  doneBtn: {
    backgroundColor: Colors.secondary,
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 10,
  },
  doneBtnText: {
    color: '#08081A',
    fontWeight: '800',
    fontSize: 12,
  },
  empty: {
    alignItems: 'center',
    marginTop: 60,
  },
  emptyIcon: {
    fontSize: 48,
    marginBottom: 12,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#fff',
  },
  emptySub: {
    fontSize: 13,
    color: Colors.textSecondary,
    marginTop: 4,
  },
});
