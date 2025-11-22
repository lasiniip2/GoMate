import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { transportService } from '@/services/transportService';
import { Schedule } from '@/types/transport.types';

export default function ScheduleDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [schedule, setSchedule] = useState<Schedule | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadScheduleData();
  }, [id]);

  const loadScheduleData = async () => {
    try {
      const scheduleData = await transportService.getScheduleById(id as string);
      setSchedule(scheduleData);
    } catch (error) {
      console.error('Error loading schedule:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'on-time':
        return '#34C759';
      case 'delayed':
        return '#FF9500';
      case 'cancelled':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!schedule) {
    return (
      <View style={styles.errorContainer}>
        <Ionicons name="alert-circle-outline" size={64} color="#C7C7CC" />
        <Text style={styles.errorText}>Schedule not found</Text>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backBtn} onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={24} color="#1C1C1E" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Schedule Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.content}>
          <View style={styles.statusCard}>
            <View
              style={[
                styles.statusIndicator,
                { backgroundColor: getStatusColor(schedule.status) },
              ]}
            />
            <Text style={[styles.statusText, { color: getStatusColor(schedule.status) }]}>
              {schedule.status.toUpperCase()}
            </Text>
          </View>

          {schedule.trainNumber && (
            <View style={styles.vehicleCard}>
              <Ionicons name="train" size={32} color="#007AFF" />
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleLabel}>Train Number</Text>
                <Text style={styles.vehicleNumber}>{schedule.trainNumber}</Text>
                {schedule.trainName && (
                  <Text style={styles.vehicleName}>{schedule.trainName}</Text>
                )}
              </View>
            </View>
          )}

          {schedule.busNumber && (
            <View style={styles.vehicleCard}>
              <Ionicons name="bus" size={32} color="#007AFF" />
              <View style={styles.vehicleInfo}>
                <Text style={styles.vehicleLabel}>Bus Number</Text>
                <Text style={styles.vehicleNumber}>{schedule.busNumber}</Text>
                {schedule.busType && (
                  <Text style={styles.vehicleName}>{schedule.busType} Class</Text>
                )}
              </View>
            </View>
          )}

          <View style={styles.timeSection}>
            <View style={styles.timeCard}>
              <Ionicons name="log-out-outline" size={24} color="#34C759" />
              <Text style={styles.timeLabel}>Departure</Text>
              <Text style={styles.timeValue}>{schedule.departureTime}</Text>
            </View>
            <View style={styles.timeArrow}>
              <Ionicons name="arrow-forward" size={24} color="#C7C7CC" />
            </View>
            <View style={styles.timeCard}>
              <Ionicons name="log-in-outline" size={24} color="#FF3B30" />
              <Text style={styles.timeLabel}>Arrival</Text>
              <Text style={styles.timeValue}>{schedule.arrivalTime}</Text>
            </View>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.sectionTitle}>Route Information</Text>
            <TouchableOpacity
              style={styles.routeButton}
              onPress={() => {
                router.push({
                  pathname: '/(main)/route-details',
                  params: { id: schedule.routeId },
                });
              }}
            >
              <View style={styles.routeButtonContent}>
                <Ionicons name="navigate-circle" size={24} color="#007AFF" />
                <Text style={styles.routeButtonText}>View Full Route Details</Text>
              </View>
              <Ionicons name="chevron-forward" size={24} color="#C7C7CC" />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  backBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F2F2F7',
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1C1C1E',
  },
  scrollView: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F2F2F7',
    padding: 20,
  },
  errorText: {
    fontSize: 18,
    color: '#8E8E93',
    marginTop: 16,
    marginBottom: 24,
  },
  backButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
  backButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statusCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 12,
  },
  statusText: {
    fontSize: 18,
    fontWeight: '700',
  },
  vehicleCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
  },
  vehicleInfo: {
    marginLeft: 16,
    flex: 1,
  },
  vehicleLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginBottom: 4,
  },
  vehicleNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 4,
  },
  vehicleName: {
    fontSize: 16,
    color: '#007AFF',
    fontWeight: '500',
  },
  timeSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  timeCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  timeArrow: {
    marginHorizontal: 12,
  },
  timeLabel: {
    fontSize: 14,
    color: '#8E8E93',
    marginTop: 8,
    marginBottom: 4,
  },
  timeValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
  },
  infoSection: {
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#1C1C1E',
    marginBottom: 16,
  },
  routeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
  },
  routeButtonContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  routeButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#007AFF',
    marginLeft: 12,
  },
});
